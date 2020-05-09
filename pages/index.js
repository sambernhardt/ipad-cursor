import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CursorWrapper from '../components/Cursor/CursorWrapper';
import Layout from "../components/layout.js"

const Home = () => {

  return (
    <Layout>
      <CursorWrapper>
        <Main>
            <Header />
            <Hero />
            <Footer/>
        </Main>
      </CursorWrapper>
    </Layout>
  )
};

const Main = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
  box-sizing: border-box;
  font-family: ${({theme}) => theme.fonts.default};
`;

export default Home;