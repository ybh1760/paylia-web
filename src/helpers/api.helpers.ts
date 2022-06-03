export const array2QueryString = (
  name: string,
  input: (number | string)[]
): string => {
  return input.map((v, index) => `${name}[${index}]=${v}`).join('&');
};
