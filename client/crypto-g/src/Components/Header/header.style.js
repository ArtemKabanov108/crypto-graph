import styled from "styled-components";
import {media_breakpoint_down} from "../../styles-common/base.style";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  ${media_breakpoint_down('sm')} {
    flex-direction: column;
    justify-content: center;
    align-items: baseline;
  }
`;

//TODO add flicker to BtnCtnr(LoginBtn)
export const BtnCtnr = styled.div`
  margin: 1.5% 3% 0 auto;
  
`;