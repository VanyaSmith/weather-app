import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { setCookie } from 'utils/cookie'
import { CityData } from '../interfaces'

export const useCities = () => {
  const { data } = useQuery<CityData[]>('cities')

  return {
    cities: data,
  }
}
export const useMutateCities = () => {
  const queryClient = useQueryClient()

  const addCity = useCallback((city: CityData) => {
    queryClient.setQueryData<CityData[]>('cities', (oldCities) => {
      const newCities = [...(oldCities || []), city]
      setCookie('cities', newCities)
      return newCities
    })
  }, [])

  const removeCity = useCallback((city: CityData) => {
    queryClient.setQueryData<CityData[]>('cities', (oldCities) => {
      const newCities = (oldCities || []).filter(
        (item) => JSON.stringify(item) != JSON.stringify(city)
      )
      setCookie('cities', newCities)
      return newCities
    })
  }, [])

  return {
    addCity,
    removeCity,
  }
}
