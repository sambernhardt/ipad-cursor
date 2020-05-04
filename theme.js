const light = {
  colors: {
    background: '#fff',
    foreground: '#eee',
    cursor: '#888',
    body: '#222',
    black: '#222',
    purple: '#11144C',
    red: '#E16262',
    green: '#3A9679',
    yellow: '#FABC60',
    blue: 'rgb(0,122,255)',
    highlight: '#FABC60',
  }
}

const dark = {
  colors: {
    body: '#fff',
    background: 'black',
    cursor: '#bbb',
    foreground: '#222',
    purple: '#11144C',
    red: '#E16262',
    green: '#3A9679',
    yellow: '#FABC60',
    blue: 'rgb(10,132,255)',
    highlight: 'rgb(10,132,255)',
  }
}

const common = {
  breakpoints: ['40em', '52em', '64em'],
  fonts: {
    default: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;'
  },
  fontSizes: [16, 20, 24, 32, 48, 64],
  space: [
    0, 4, 8, 16, 32, 64, 128, 256
  ]
}

module.exports = {
  light: {...common, ...light},
  dark: {...common, ...dark}
}