import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  useSystemColorMode: true,
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`
  },
  colors: {
    primary: {
      50: '#e1efff',
      100: '#b2d0ff',
      200: '#83b1fc',
      300: '#5292f8',
      400: '#2473f5',
      500: '#0a5adb',
      600: '#0246ac',
      700: '#00327c',
      800: '#001e4d',
      900: '#000a1f'
    },
    secondary: {
      50: '#e9efff',
      100: '#c6d0ed',
      200: '#a2b1dc',
      300: '#7e92cd',
      400: '#5a73bf',
      500: '#405aa5',
      600: '#324681',
      700: '#23325d',
      800: '#131e3a',
      900: '#040a19',
    },
    brand: {
      50: '#b894ab',
      100: '#aa7f9a',
      200: '#9c6989',
      300: '#8d5478',
      400: '#7f3e67',
      500: '#712956',
      600: '#66254d',
      700: '#5a2145',
      800: '#4f1d3c',
      900: '#441934'
    }
  }
});