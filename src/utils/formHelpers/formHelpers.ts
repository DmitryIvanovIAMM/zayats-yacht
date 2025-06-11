// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { isObject } from 'lodash';
import { isValidDate } from '@/utils/date-time';

export const DEFAULT_PORT_IMAGE = 'FortLauderdale.jpg'; // Default image name for ports

export const getFormAsFormData = <T>(values: T, fieldsToOmit: string[]): FormData => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      return value.forEach((arrayItem) => {
        formData.append(
          `${key}[]`,
          typeof arrayItem === 'object' ? JSON.stringify(arrayItem) : arrayItem
        );
      });
    }
    if (isObject(value)) {
      return formData.append(key, JSON.stringify(value));
    }
    if (!fieldsToOmit.includes(key)) {
      formData.append(key, value);
    }
  });

  return formData;
};

export const getNestedFormProperty = (fieldName: string, pathToFormObject?: string) => {
  if (pathToFormObject) {
    return `${pathToFormObject}.${fieldName}`;
  } else {
    return fieldName;
  }
};

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
      !isValidDate(blankFormValues[formKey])
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

export const getValidationErrorsAsObject = (yupError: yup.ValidationError[]) => {
  const errors = {};

  yupError.forEach((element) => {
    const path = element.path;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    errors[path] ? errors[path].push(element.message) : (errors[path] = [element.message]);
  });

  return errors;
};
