import styled from "styled-components";

export const SurfaceCnt = styled.div`
  display: flex;
  justify-content: center ;
`;
export const SurfaceBox = styled.div`
  display: flex;
  padding-top: 2.2rem;
  justify-content: ${ ({centeringEnable}) => ( centeringEnable ? 'center' : 'none' ) } ;
  flex-wrap: ${ ({wrapEnable}) => ( wrapEnable ? 'wrap' : 'none' ) } ;
  align-items: center;
`;