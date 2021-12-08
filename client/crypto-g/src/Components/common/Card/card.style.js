import styled from "styled-components";
import yellowStarSmall from '../../../images/icons/yellowStarSmall.png';
import paleStar from '../../../images/icons/paleStar.svg';
import {media_breakpoint_down, media_breakpoint_range} from "../../../styles-common/base.style";

export const CardCnt = styled.div`
  display: flex;
  width: ${({widthCard}) => (widthCard ? widthCard : '25rem')};
  margin: 1rem;
  flex-direction: column;
  align-items: center;
  transition: .4s;
  background: rgba( 255, 255, 255, 0.10 );
  backdrop-filter: blur( 6.0px );
  -webkit-backdrop-filter: blur( 4.0px );
  border-radius: 10px;
  border: 3px solid rgb(255 255 255 / 15% );
  ${media_breakpoint_range('md', 'sm')} {
    width: 22rem;
    margin: .5rem;
  }
`;

export const HeaderCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  align-items: center;
`;

export const StarContainer = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  margin-left: auto;
  cursor: pointer;
  background-image: url("${({favoriteAdd}) => ((favoriteAdd) ? yellowStarSmall : paleStar)}");
  background-repeat: no-repeat;
  background-position: center;
  transition: .5s;
`;

export const CryptoName = styled.div`
  display: flex;
  justify-content: center;
  text-transform: capitalize;
`;

export const CurrensyBox = styled.div`
  font-size: 1rem;
  margin-left: 20px;
  margin-top: 30px;
  animation: breath 800ms ease-out infinite alternate;
  @keyframes breath {
    0% {
      color: #393;
      text-shadow: 0 0 5px rgba(0, 255, 0, .2);
    }
    100% {
      color: #6f6;
      text-shadow: 0 0 20px rgba(0, 255, 0, .6);
    }
`

export const CardGraph = styled.div`
  width: 100%;
  height: ${ ({heightCard}) => (heightCard ? heightCard : '20rem') };
`;


