import { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';

const Home = ({ data }) => {
  const [state, setState] = useState({});
  
  return (
    <Main>
      <h1>Hello, world!</h1>
      {JSON.stringify(data, null, 4)}
    </Main>
  )
};

const Main = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 48px 0;
  font-family: ${({theme}) => theme.fonts.default};
`;

Home.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const json = await res.json();
  return { data: json }
}

export default Home;