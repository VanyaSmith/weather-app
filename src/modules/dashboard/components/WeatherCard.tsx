import React from 'react'
import styled from '@emotion/styled'
import { getWeatherCard } from '../query'
import { useQuery, useQueryClient } from 'react-query'

const StyledWeatherCard = styled.div``

export interface IWeatherCardProps {
  city: string
  onRemove: (city: string) => void
}

export const WeatherCard = React.memo(({ city, onRemove }: IWeatherCardProps) => {
  console.log('Render', city)
  const { data } = useQuery(['weatherCard', city], () => getWeatherCard(city))
  const queryClient = useQueryClient()

  const handleClick = () => {
    queryClient.removeQueries(['weatherCard', city])
    onRemove(city)
  }

  if (!data) {
    return <p>Loading...</p>
  }

  return (
    <StyledWeatherCard>
      {data.name}{' '}
      <button type="button" onClick={handleClick}>
        X
      </button>
    </StyledWeatherCard>
  )
})
