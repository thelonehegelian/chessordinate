import { BoardMap } from '../types';
export const generateBoardMap = (): BoardMap => {
  const boardMap: BoardMap = {};
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const key = `${i}-${j}`;
      const value = `${files[j]}${8 - i}`;
      boardMap[key] = value;
    }
  }

  return boardMap;
};
