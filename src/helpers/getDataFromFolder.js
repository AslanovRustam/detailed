import {
  ListObjectsV2Command,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { albumBucketName, REGION } from "./constants";

const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION },
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
  }),
});

const streamToString = async (stream) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
  }

  result += decoder.decode();
  return result;
};

const fetchLabelData = async (key) => {
  const command = new GetObjectCommand({ Bucket: albumBucketName, Key: key });
  const data = await s3.send(command);
  return await streamToString(data.Body);
};

const processFileData = (key, fileData) => {
  const idMatch = key.match(/.rf.(\w{32})./);
  const id = idMatch ? idMatch[1] : null;

  if (!id) return;

  if (!fileData.has(id)) {
    fileData.set(id, {
      id,
      imgUrl: null,
      thumbnailsUrl: null,
      className: [],
      coords: [],
    });
  }

  const data = fileData.get(id);

  return fetchLabelData(key)
    .then((labelData) => {
      if (!labelData) {
        data.className = [];
        data.coords = [];
        return data;
      }

      const lines = labelData.trim().split("\n");
      const result = lines.reduce(
        (acc, line) => {
          const dataParts = line.trim().split(" ");
          if (dataParts.length > 0) {
            acc.classNames.push(dataParts[0]);
            acc.allCoords.push(dataParts.slice(1).map(Number));
          }
          return acc;
        },
        { classNames: [], allCoords: [] }
      );

      data.className = result.classNames.length > 0 ? result.classNames : [];
      data.coords = result.allCoords.length > 0 ? result.allCoords : [];

      return data;
    })
    .catch((error) => {
      console.error("Error in fetchLabelData:", error);
      return data;
    });
};

export const totalPages2 = async (folder = "valid") => {
  let totalFiles = 0;
  let currentContinuationToken = null;

  try {
    do {
      const countCommand = new ListObjectsV2Command({
        Bucket: albumBucketName,
        Prefix: `bone-fracture-detection/${folder}/images/`,
        ContinuationToken: currentContinuationToken,
      });

      const countData = await s3.send(countCommand);
      totalFiles += countData.KeyCount || 0;
      currentContinuationToken = countData.NextContinuationToken;
    } while (currentContinuationToken);

    return Math.ceil(totalFiles / 30);
  } catch (err) {
    console.error("Error fetching total pages:", err);
    return 0;
  }
};

export const generateContinuationTokens = async (
  folder = "valid",
  maxKeys = 30
) => {
  const continuationTokens = [];
  let currentContinuationToken = null;

  try {
    while (true) {
      const command = new ListObjectsV2Command({
        Bucket: albumBucketName,
        Prefix: `bone-fracture-detection/${folder}/thumbnails/`,
        ContinuationToken: currentContinuationToken,
        MaxKeys: maxKeys,
      });

      const data = await s3.send(command);

      if (!data.Contents || data.Contents.length === 0) {
        break;
      }

      if (data.NextContinuationToken) {
        continuationTokens.push(data.NextContinuationToken);
      }

      currentContinuationToken = data.NextContinuationToken || null;

      if (!currentContinuationToken) {
        break;
      }
    }

    return continuationTokens;
  } catch (err) {
    console.error("Error generating continuation tokens:", err);
    return [];
  }
};

export const listAllFiles = async (
  folder = "valid",
  maxKeys = 20,
  nextContinuationToken = null
) => {
  const baseUrl =
    "https://s3.eu-central-1.amazonaws.com/dataspan.frontend-home-assignment";
  const fileData = new Map();

  try {
    for (const subFolder of ["images", "thumbnails", "labels"]) {
      const command = new ListObjectsV2Command({
        Bucket: albumBucketName,
        Prefix: `bone-fracture-detection/${folder}/${subFolder}/`,
        MaxKeys: maxKeys,
        ContinuationToken: nextContinuationToken,
      });

      const data = await s3.send(command);

      if (!data?.Contents) break;

      await Promise.all(
        data.Contents.map((file) => {
          const key = file.Key || "";
          return processFileData(key, fileData).then((fileInfo) => {
            if (subFolder === "images") {
              fileInfo.imgUrl = `${baseUrl}/${key}`;
            } else if (subFolder === "thumbnails") {
              fileInfo.thumbnailsUrl = `${baseUrl}/${key}`;
            } else if (subFolder === "labels") {
              fileInfo.labelsData = `${baseUrl}/${key}`;
            }
          });
        })
      );

      if (subFolder === "images") {
        nextContinuationToken = data.NextContinuationToken || null;
      }
    }

    return {
      files: Array.from(fileData.values()),
      nextContinuationToken,
    };
  } catch (err) {
    console.error("Error fetching files:", err);
    return { files: [], nextContinuationToken: null };
  }
};
