import { css, Global } from '@emotion/react'
import { fonts } from './fonts'

export const globalStyles = (
  <Global
    styles={css`
      ${fonts}

      html,
      body {
        padding: 3rem 1rem;
        margin: 0;
        background: papayawhip;
        min-height: 100%;
        font-family: Merriweather, Helvetica, Arial, sans-serif;
        font-size: 24px;
      }
    `}
  />
)
