export const getSrcImageNameByStorageName = (storageName: string) => {
  return storageName.includes('s3.amazonaws.com') ? storageName : `/images/${storageName}`;
};
