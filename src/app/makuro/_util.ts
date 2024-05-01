import { v4 as uuidv4 } from "uuid";

export const createItems = (length = 100): string[] =>
  Array.from({ length }).map(() => uuidv4());

export const loadMore = async (length = 100): Promise<string[]> => {
    console.log("Loading more items...");
  return new Promise((res) => setTimeout(() => res(createItems(length)), 100));
};
