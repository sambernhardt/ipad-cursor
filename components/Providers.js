import { Fragment, useState, useEffect, createContext } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset';
import useDarkMode from 'use-dark-mode';
import {light, dark} from '../theme';
import ActiveCursor from './ActiveCursor';

export default ({children}) => {
    const [mounted, setMounted] = useState(false);
    const [showingCursor, setShowingCursor] = useState(false);
    const {value} = useDarkMode(false, { storageKey: null });

    const context = {
      toggleCursor: () => {
        setShowingCursor(!showingCursor)
      },
      showingCursor: showingCursor
    }

    useEffect(() => {
      setMounted(true)
    }, []);

    const body = 
      <Fragment>
          <Reset/>
          <ThemeProvider theme={value ? dark : light}>
            <ActiveCursor.Provider value={context}>
              <Fragment>
                {children}
                <GlobalStyle showingCursor={showingCursor} />
              </Fragment>
            </ActiveCursor.Provider>
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
    ${({ showingCursor }) => !showingCursor && `
      cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='),
      url(cursor.png),
      none;
    `}
  h1 {
    font-size: ${({theme}) => theme.fontSizes[3]}px;
    margin-bottom: ${({theme}) => theme.space[3]}px;
  }
`