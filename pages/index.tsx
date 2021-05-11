import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import cookies from 'next-cookies'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import Layout from 'components/Layout'
import { Dashboard, getWeatherCard } from 'modules/dashboard'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { cities } = cookies(context)
  const queryClient = new QueryClient()

  console.log({ cities })

  if (cities) {
    await Promise.all(
      cities
        .split(',')
        .map((city) => queryClient.prefetchQuery(['weatherCard', city], () => getWeatherCard(city)))
    )
  }

  return {
    props: {
      cities: cities ? cities.split(',') : null,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const MainPage = ({ cities }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title="Weather forecast">
      <Dashboard cities={cities} />
    </Layout>
  )
}

export default MainPage
