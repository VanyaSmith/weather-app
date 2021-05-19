import { css } from '@emotion/react'

const breakpoints = ['30em', '40em', '52em', '64em']
const colors = {
  Gray100: '#FAFAF9',
  Gray200: '#E4E0DF',
  Gray300: '#D6D2D1',
  Gray400: '#8E8B8B',
  Gray500: '#272525',
  Purple100: '#730641',
}
const serif = `Merriweather, Georgia, 'Times New Roman', serif`
const sansSerif = `'PT Root UI', Arial, sans-serif`

export const theme = {
  colors,
  fontFamilies: { serif, sansSerif },
  textMods: {
    Title: css`
      font-family: ${serif};
      font-size: 36px;
      line-height: 1;
    `,
    Subtitle: css`
      font-family: ${serif};
      font-size: 16px;
      line-height: 1.5;
    `,
    Display: css`
      font-size: 48px;
      line-height: 1;
    `,
    Body: css`
      font-size: 16px;
      line-height: 1.5;
    `,
    Caption: css`
      font-size: 14px;
      line-height: 20px;
    `,
    Caps: css`
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    `,
  },
  space: [0, 4, 8, 16, 24, 32, 48],
  breakpoints,
  mediaQueries: {
    smallest: `@media screen and (min-width: ${breakpoints[0]})`, // 480px
    small: `@media screen and (min-width: ${breakpoints[1]})`, // 640px
    medium: `@media screen and (min-width: ${breakpoints[2]})`, // 832px
    large: `@media screen and (min-width: ${breakpoints[3]})`, // 1024px
  },
}
