import emotionReset from 'emotion-reset'
import { css, Global, useTheme } from '@emotion/react'
import { fonts } from './fonts'

export const GlobalStyles = () => {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        ${fonts}
        ${emotionReset}

        *, &::before, &::after {
          box-sizing: border-box;
        }
        html,
        body {
          background-color: ${theme.colors.Gray200};
          font-family: Merriweather, Helvetica, Arial, sans-serif;
          font-size: 16px;
          color: ${theme.colors.Gray500};
        }
        button {
          cursor: pointer;
          background-color: #fff;
          border: 0px;
          text-align: left;
          transition: background-color 0.35s ease-out, transform 0.35s ease-out;

          &:hover {
            transition-duration: 0.175s;
            transition-timing-function: ease-in;
          }
          &:active {
            transition-duration: 0.175s;
            transition-timing-function: ease-in;
          }
        }
        input {
          border: 0px;
          ${theme.textMods.Body}
          outline: none;
        }
      `}
    />
  )
}
