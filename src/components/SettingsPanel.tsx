import React from 'react';
import styled from 'styled-components';
import Button from './Button';


// create a div bar with styled components, the bar background 8a6d3b and the text color f4ce7b and the width should be the size of the chess board
const Bar = styled.div`
  width: 400px;
  height: 50px;
  background-color: #8a6d3b;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Text = styled.div`
  width: 400px;
  height: 50px;
  background-color: #f4ce7b;
  color: #8a6d3b;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
`;

// create a function that returns the bar
const SettingsPanel: React.FC = () => {
  return (
    <Bar>
     <Button text = {"+"}/>Timer<Button text = {"-"}/>
     <Button text = {"Start"}/>
     <Button text = {"Pause"}/>
    </Bar>
  );
};

export default SettingsPanel;

