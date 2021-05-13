/// <reference types="next" />
/// <reference types="next/types/global" />
import '@emotion/react'
import { theme } from 'src/globalStyles/theme'

type MyTheme = typeof theme
declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
