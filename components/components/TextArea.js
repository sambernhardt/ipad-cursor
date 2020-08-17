import { useState, useEffect, useCallback, useContext } from 'react';
import { transparentize } from 'polished';
import styled from 'styled-components';
import autosize from 'autosize';

import WithHover from '../../cursor/WithHover';

const Container = WithHover(styled.textarea`
  font-size: 32px;
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.colors.body};
  font-family: ${({theme}) => theme.fonts.default};
  border: none;
  margin-bottom: 24px;
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
        <Container passThroughRef={ref} rows="1" {...props}/>
    )
}

export default TextArea;
