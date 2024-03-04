import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export const getNanoID = ({ len = 5 }: { len?: number } = {}) => {
  return nanoid(len);
};
