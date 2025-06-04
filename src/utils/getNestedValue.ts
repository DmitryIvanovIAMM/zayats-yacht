export const getNestedValue = (obj: any, key: string) => {
  return key.split('.').reduce(function (result, key) {
    return result ? (result[key] ? result[key] : null) : null;
  }, obj);
};
