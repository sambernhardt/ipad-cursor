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
  const [ previousScrollPos, setPreviousScrollPos ] = useState(0);
  const [ transitionEnter, setTransitionEnter ] = useState(false);
  const [ transitionExit, setTransitionExit ] = useState(false);
  const [ exitOrigin, setExitOrigin ] = useState("");
  const [ speed, setSpeed ] = useState(.5);
  
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
    setCurrentElement: (el) => {
      setCurrentElement(el)
      
      if (!currentElement) {
        // console.log("Start enter transition")
        setTransitionEnter(true)
        setTimeout(() => {
          setTransitionEnter(false)
          // console.log("Stop enter transition")
        }, speed * 1000)
      } else {
        setTransitionEnter(false)
        console.log("Moved to another")
        // setDoneTransitioning(true)
      }

    },
    removeCurrentElement: () => {
      // console.log("Start exit transition")
      setTransitionExit(true)
      setCurrentElement(null)
      setTimeout(() => {
        setTransitionExit(false)
        // console.log("Stop exit transition")
      }, (speed + 1) * 1000)
    },
    setExitOrigin: setExitOrigin,
    currentElement: currentElement,
    transitionEnter: transitionEnter,
    transitionExit: transitionExit,
    speed: speed,
    exitOrigin: exitOrigin
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Main>
        <Context.Provider value={contextValue}>
          <Cursor/>
          <Header />
          <Hero />
          <Currently />
        </Context.Provider>
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