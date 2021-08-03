import styled from "styled-components";

export const GlassButton = styled.button`
  padding: 4px;
  border: none;
  background: #fff; /* запасной цвет для старых браузеров */
  background: rgba(1, 0, 21, 0.5);
  color: inherit;
  text-align: center;
  text-decoration: none;
  letter-spacing: .5px;
  font-family: inherit;
  cursor: pointer;
  transition: .8s;
  :hover {
    color: #dc00c3;
    font-weight: 550;
    text-shadow: 0 0 0 #FF0000FF, 0 0 10px #ff5ee0, 0 0 20px #ffffff, 0 0 40px #ff00e2, 0 0 80px #ff00de, 0 0 90px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;
  }
`;

