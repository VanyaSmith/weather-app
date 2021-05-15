import { ReactNode } from 'react'
import Head from 'next/head'
import { Header } from './Header'
import styled from '@emotion/styled'

const Content = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[4]}px;
`

type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href="favicon.svg" sizes="any" type="image/svg+xml" />
      <link rel="mask-icon" href="favicon.svg" color="#730641"></link>
    </Head>
    <Content>
      <Header />
      {children}
    </Content>
  </div>
)
