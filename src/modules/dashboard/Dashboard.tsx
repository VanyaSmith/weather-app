import React, { useCallback, useRef, useState } from 'react'

import { WeatherCard } from './components/WeatherCard'
import { GeoSearch } from './components/GeoSearch'
import { Col, Subtitle, Row, Title } from 'uikit'

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
    <>
      <Row mb={3}>
        <Col width={[1, 1 / 2]}>
          <Title>Weather forecast</Title>
          <Subtitle>
            Simple but powerful weather forcasting service based on OpenWeatherMap API
          </Subtitle>
        </Col>
        <Col width={[1, 1 / 2]}>
          <GeoSearch onAddCity={addCity} />
        </Col>
      </Row>
      <Row>
        {currCities &&
          currCities.map((city) => (
            <Col width={[1, 1 / 2]} pb={5} pt={0} key={city}>
              <WeatherCard city={city} onRemove={removeCity} />
            </Col>
          ))}
      </Row>
    </>
  )
}
