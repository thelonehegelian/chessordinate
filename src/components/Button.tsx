import React from   'react' ;
import styled from   'styled-components' ;

interface ButtonProps {
  text: string;
}
// create a button with styled components, the button background 8a6d3b and the text color f4ce7b
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

// create a function that returns the button
const ButtonComponent: React.FC<ButtonProps> = ({text}) => {
  return <Button>{text}</Button>;
};

export default ButtonComponent;
