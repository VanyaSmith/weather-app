import { css } from '@emotion/react'
import styled from '@emotion/styled'

const StyledLoader = styled.div<LoaderProps>`
  width: ${({ width }) => width || '24px'};

  ${({ center }) =>
    center &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    `}
`
const Spinner = styled.div`
  width: 100%;
  padding-top: 100%;
  background-image: url('/icons/spinner.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  animation: spinner 1s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

interface LoaderProps {
  className?: string
  width?: string
  center?: boolean
}

export const Loader = (props: LoaderProps) => (
  <StyledLoader {...props}>
    <Spinner />
  </StyledLoader>
)
