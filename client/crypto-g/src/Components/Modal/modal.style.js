import styled from "styled-components";
import {colors} from '../../styles-common/common.style'

export const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  opacity: ${({active}) => ( active ?  '1' : '0' )};
  pointer-events: ${({active}) => ( active ?  "all" : "none")};
  transition: .8s;
`;


export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  transition: .4s;
  background: rgba( 255, 255, 255, 0.10 );
  box-shadow: ${colors.neonBorderBlue}
  backdrop-filter: blur( 4.0px );
  -webkit-backdrop-filter: blur( 4.0px );
  border-radius: 10px;
  border: 2px solid rgb(255 255 255 / 70%);
  transform: ${({active}) => ((active === true )? "scale(1)" : "scale(0.5)")};
`;