import { IWeatherCard, IGeoCode } from './interfaces'
import { api } from 'src/utils/api'

export const getWeatherCard = async (city: string) => {
  try {
    return api<IWeatherCard>('/weather', {
      query: {
        q: city,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getGeo = async (city: string) => {
  try {
    return api<IGeoCode[]>('/direct', {
      query: {
        q: city,
      },
    })
  } catch (error) {
    throw error
  }
}
