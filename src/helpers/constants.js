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

export const tabs = ["All groups", "Train", "Valid", "Test"];
