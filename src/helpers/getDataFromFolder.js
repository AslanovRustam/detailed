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
    identityPoolId: "eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9",
  }),
});

const streamToString = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

const fetchLabelData = async (key) => {
  const command = new GetObjectCommand({
    Bucket: albumBucketName,
    Key: key,
  });

  const data = await s3.send(command);
  const bodyContents = await streamToString(data.Body);
  return bodyContents;
};

export const listAllFiles = async (folder = "valid") => {
  const baseUrl =
    "https://s3.eu-central-1.amazonaws.com/dataspan.frontend-home-assignment";
  const results = new Map();

  try {
    for (const subFolder of ["images", "thumbnails", "labels"]) {
      const command = new ListObjectsV2Command({
        Bucket: albumBucketName,
        Prefix: `bone-fracture-detection/${folder}/${subFolder}/`,
      });

      const data = await s3.send(command);
      // console.log("data.Contents", data.Contents);

      if (data.Contents) {
        data.Contents.forEach((file) => {
          const key = file.Key || "";

          const idMatch = key.match(/.rf\.(\w{32})\./);
          const id = idMatch ? idMatch[1] : null;

          if (id) {
            if (!results.has(id)) {
              results.set(id, {
                id,
                imgUrl: null,
                thumbnailsUrl: null,
                className: null,
                coords: null,
              });
            }

            const fileData = results.get(id);

            if (subFolder === "images") {
              fileData.imgUrl = `${baseUrl}/${key}`;
            } else if (subFolder === "thumbnails") {
              fileData.thumbnailsUrl = `${baseUrl}/${key}`;
            } else if (subFolder === "labels") {
              fileData.labelsData = `${baseUrl}/${key}`;
            }
          }
        });
      }
    }

    const data = Array.from(results.values());
    console.log("data", data);
    return data;
  } catch (err) {
    console.error("Ошибка при получении файлов:", err);
    return [];
  }
};

// // bone-fracture-detection/train/labels/
// // bone-fracture-detection/test/labels/
// // bone-fracture-detection/valid/labels/
// // bone-fracture-detection/train/images/
// // bone-fracture-detection/test/images/
// // bone-fracture-detection/valid/images/
// // bone-fracture-detection/train/thumbnails/
// // bone-fracture-detection/test/thumbnails/
// // bone-fracture-detection/valid/thumbnails/
// // "https://s3.eu-central-1.amazonaws.com/dataspan.frontend-home-assignment/bone-fracture-detection/valid/images/coronoid-process-fracture_jpg.rf.71650459c69a9734ecd545067cf18bf4.jpg";
// // "https://s3.eu-central-1.amazonaws.com/dataspan.frontend-home-assignment/bone-fracture-detection/valid/thumbnails/coronoid-process-fracture_jpg.rf.71650459c69a9734ecd545067cf18bf4.jpg";
// // "https://s3.eu-central-1.amazonaws.com/dataspan.frontend-home-assignment/bone-fracture-detection/valid/thumbnails/coronoid-process-fracture_jpg.rf.71650459c69a9734ecd545067cf18bf4.jpg";
// // "https://s3.eu-central-1.amazonaws.com/dataspan.frontend-home-assignment/bone-fracture-detection/valid/images/coronoid-process-fracture_jpg.rf.71650459c69a9734ecd545067cf18bf4.jpg";
