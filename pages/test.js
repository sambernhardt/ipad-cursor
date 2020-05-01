import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Home = ({ data }) => {
  const [ active, activeSet ] = useState(false);


  return (
    <div>
      <Main>
        
      </Main>
    </div>
  )
};

const Main = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 16px;
  box-sizing: border-box;
  font-family: ${({theme}) => theme.fonts.default};
  /* cursor: url('/cursor.svg'), auto; */
`;

export default Home;