/**
 * @todo add time increase and decrease buttons
 * Advance + Optional
 * @todo flash background green if correct, red if incorrect
 * @todo display target coordinate on all four sides of the board
 * @todo flash the coordinates when clicked
 * @todo flash the coordinates when the timer runs out

  */

import React from 'react';
import styled from 'styled-components';
import { BoardMap, SquareProps, BarProps} from '../types';
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
const Bar = styled.div<BarProps>`
  width: 400px;
  height: 50px;
  background-color: #8a6d3b;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => (props.isAnswerCorrect ? '#56AD31' : '#AD3131')};
`;
const StartStop = styled.button`
  width: 100px;
  height: 40px;
  background-color: #8a6d3b;
  color: #f4ce7b;
  border: 1px solid #f4ce7b;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IncreaseDecreaseTime = styled.button`
  width: 50px;
  height: 40px;
  background-color: #8a6d3b;
  color: #f4ce7b;
  border: 1px solid #f4ce7b;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

`;

// coordinateDisplay component white bold font full caps height is the same as the Button component
const CoordinateDisplay = styled.div`
  width: 100px;
  height: 40px;
  // background-color: #f4ce7b;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CounterDisplay = styled.div`
  width: 120px;
  height: 40px;
  // background-color: #f4ce7b;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ScoreDisplay = styled.div`
  width: 100px;
  height: 40px;
  // background-color: #f4ce7b;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
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
};

const EmptyChessBoard: React.FC = () => {
  const squares: JSX.Element[] = [];
  const [randomSquare, setRandomSquare] = React.useState(
    getRandomSquare(boardMap)
  );
  const [counter, setCounter] = React.useState(10);
  const [isGameOn, setIsGameOn] = React.useState(false);
  const [answer, setAnswer] = React.useState(false);
  const [score, setScore] = React.useState(0);
  
  // counter display
  React.useEffect(() => {
    // after each 1 second, decrease counter by 1
    if (isGameOn) {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      //  when the counter is 0, update the random square
      if (counter === 0) {
        setRandomSquare(getRandomSquare(boardMap));
        setCounter(10);
        setScore(score - 1);
      }
      return () => clearTimeout(timer);
    }

    if (!isGameOn) {
      setCounter(10);
    }

  }, [counter, isGameOn]);

  const handleSquareClick = (id: string) => {
    console.log('Square clicked:', boardMap[id]);
    if (id === randomSquare) {
      setAnswer(true);
      setRandomSquare(getRandomSquare(boardMap));
      setCounter(10);
      setScore(score + 1);
    }
    else if (isGameOn && id !== randomSquare){ 
      setAnswer(false);
      setScore(score - 1);
    }
  };

  const handleButtonClick = (txt) => {
    txt === 'Start' ? setIsGameOn(true) : setIsGameOn(false);
    setScore(0);
    // txt === '+' ? setCounter(counter + 10) : setCounter(counter);
    // txt === '-' ? setCounter(counter - 10) : setCounter(counter);
  };

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isDark = (i + j) % 2 === 1;
      const id = `${i}-${j}`;
      squares.push(
        <SquareComponent
          key={id}
          id={id}
          isDark={isDark}
          onClick={handleSquareClick}
        />
      );
    }
  }

  return (
    <>
    <Bar isAnswerCorrect = {answer}>
      <StartStop onClick={() => handleButtonClick(isGameOn ? 'Stop' : 'Start')}>
        {isGameOn ? 'Stop' : 'Start'}
      </StartStop>{' '}
      <CoordinateDisplay>{boardMap[randomSquare]} </CoordinateDisplay>
      {/* <IncreaseDecreaseTime onClick={() => handleButtonClick('+')}>+</IncreaseDecreaseTime>{' '}
      <IncreaseDecreaseTime onClick={() => handleButtonClick('-')}>-</IncreaseDecreaseTime>{' '} */}
     
      </Bar>
      <Board>
        {squares}
      </Board>
      <Bar isAnswerCorrect = {answer}><CounterDisplay>Time: {counter}</CounterDisplay><ScoreDisplay>Score: {score}</ScoreDisplay></Bar>
    </>
  );
};

export default EmptyChessBoard;
