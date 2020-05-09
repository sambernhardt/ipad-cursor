`git clone https://github.com/sambernhardt/ipad-cursor.git`

`npm i`

`npm run start`

![Preview](https://github.com/sambernhardt/ipad-cursor/blob/master/public/preview.gif)

# Basic usage

## Add the CursorProvider to a page
```javascript
// app.js

import App from 'next/app';
import CursorProvider from '../cursor/Provider';

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props;
    
    return (
      <CursorProvider>
        <Component {...pageProps} />
      </CursorProvider>
    )
  }
}
```

## Then wrap your components with the `WithHover` function
```javascript
// Component.js
import WithHover from '../cursor/WithHover';

const Component = () => <h1>;

export default WithHover(<Component />, 'block');
```


### Caveats:
- To move the contents of the hovered component, the component must have a display type of `inline-block` or `block`. CSS transforms don't work on inline elements.
