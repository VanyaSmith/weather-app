import styled from '@emotion/styled'
import { theme } from 'src/globalStyles/theme'

export const Title = styled.h1`
  ${({ theme }) => theme.textMods.Title}
  color: ${({ theme }) => theme.colors.Gray500};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space[3]}px;
  }
`
export const Subtitle = styled.p`
  ${({ theme }) => theme.textMods.Subtitle}
  color: ${({ theme }) => theme.colors.Gray400};

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.space[2]}px;
  }
`

type Text = {
  mod: keyof typeof theme.textMods
  colorText?: keyof typeof theme.colors
  bold?: boolean
  margin?: string
}
export const Text = styled.p<Text>`
  color: ${({ theme, colorText }) => (colorText ? theme.colors[colorText] : theme.colors.Gray500)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

  &:not(:last-child) {
    margin: ${({ margin }) => margin || '0 0 8px'};
  }

  ${({ theme, mod }) => theme.textMods[mod]}
`
