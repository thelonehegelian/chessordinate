import React from 'react';
import styled from 'styled-components';
import { BoardMap, SquareProps } from '../types';


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

const boardMap = generateBoardMap();




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

const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: #8a6d3b;
  color: #f4ce7b;
  border: 1px solid #f4ce7b;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  `;

const SquareComponent: React.FC<SquareProps> = (props) => {
  const { id, onClick, isDark } = props;

  return <Square id={id} isDark={isDark} onClick={() => onClick(id)} />;
};

const getRandomSquare = (boardMap: BoardMap): string => {
  const keys = Object.keys(boardMap);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

const EmptyChessBoard: React.FC = () => {
  const squares = [];
  const [randomSquare, setRandomSquare] = React.useState(getRandomSquare(boardMap));

  const handleSquareClick = (id: string) => {
    console.log("Square clicked:", boardMap[id]);
    if (id === randomSquare) {
      console.log("Correct!");
      setRandomSquare(getRandomSquare(boardMap));
    }
  };

  const handleButton = () => {
    setRandomSquare(getRandomSquare(boardMap));
    console.log("Random square:", boardMap[randomSquare]);
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isDark = (i + j) % 2 === 1;
      const id = `${i}-${j}`;
      squares.push(<SquareComponent key={id} id={id} isDark={isDark} onClick={handleSquareClick} />);
    }
  }

  return <><Board>{squares}{boardMap[randomSquare]}</Board><Button onClick={handleButton}>New Coordinate</Button></>;
};

export default EmptyChessBoard;
