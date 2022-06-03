import { AxiosError } from 'axios';

const isAxiosError = (input: unknown): input is AxiosError => {
  return input != null && (input as AxiosError).response != null;
};

const isError = (input: unknown): input is Error => {
  return input != null && (input as Error).message != null;
};

export const getErrorMessage = (err: unknown): string => {
  if (isAxiosError(err)) {
    return [].concat(err.response.data.message)[0];
  }
  if (isError(err)) {
    return err.message;
  }

  return '';
};
