import styled from "styled-components";

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
  opacity: ${({active}) => ( active ?  "1" : "0")};
  pointer-events: ${({active}) => ( active ?  "all" : "none")};
  transition: .8s;
`;


export const ModalContent = styled.div`	
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 5px;
	border-radius: 12px;
	background: white;
	height: 360px;
	width: 520px;
	transition: .4s;
  transform: ${({active}) => ( active ?  "scale(1)" : "scale(0.5)")};
`