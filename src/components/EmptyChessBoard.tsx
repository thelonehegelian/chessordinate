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
const Bar = styled.div`
  width: 400px;
  height: 50px;
  background-color: #8a6d3b;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StartStop = styled.div`
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
  const [counter, setCounter] = React.useState(10);
  const [isOn, setIsOn] = React.useState(false);
    // counter display
  React.useEffect(() => {
    // after each 1 second, decrease counter by 1
   if (isOn) {
    const timer = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  //  when the counter is 0, update the random square
    if (counter === 0) {
      setRandomSquare(getRandomSquare(boardMap));
      setCounter(10);
    }
    return () => clearTimeout(timer);
   }

      

  }, [counter, isOn]);


  const handleSquareClick = (id: string) => {
    console.log("Square clicked:", boardMap[id]);
    if (id === randomSquare) {
      console.log("Correct!");
      setRandomSquare(getRandomSquare(boardMap));
      setCounter(10);
    }
  };

  const handleButtonClick = (txt) => {
    txt === 'Start'? setIsOn(true) : setIsOn(false);
     console.log("Button clicked!", isOn);
  }


  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isDark = (i + j) % 2 === 1;
      const id = `${i}-${j}`;
      squares.push(<SquareComponent key={id} id={id} isDark={isDark} onClick={handleSquareClick} />);
    }
  }

  return <><StartStop onClick={()=> handleButtonClick(isOn ? "Pause" : "Start")}>{isOn ? "Pause" : "Start"}</StartStop> <Board>{squares}{boardMap[randomSquare]}</Board><div>{counter}</div></>;
};

export default EmptyChessBoard;


