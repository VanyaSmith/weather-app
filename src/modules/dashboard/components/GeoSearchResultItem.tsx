import React from 'react'
import styled from '@emotion/styled'
import { CityData } from '../interfaces'
import { Text } from 'uikit'
import { css } from '@emotion/react'

const StyledGeoSearchResultItem = styled.button`
  position: relative;
  padding: 20px 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray100};
  }
  &:active {
    transform: none;
  }
  &:after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background-image: url('/icons/add.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
  &:not(:last-child):before {
    content: '';
    position: absolute;
    top: 100%;
    left: 24px;
    right: 24px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.Gray200};
    z-index: 1;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      pointer-events: none;

      &:hover {
        background-color: transparent;
      }
      &:after {
        display: none;
      }
      ${Text} {
        opacity: 0.5;
      }
    `}
`

interface GeoSearchResultItemProps extends CityData {
  isExist?: boolean
  onClick: (city: CityData) => void
}

export const GeoSearchResultItem = React.memo(
  ({ isExist, onClick, ...city }: GeoSearchResultItemProps) => {
    const handleClick = () => onClick(city)

    return (
      <StyledGeoSearchResultItem onClick={handleClick} disabled={isExist}>
        <div>
          <Text mod="Body" bold>
            {city.name}, {city.country}
          </Text>
          <Text mod="Caption">
            {city.lat}, {city.lon}
          </Text>
        </div>
      </StyledGeoSearchResultItem>
    )
  }
)
