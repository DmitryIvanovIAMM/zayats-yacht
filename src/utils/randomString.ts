export const randomString = (
  length = 24,
  charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
) => {
  let randomString = '';
  for (let i = 0, n = charSet.length; i < length; ++i) {
    randomString += charSet.charAt(Math.floor(Math.random() * n));
  }
  return randomString;
};

export const insertRandomBeforeExtension = (filename: string) => {
  const randomSuffix = randomString(8);
  const dotIndex = filename.lastIndexOf('.');

  if (dotIndex === -1) {
    return filename + '.' + randomSuffix;
  }

  const name = filename.substring(0, dotIndex);
  const extension = filename.substring(dotIndex);
  return name + '_' + randomSuffix + extension;
};
