import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Currently from '../components/Currently';
import Cursor from '../components/Cursor';
import Context from '../components/CursorContext';

var MouseSpeed = require("mouse-speed");

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

const Home = ({ data }) => {
  const [state, setState] = useState({});
  const [ mousePos, setMousePos ] = useState({ x: 0, y: 0 });
  const [ currentElement, setCurrentElement ] = useState();
  const [ textSize, setTextSize ] = useState(12);
  const [ status, setStatus ] = useState("");
  const [ elementType, setElementType ] = useState("");
  const [ exitOrigin, setExitOrigin ] = useState("");
  const [ speed, setSpeed ] = useState(.3);
  
  const handleMouseMove = ({ pageX, pageY }) => {
    setMousePos({x: pageX, y: pageY})
  };

  useEffect(() => {
    // var mspeed = new MouseSpeed();
    // mspeed.init(() => {
    //     var speedX = mspeed.speedX;
    //     var speedY = mspeed.speedY;
    //     // do anything you want with speed values
    //     setSpeed(1 / clamp(Math.abs(speedX + speedY), 1, 5));
    // });
  }, [])

  const contextValue = {
    pos: mousePos,
    setCurrentElement: (el, type) => {
      setCurrentElement(el)
      setElementType(type)
      if (type == "text") {
        setTextSize(window.getComputedStyle(el).fontSize)
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
    textSize
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Main>
        <Context.Provider value={contextValue}>
          <Cursor/>
          <Header />
          <Hero />
        </Context.Provider>
        {/* <Currently /> */}
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

Home.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const json = await res.json();
  return { data: json }
}

export default Home;