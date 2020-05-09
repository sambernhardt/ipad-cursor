import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Cursor from './Cursor';
import Context from './Context';

const GlobalStyle = createGlobalStyle`
  body, input, textarea, a {
    ${({ showingCursor }) => !showingCursor && `
      cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
      url(cursor.png),
      none;
    `}
  }
`;

const Provider = ({debug, children}) => {
  const [ mousePos, setMousePos ] = useState({ x: 0, y: 0 });

  const [ selectedElement, selectedElementSet ] = useState({ el: null });
  const [ status, setStatus ] = useState("");
  const [ pressing, setPressing ] = useState(false);
  const [ showingCursor, showingCursorSet ] = useState(false);

  const handleMouseMove = ({ pageX, pageY }) => {
    setMousePos({x: pageX, y: pageY})
  };

  const context = {
    pos: mousePos,
    selectedElementSet: (element) => {
      selectedElementSet(element)
      if (!selectedElement.el) {
        setStatus("entering")
      } else {
        setStatus("shifting")
      }

    },
    removeSelectedElement: () => {
      setStatus("exiting")
      selectedElementSet({ el: null })
    },
    setStatus: setStatus,
    status: status,
    selectedElement,
    pressing,

    toggleCursor: () => showingCursorSet(!showingCursor),
    showingCursor: showingCursor
  };

  return (
    <div
        onMouseMove={handleMouseMove}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
    >
        <Context.Provider value={context}>
            <GlobalStyle showingCursor={showingCursor} />
            <Cursor debug={debug} />
            {children}
        </Context.Provider>
    </div>
  )
};

export default Provider;