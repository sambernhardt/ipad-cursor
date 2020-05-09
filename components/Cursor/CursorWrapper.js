import { useState, useEffect, useRef } from 'react';
import Cursor from './Cursor';
import Context from './CursorContext';

const Wrapper = ({children}) => {
  const [ mousePos, setMousePos ] = useState({ x: 0, y: 0 });
  const [ currentElement, setCurrentElement ] = useState();
  const [ textSize, setTextSize ] = useState(12);
  const [ status, setStatus ] = useState("");
  const [ elementType, setElementType ] = useState("");
  const [ exitOrigin, setExitOrigin ] = useState("");
  const [ pressing, setPressing ] = useState(false);
  const [ speed, setSpeed ] = useState(.3);
  const numImages = [];

  const handleMouseMove = ({ pageX, pageY }) => {
    setMousePos({x: pageX, y: pageY})
  };

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
      setStatus("exiting")
      setCurrentElement(null)
      setElementType(null)
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
    <div
        onMouseMove={handleMouseMove}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
    >
        <Context.Provider value={contextValue}>
            <Cursor/>
            {children}
        </Context.Provider>
    </div>
  )
};

export default Wrapper;