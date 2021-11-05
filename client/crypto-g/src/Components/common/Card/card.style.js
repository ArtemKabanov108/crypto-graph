import styled from "styled-components";
import yellowStarSmall from '../../../images/stars/yellowStarSmall.png';
import paleStar from '../../../images/stars/paleStar.svg';

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

export const CardGraph = styled.div`
  width: 100%;
  height: ${ ({heightCard}) => (heightCard ? heightCard : '20rem') };
`;


