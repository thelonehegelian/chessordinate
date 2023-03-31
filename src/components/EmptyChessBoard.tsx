import React from 'react';
import styled from 'styled-components';
import { BoardMap, SquareProps } from '../types';
import { generateBoardMap } from '../constants';

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

const boardMap = generateBoardMap();
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
  const [counter, setCounter] = React.useState(0);
    // counter display
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCounter(counter - 1);
        // if counter is 0, then set the random square
        if (counter === 0) {
          setRandomSquare(getRandomSquare(boardMap));
          setCounter(10);
        }
  
      }, 1000);
      return () => clearInterval(interval);
    }, [counter]);
  


  const handleSquareClick = (id: string) => {
    console.log("Square clicked:", boardMap[id]);
    if (id === randomSquare) {
      console.log("Correct!");
      setRandomSquare(getRandomSquare(boardMap));
      setCounter(10);
    }
  };


  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isDark = (i + j) % 2 === 1;
      const id = `${i}-${j}`;
      squares.push(<SquareComponent key={id} id={id} isDark={isDark} onClick={handleSquareClick} />);
    }
  }

  return <><Board>{squares}{boardMap[randomSquare]}</Board><div>{counter}</div></>;
};

export default EmptyChessBoard;
