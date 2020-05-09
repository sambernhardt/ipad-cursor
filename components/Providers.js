import { Fragment, useState, useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import useDarkMode from 'use-dark-mode';

import {light, dark} from '../theme';
import CursorProvider from '../cursor/Provider';

let a = 3;

export default ({children}) => {
    const [mounted, setMounted] = useState(false);
    const {value} = useDarkMode(false, { storageKey: null });

    useEffect(() => {
      setMounted(true)
    }, []);

    const body = 
      <Fragment>
          <Reset/>
          <ThemeProvider theme={value ? dark : light}>
              <CursorProvider>
                {children}
                <GlobalStyle/>
              </CursorProvider>
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
    font-family: ${({theme}) => theme.fonts.default};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1 {
    font-size: ${({theme}) => theme.fontSizes[3]}px;
    margin-bottom: ${({theme}) => theme.space[3]}px;
  }
`;