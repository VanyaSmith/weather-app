import styled from '@emotion/styled'
import { theme } from 'src/globalStyles/theme'

export const Title = styled.h1`
  font-size: 36px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.Gray500};
  margin-bottom: ${({ theme }) => theme.space[3]}px;
`
export const Subtitle = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.Gray400};

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

type Text = {
  mod: keyof typeof theme.textMods
  color?: keyof typeof theme.colors
  bold?: boolean
  margin?: string
}
export const Text = styled.p<Text>`
  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.Gray500)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};

  &:not(:last-child) {
    margin: ${({ margin }) => margin || '0 0 8px'};
  }

  ${({ theme, mod }) => theme.textMods[mod]}
`
