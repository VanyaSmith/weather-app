import { IWeatherCard } from 'modules/dashboard/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'utils/api'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { q } = _req.query

  try {
    const weather = await api<IWeatherCard>(`${process.env.NEXT_PUBLIC_WEATHER_HOST}/weather`, {
      query: {
        q,
        appid: process.env.NEXT_PUBLIC_WEATHER_APIKEY || '',
        units: 'metric',
      },
    })

    res.status(200).json(weather)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
