import { WeatherCard } from './components/WeatherCard'
import { Col, Row } from 'uikit'
import { useCities } from './hooks/useCities'

export interface DashboardProps {}

export const Dashboard = () => {
  const { cities } = useCities()

  return (
    <Row>
      {cities &&
        cities.map((city) => (
          <Col width={[1, 0.5]} pb={5} pt={0} key={String(city.lat) + String(city.lon)}>
            <WeatherCard {...city} />
          </Col>
        ))}
    </Row>
  )
}
