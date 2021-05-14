import { GetServerSidePropsContext } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { Col, Layout, Row, Subtitle, Title } from 'uikit'
import { Dashboard, GeoSearch, getWeatherCard } from 'modules/dashboard'
import { readCookie } from 'utils/cookie'
import { CityData } from 'modules/dashboard/interfaces'
import { Flex } from '@rebass/grid/emotion'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cities = readCookie<CityData[]>('cities', context.req.headers.cookie)
  const queryClient = new QueryClient()

  console.log({ cities })

  if (cities) {
    await Promise.all(
      cities.map((city) =>
        queryClient.prefetchQuery(['weatherCard', city], () => getWeatherCard(city))
      )
    )
    queryClient.setQueryData('cities', cities)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const MainPage = () => {
  return (
    <Layout title="Weather forecast">
      <Row mb={3}>
        <Col width={[1, 1 / 2]}>
          <Title>Weather forecast</Title>
          <Subtitle>
            Simple but powerful weather forcasting service based on OpenWeatherMap API
          </Subtitle>
        </Col>
        <Col width={[1, 1 / 2]}>
          <Flex alignItems="flex-end" justifyContent="flex-end" height="100%">
            <GeoSearch />
          </Flex>
        </Col>
      </Row>
      <Dashboard />
    </Layout>
  )
}

export default MainPage
