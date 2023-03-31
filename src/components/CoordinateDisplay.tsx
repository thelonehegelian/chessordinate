import React from 'react';
import styled from 'styled-components';

import { BoardMap } from '../types';
import {generateBoardMap} from './EmptyChessBoard'
const board = generateBoardMap();
// pick a random square from the boardMap
const getRandomSquare = (boardMap: BoardMap): string => {
  const keys = Object.keys(boardMap);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

export default function CoordinateDisplay() {
  const [square, setSquare] = React.useState(getRandomSquare(board));
  

  return (
    <div>
      <h1>{board[square]}</h1>
    </div>
  );
}