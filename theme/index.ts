import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    50: '#E8E6FE',
    100: '#BFBAFC',
    200: '#958EFB',
    300: '#6C62F9',
    400: '#10069F',
    500: '#1909F6',
    600: '#002D72',
    700: '#0F0693',
    800: '#0A0462',
    900: '#050231',
  },
  brandGrey: {
    100: '#BEC4C5',
    200: '#A2AAAD',
    300: '#7C878E',
    400: '#5B6770',
    600: '#333F48',
  },
  white: '#ffffff',
}

const fonts = {
  heading: `'Alata', sans-serif`,
  body: `'Albert Sans', sans-serif`,
}

const theme = extendTheme({ colors, fonts })

export default theme
