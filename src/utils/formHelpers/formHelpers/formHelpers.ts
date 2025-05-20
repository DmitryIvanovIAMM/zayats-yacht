type MergeFn<A, B> = (apiValues: A, blankFormValues: B) => any;

export const getMergedFormValues = <M, A = Record<string, any>>(
  blankFormValues: M,
  apiValues: A,
  fieldsToSkip: string[] = [],
  mergeFnsMap: Record<string, MergeFn<A, M>> = {}
) => {
  const filteredApiValues = Object.keys(blankFormValues).reduce((accumulator, formKey) => {
    // TODO: Add support for nested fieldsToSkip / try to change it with lodash merge
    if (
      (apiValues[formKey] === null ||
        apiValues[formKey] === undefined ||
        apiValues[formKey] === 'undefined' ||
        fieldsToSkip.includes(formKey)) &&
      !mergeFnsMap[formKey]
    ) {
      accumulator[formKey] = blankFormValues[formKey];
      return accumulator;
    }
    if (
      typeof blankFormValues[formKey] === 'object' &&
      blankFormValues[formKey] &&
      !mergeFnsMap[formKey] &&
      !Array.isArray(blankFormValues[formKey]) &&
      !isDate(blankFormValues[formKey])
    ) {
      accumulator[formKey] = getMergedFormValues(
        blankFormValues[formKey],
        apiValues[formKey],
        fieldsToSkip,
        mergeFnsMap
      );
    } else {
      accumulator[formKey] = mergeFnsMap[formKey]
        ? mergeFnsMap[formKey](apiValues, blankFormValues)
        : apiValues[formKey];
    }
    return accumulator;
  }, {} as any);

  return {
    ...blankFormValues,
    ...filteredApiValues
  } as M;
};
