import { Fragment, useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset';
import useDarkMode from 'use-dark-mode';
import {light, dark} from '../theme';

export default ({children}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, []);

  const {value} = useDarkMode(false, { storageKey: null });
  
  const body = 
    <Fragment>
        <Reset/>
        <ThemeProvider theme={value ? dark : light}>
          <Fragment>
            {children}
            <GlobalStyle />
          </Fragment>
        </ThemeProvider>
    </Fragment>;

  if (!mounted) {
      return <div style={{ visibility: 'hidden' }}>{body}</div>
  }
  return body;
}

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({theme}) => theme.colors.body};
    background: ${({theme}) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: none;
  }
  h1 {
    font-size: ${({theme}) => theme.fontSizes[3]}px;
    margin-bottom: ${({theme}) => theme.space[3]}px;
  }
`