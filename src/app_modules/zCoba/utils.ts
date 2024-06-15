import { v4 as uuidv4 } from "uuid";

export const createItems = (length = 10): string[] =>
  Array.from({ length }).map(() => uuidv4());

export const loadMore = async (length = 10): Promise<string[]> =>
  new Promise((res) => setTimeout(() => res(createItems(length)), 100));

// export const listData = Array(100)
//   .fill(0)
//   .map(() => uuidv4());
