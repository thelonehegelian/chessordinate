import React from 'react';
import styled from 'styled-components';

interface SquareProps {
  isDark: boolean;
  id: string;
  onClick: (id: string) => void;
}

// BoardMap is a Record type that maps a string to a string (e.g. "0-0": "a8")
type BoardMap = Record<string, string>;

const generateBoardMap = (): BoardMap => {
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

const boardMap = generateBoardMap();
console.log(boardMap);




const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 400px;
  height: 400px;
  border: 1px solid black;
`;

const Square = styled.div<SquareProps>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isDark ? '#8a6d3b' : '#f4ce7b')};
  &:hover {
    opacity: 0.7;
  }
`;

const SquareComponent: React.FC<SquareProps> = (props) => {
  const { id, onClick, isDark } = props;

  return <Square id={id} isDark={isDark} onClick={() => onClick(id)} />;
};

const EmptyChessBoard: React.FC = () => {
  const squares = [];

  const handleSquareClick = (id: string) => {
    console.log("Square clicked:", boardMap[id]);
  };

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isDark = (i + j) % 2 === 1;
      const id = `${i}-${j}`;
      squares.push(<SquareComponent key={id} id={id} isDark={isDark} onClick={handleSquareClick} />);
    }
  }

  return <Board>{squares}</Board>;
};

export default EmptyChessBoard;
