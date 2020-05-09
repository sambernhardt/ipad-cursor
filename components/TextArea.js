import { useState, useEffect, useCallback, useContext } from 'react';
import { transparentize } from 'polished';
import styled from 'styled-components';
import autosize from 'autosize';

import ActiveCursor from './ActiveCursor';
import WithHover from './Cursor/WithHover';

const Container = WithHover(styled.textarea`
  font-size: 32px;
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.colors.body};
  border: none;
  margin-bottom: 24px;
  ${({ showingCursor }) => !showingCursor && `
    cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
      url(cursor.png),
      none;
  `}
  resize: none; 
  &:focus {
      outline: none;
  }
  &::selection {
    background: ${({theme}) => transparentize(.6, theme.colors.highlight)};
  }
`, 'text');

const TextArea = (props) => {
    const [ myRef, setRef ] = useState();
    const context = useContext(ActiveCursor);
    const ref = useCallback(node => {
        autosize(node)
        setRef(node)
    });

    useEffect(() => {
      if (myRef && props.focus) {
        myRef.focus();
      }
    },[myRef])

    return (
        <Container passThroughRef={ref} rows="1" showingCursor={context.showingCursor} {...props}/>
    )
}

export default TextArea;