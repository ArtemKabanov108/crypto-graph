import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  padding: 0 10px 0 10px;  
  justify-content: center;
  align-items: center;
   & :last-child {
    margin-left: 30px;
  }
`;

export const PlaceLine = styled.div`
  width: inherit;
  height: 1px;
  background-color: #ff9fef;
  box-shadow: 0 0 20px rgb(255, 0, 220), inset 0 0 10px rgba(0, 255, 0, .4), 0 2px 0 #000;
`
