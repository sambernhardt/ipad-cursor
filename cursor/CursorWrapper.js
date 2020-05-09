import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Cursor from './Cursor';
import Context from './CursorContext';

const GlobalStyle = createGlobalStyle`
  body, input, textarea, a {
    ${({ showingCursor }) => !showingCursor && `
      cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
      url(cursor.png),
      none;
    `}
  }
`;

const Wrapper = ({debug, children}) => {
  const [ mousePos, setMousePos ] = useState({ x: 0, y: 0 });

  const [ currentElement, setCurrentElement ] = useState();
  const [ textSize, setTextSize ] = useState(12);
  const [ status, setStatus ] = useState("");
  const [ elementType, setElementType ] = useState("");
  const [ pressing, setPressing ] = useState(false);
  const [ showingCursor, showingCursorSet ] = useState(false);

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
    setStatus: setStatus,
    currentElement: currentElement,
    status: status,
    elementType,
    textSize,
    pressing,

    toggleCursor: () => {
      showingCursorSet(!showingCursor)
    },
    showingCursor: showingCursor
  };

  return (
    <div
        onMouseMove={handleMouseMove}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
    >
        <Context.Provider value={contextValue}>
            <GlobalStyle showingCursor={showingCursor} />
            <Cursor debug={debug} />
            {children}
        </Context.Provider>
    </div>
  )
};

export default Wrapper;