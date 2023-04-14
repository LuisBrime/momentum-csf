import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    50: '#E8E6FE',
    100: '#BFBAFC',
    200: '#958EFB',
    300: '#6C62F9',
    400: '#10069F',
    500: '#0E058A',
    600: '#0C0476',
    700: '#0A0462',
    800: '#08034E',
    900: '#050231',
  },
  brandSecondary: {
    50: '#ECC298',
    100: '#E9B886',
    200: '#E6AD75',
    300: '#DF9953',
    400: '#DC8E3F',
    500: '#D98530',
    600: '#CF7A26',
    700: '#BE7023',
    800: '#AC6620',
    900: '#9B5C1C',
  },
  brandGrey: {
    50: '#D4D8D9',
    100: '#BEC4C5',
    200: '#A2AAAD',
    300: '#7C878E',
    400: '#5B6770',
    600: '#333F48',
  },
  white: '#ffffff',
  momentumBlack: '#222222',
  momentumBlacky: '#444444DD',
  black: '#0A0A0A',
}

const fonts = {
  heading: `'Alata', sans-serif`,
  body: `'Albert Sans', sans-serif`,
}

const theme = extendTheme({ colors, fonts })

export default theme
