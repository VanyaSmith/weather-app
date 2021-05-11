import { css } from '@emotion/react'

export const fonts = css`
  @font-face {
    font-family: 'PT Root UI';
    src: url('/fonts/PTRootUI-Bold.woff2') format('woff2'),
      url('/fonts/PTRootUI-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PT Root UI';
    src: url('/fonts/PTRootUI-Medium.woff2') format('woff2'),
      url('/fonts/PTRootUI-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PT Root UI';
    src: url('/fonts/PTRootUI-Regular.woff2') format('woff2'),
      url('/fonts/PTRootUI-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Merriweather';
    src: url('/fonts/Merriweather-Regular.woff2') format('woff2'),
      url('/fonts/Merriweather-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`
