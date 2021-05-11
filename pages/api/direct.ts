import { IWeatherCard } from 'modules/dashboard/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from 'utils/api'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const { q } = _req.query

  try {
    const weather = await api<IWeatherCard>(`${process.env.NEXT_PUBLIC_GEO_HOST}/direct`, {
      query: {
        q,
        appid: process.env.NEXT_PUBLIC_WEATHER_APIKEY || '',
      },
    })

    res.status(200).json(weather)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
