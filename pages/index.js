import styled from 'styled-components';

import Header from '../components/components/Header';
import Hero from '../components/components/Hero';
import Footer from '../components/components/Footer';
import CursorWrapper from '../cursor/CursorWrapper';
import GoogleAnalytics from "../components/GoogleAnalytics/Layout.js"

const Home = () => {

  let body = (
      <CursorWrapper>
        <Main>
            <Header />
            <Hero />
            <Footer/>
        </Main>
      </CursorWrapper>
  );

  if (process.env.google_analytics) {
    return <GoogleAnalytics>{body}</GoogleAnalytics>
  }

  return body
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