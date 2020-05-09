import styled from 'styled-components';

import Header from '../components/components/Header';
import Hero from '../components/components/Hero';
import Footer from '../components/components/Footer';
import GoogleAnalytics from "../components/GoogleAnalytics/layout.js"

const Main = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
  box-sizing: border-box;
`;

const Home = () => {
  const body = (
    <Main>
        <Header />
        <Hero />
        <Footer/>
    </Main>
  );

  return process.env.google_analytics ? <GoogleAnalytics>{body}</GoogleAnalytics> : body
};

export default Home;