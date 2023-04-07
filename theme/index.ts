import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    200: '#407EC9',
    400: '#10069F',
    600: '#002D72',
  },
  brandGrey: {
    200: '#A2AAAD',
    300: '#7C878E',
    400: '#5B6770',
    600: '#333F48',
  },
  white: '#ffffff',
}

const fonts = {
  heading: `'Quattrocento', serif`,
  body: `'Quattrocento Sans', sans-serif`,
}

const theme = extendTheme({ colors, fonts })

export default theme
