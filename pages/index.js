import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Currently from '../components/Currently';
import Cursor from '../components/Cursor';
import Context from '../components/CursorContext';

const Home = ({ data }) => {
  const [state, setState] = useState({});
  const [ mousePos, setMousePos ] = useState({ x: 0, y: 0 });
  const [ currentElement, setCurrentElement ] = useState();
  const [ previousScrollPos, setPreviousScrollPos ] = useState(0);
  const [ doneTransitioning, setDoneTransitioning ] = useState(false);
  
  const handleMouseMove = ({ pageX, pageY }) => {
    setMousePos({x: pageX, y: pageY})
  };

  useEffect(() => {
    var isScrolling;
    window.addEventListener("scroll", e => {
      // // Clear our timeout throughout the scroll
      // window.clearTimeout( isScrolling );
      // // Set a timeout to run after scrolling ends
      // isScrolling = setTimeout(function() {
      //   console.log( 'Scrolling has stopped.' );
      //   setPreviousScrollPos({y: e.scrollY});
      // }, 66);
      // console.log(mousePos.y + (window.scrollY - previousScrollPos))
      // setMousePos({x: mousePos.x, y: mousePos.y + (window.scrollY - previousScrollPos)});
    })
    return () => {
      window.removeEventListener("scroll", () => {

      })
    };
  }, []);

  const contextValue = {
    pos: mousePos,
    setCurrentElement: (el) => {
      setCurrentElement(el)

      // are you transitioning into a clickable element from nothing
      if (!currentElement) {
        setTimeout(() => setDoneTransitioning(true), 300)
      } else {
        setDoneTransitioning(true)
      }
    },
    removeCurrentElement: () => {
      setDoneTransitioning(false)
      setCurrentElement(null)
    },
    currentElement: currentElement,
    doneTransitioning: doneTransitioning
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