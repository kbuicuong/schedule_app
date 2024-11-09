import CustomError from "./createError";

export const getEnvironmentVariable = (variableName: string): string => {
  const value = process.env[variableName];
  if (value === undefined || value === null) {
    throw new CustomError('UNDEFINED_ENV', `${variableName} is not defined in the environment `);
  }
  return value;
};
