import { WeatherCardData, CityData, GeoCodeData } from './interfaces'
import { api } from 'src/utils/api'

export const getWeatherCard = async (city: CityData) => {
  try {
    return api<WeatherCardData>('/weather', {
      query: {
        q: `${city.name},${city.state || ''},${city.country}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export const getGeo = async (cityName: string) => {
  try {
    const data = await api<GeoCodeData[]>('/direct', {
      query: {
        q: cityName,
      },
    })
    if (data.length === 0) {
      throw new Error(`City called “${cityName}” was not found`)
    }
    return data.map(({ local_names, ...item }): CityData => item)
  } catch (error) {
    throw error
  }
}
