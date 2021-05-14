import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[3]}px;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: ${(props) => props.theme.colors.Gray300};
  }
`
export const HeaderLogo = styled.a`
  display: block;
  width: 48px;
  height: 48px;
  background-image: url('/icons/logo.svg');
  margin: 0 ${({ theme }) => theme.space[3]}px;
`

export const Header = React.memo(() => {
  return (
    <StyledHeader>
      <Link href="/">
        <HeaderLogo href="/" />
      </Link>
    </StyledHeader>
  )
})
