import React from 'react';
import styled from 'styled-components';
import { generateBoardMap } from '../constants';

import { BoardMap } from '../types';
// import {generateBoardMap} from './EmptyChessBoard'

const board = generateBoardMap();
// pick a random square from the boardMap
const getRandomSquare = (boardMap: BoardMap): string => {
  const keys = Object.keys(boardMap);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

const Coordinates = styled.div`
  width: 400px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

// export default function CoordinateDisplay() {
//   const [square, setSquare] = React.useState(getRandomSquare(board));


//   return (
//     <div>
//       <h1><Coordinates>{board[square]}</Coordinates></h1>
//     </div>
//   );
// }