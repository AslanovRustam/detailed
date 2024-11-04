// window.global = window;
// window.process = { env: {} };
// import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import {
  S3Client,
  ListObjectsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { albumBucketName, REGION } from "../../helpers/constants";
import { listAllFiles } from "../../helpers/getDataFromFolder";

// const albumBucketName = "dataspan.frontend-home-assignment";
// const REGION = "eu-central-1";

// const s3 = new S3Client({
//   region: REGION,
//   credentials: fromCognitoIdentityPool({
//     clientConfig: { region: REGION },
//     identityPoolId: "eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9",
//   }),
// });

const S3Viewer = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");

  useEffect(() => {
    listAllFiles();
  }, []);

  // const listAlbums = async () => {
  //   try {
  //     const data = await s3.send(
  //       new ListObjectsCommand({ Bucket: albumBucketName, Delimiter: "/" })
  //     );
  //     const albumNames = data.CommonPrefixes.map((commonPrefix) =>
  //       commonPrefix.Prefix.replace("/", "")
  //     );
  //     setAlbums(albumNames);
  //   } catch (error) {
  //     console.error("Ошибка при получении альбомов:", error);
  //   }
  // };

  // const viewAlbum = async (albumName) => {
  //   const albumPhotosKey = `${albumName}/`;
  //   try {
  //     const data = await s3.send(
  //       new ListObjectsCommand({
  //         Bucket: albumBucketName,
  //         Prefix: albumPhotosKey,
  //       })
  //     );
  //     const bucketUrl = `https://${albumBucketName}.s3.${REGION}.amazonaws.com/`;
  //     const albumPhotos = data.Contents.map((photo) => ({
  //       key: photo.Key.replace(albumPhotosKey, ""),
  //       url: `${bucketUrl}${encodeURIComponent(photo.Key)}`,
  //     }));
  //     setPhotos(albumPhotos);
  //     setSelectedAlbum(albumName);
  //   } catch (error) {
  //     console.error("Ошибка при просмотре альбома:", error);
  //   }
  // };

  // async function listAllFiles(prefix = "bone-fracture-detection/test/labels/") {
  //   try {
  //     const command = new ListObjectsV2Command({
  //       Bucket: albumBucketName,
  //       Prefix: prefix,
  //     });

  //     const data = await s3.send(command);

  //     if (data.Contents) {
  //       console.log("Знайдені файли:");
  //       data.Contents.forEach((file) => {
  //         // console.log(file.Key);
  //       });
  //       console.log("data", data);
  //     } else {
  //       console.log("Немає файлів у вказаній директорії.");
  //     }
  //   } catch (err) {
  //     console.error("Помилка при отриманні файлів:", err);
  //   }
  // }

  // listAllFiles();

  return (
    <div>
      <h1>S3 Album Viewer</h1>
      {selectedAlbum ? (
        <div>
          <button onClick={() => setSelectedAlbum("")}>Back To Albums</button>
          <h2>Album: {selectedAlbum}</h2>
          <div>
            {photos.map((photo) => (
              <div
                key={photo.key}
                style={{ display: "inline-block", margin: "10px" }}
              >
                <img
                  src={photo.url}
                  alt={photo.key}
                  style={{ width: "128px", height: "128px" }}
                />
                <p>{photo.key}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Albums</h2>
          <ul>
            {albums.map((album) => (
              <li key={album}>
                <button onClick={() => viewAlbum(album)}>{album}</button>
                <button onClick={() => listAllFiles()}>names</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default S3Viewer;
