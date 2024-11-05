export const albumBucketName = "dataspan.frontend-home-assignment";
export const REGION = "eu-central-1";
export const nc = 7;
export const names = [
  "elbow positive",
  "fingers positive",
  "forearm fracture",
  "humerus fracture",
  "humerus",
  "shoulder fracture",
  "wrist positive",
];
export const nameClass = [
  "elbowPositive",
  "fingersPositive",
  "forearmFracture",
  "humerusFracture",
  "humerus",
  "shoulderFracture",
  "wristPositive",
];

export const badgeNames = names.map((item, idx) => {
  return { id: idx, name: item, nameClass: nameClass[idx], selected: false };
});

export const badgeNamesForModal = names.map((item, idx) => {
  return { id: idx, name: item, nameClass: nameClass[idx], selected: true };
});

export const tabs = ["All groups", "Train", "Valid", "Test"];

export const bgColorsForPolygon = {
  elbowPositive: "rgba(61, 155, 233, 0.2)",
  fingersPositive: "rgba(186, 218, 85, 0.2)",
  forearmFracture: "rgba(255, 215, 92, 0.2)",
  humerusFracture: "rgba(242, 88, 88, 0.2)",
  humerus: "rgba(44, 225, 203, 0.2)",
  shoulderFracture: "rgba(253, 176, 62, 0.2)",
  wristPositive: "rgba(215, 131, 255, 0.2)",
};
export const colorsForPolygon = {
  elbowPositive: "#3d9be9",
  fingersPositive: "#bada55",
  forearmFracture: "#ffd75c",
  humerusFracture: "#f25858",
  humerus: "#2ce1cb",
  shoulderFracture: "#fdb03e",
  wristPositive: "#d783ff",
};

// "elbowPositive",
// "fingersPositive",
// "forearmFracture",
// "humerusFracture",
// "humerus",
// "shoulderFracture",
// "wristPositive",
