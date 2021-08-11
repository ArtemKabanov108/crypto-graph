import styled from "styled-components";
import {colors} from "../../../../styles-common/common.style";

export const Input = styled.input`
  display: block;
  width: 300px;
  height: 40px;
  padding: 0 10px;
  background: ${colors.transparentBackground};
  border: 1px solid #444;
  border-radius: 5px;
  box-shadow: 0 2px 0 #000;
  color: ${colors.textForInput};
  float: left;
  font-family: inherit;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.8px;
  text-shadow: 0 -1px 0 #000;

  ::placeholder {
    color: #6fa156;
  }

  :focus {
    animation: glow 800ms ease-out infinite alternate;
    background: ${colors.transparentBackground};
    border-color: #393;
    box-shadow: 0 0 5px rgba(0, 255, 0, .2), inset 0 0 5px rgba(0, 255, 0, .1), 0 2px 0 #000;
    color: ${colors.textForInput};
    outline: none;
  }

  @keyframes glow {
    0% {
      border-color: #393;
      box-shadow: 0 0 5px rgba(0, 255, 0, .2), inset 0 0 5px rgba(0, 255, 0, .1), 0 2px 0 #000;
    }
    100% {
      border-color: #6f6;
      box-shadow: 0 0 20px rgba(0, 255, 0, .6), inset 0 0 10px rgba(0, 255, 0, .4), 0 2px 0 #000;
    }
  }
`;

export const Label = styled.label`
  margin: 10px;
  font-size: 0.8rem;
  color: inherit;
`;

