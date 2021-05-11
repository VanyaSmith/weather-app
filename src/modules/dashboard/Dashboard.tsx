import React, { useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'

import { WeatherCard } from './components/WeatherCard'
import { GeoSearch } from './components/GeoSearch'

const StyledDashboard = styled.div``

export interface IDashboardProps {
  cities?: string[] | null
}

const setCookies = (cities: string[]) => {
  if (cities.length) {
    document.cookie = `cities=${cities.map((city) => encodeURI(city)).join()}; path=/`
  } else {
    document.cookie = `cities=; path=/`
  }
}

export const Dashboard: React.FC<IDashboardProps> = ({ cities }) => {
  const [currCities, setCurrCities] = useState(cities)
  const refCurrCities = useRef<typeof currCities>()
  refCurrCities.current = currCities

  const addCity = useCallback(
    (value) => {
      const newCurrCities = [...(currCities || []), value]

      setCurrCities(newCurrCities)
      setCookies(newCurrCities)
    },
    [currCities]
  )

  const removeCity = useCallback((city) => {
    if (refCurrCities.current) {
      const newCurrCities = refCurrCities.current.filter((item) => item != city)

      setCurrCities(newCurrCities)
      setCookies(newCurrCities)
    }
  }, [])

  return (
    <StyledDashboard>
      <GeoSearch onAddCity={addCity} />
      {currCities &&
        currCities.map((city) => <WeatherCard key={city} city={city} onRemove={removeCity} />)}
    </StyledDashboard>
  )
}
