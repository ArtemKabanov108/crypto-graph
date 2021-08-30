import styled from "styled-components";

export const SurfaceCnt = styled.div`
  display: flex;
  padding: 3rem 3.1rem 0 3.1rem;
  justify-content: ${ ({centeringEnable}) => ( centeringEnable ? 'center' : 'none' ) } ;
  flex-wrap: ${ ({wrapEnable}) => ( wrapEnable ? 'wrap' : 'none' ) } ;
  align-items: center;
`;
