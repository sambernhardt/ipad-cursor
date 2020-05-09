import { useState, useEffect, useRef } from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head'
import styled from 'styled-components';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import Context from '../components/CursorContext';
import Layout from "../components/layout.js"
import { debounce } from '../utils';

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

const Home = () => {
  const [state, setState] = useState({});
  const [ mousePos, setMousePos ] = useState({ x: 0, y: 0 });
  const [ currentElement, setCurrentElement ] = useState();
  const [ textSize, setTextSize ] = useState(12);
  const [ status, setStatus ] = useState("");
  const [ elementType, setElementType ] = useState("");
  const [ exitOrigin, setExitOrigin ] = useState("");
  const [ pressing, setPressing ] = useState(false);
  const lastScroll = useRef(0);
  // const lastScrollRef = useRef(lastScroll);
  const [ speed, setSpeed ] = useState(.3);
  const numImages = [];

  const handleMouseMove = ({ pageX, pageY }) => {
    setMousePos({x: pageX, y: pageY})
  };

  const handleScroll = () => {
    // console.log(lastScroll)
    var offset = window.scrollY - lastScroll;
    // setMousePos({ ...mousePos, y: window.scrollY + 500})
    // console.log(window.scrollY + " " + lastScroll);
  }

  const setScrollOffset = () => {
    // var offset = window.scrollY - lastScroll;
    // console.log("Save it: ")
    // console.log(window.scrollY)
    // console.log("Setting: " + window.scrollY)
    lastScroll.current = window.scrollY;
  }

  useEffect(() => {
    // console.log(lastScroll)
    // window.addEventListener('scroll', handleScroll)
    // window.addEventListener('scroll', debounce(setScrollOffset, 1000))
  }, [])

  const contextValue = {
    pos: mousePos,
    setCurrentElement: (el, type) => {
      setCurrentElement(el)
      setElementType(type)
      if (type == "text") {
        let computed = window.getComputedStyle(el).fontSize;
        setTextSize(parseFloat(computed.replace("px")))
      }
      if (!currentElement) {
        setStatus("entering")
      } else {
        setStatus("shifting")
      }

    },
    removeCurrentElement: () => {
      // console.log("Start exit transition")
      setStatus("exiting")
      setCurrentElement(null)
      setElementType(null)
      // setTimeout(() => {
      //   setTransitionExit(false)
      //   // console.log("Stop exit transition")
      // }, (speed) * 1000)
    },
    setExitOrigin: setExitOrigin,
    setStatus: setStatus,
    currentElement: currentElement,
    status: status,
    speed: speed,
    exitOrigin: exitOrigin,
    elementType,
    textSize,
    pressing
  };

  return (
    <Layout>
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
      >
        <Main>
          <Context.Provider value={contextValue}>
            <Cursor/>
            <Header />
            <Hero />
            <Footer/>
            {/* {numImages.map((j, i) => <ImageBlock index={i} />)} */}
          </Context.Provider>
          {/* <Currently /> */}
        </Main>
      </div>
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