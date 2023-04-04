import { HTMLAttributes } from 'react';

// BoardMap is a Record type that maps a string to a string (e.g. "0-0": "a8")
export type BoardMap = Record<string, string>;
export interface SquareProps {
  isDark: boolean;
  id: string;
  onClick: (id: string) => void;
}

export interface BarProps extends HTMLAttributes<HTMLDivElement> {
  isAnswerCorrect?: boolean;
}
