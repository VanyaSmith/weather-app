import { useRef, useState, ChangeEvent, FormEvent, useCallback } from 'react'
import { useMutation } from 'react-query'
import { useOnClickOutside } from 'src/hooks/useClickOutside'
import { CityData } from '../interfaces'
import { getGeo } from '../query'
import { useCities, useMutateCities } from './useCities'

export const useGeoSearch = () => {
  const { cities } = useCities()
  const { addCity } = useMutateCities()
  const ref = useRef<HTMLFormElement | null>(null)
  const [inputValue, setValue] = useState('')
  const [isShowResult, setIsShowResult] = useState(false)
  const {
    data: searchResultData,
    isLoading,
    error,
    isError,
    mutate: searchCities,
  } = useMutation<CityData[], Error, string>((searchText: string) => getGeo(searchText))
  useOnClickOutside(ref, () => setIsShowResult(false))

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const handleFocusInput = () => {
    if (inputValue && searchResultData && searchResultData.length) {
      setIsShowResult(true)
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchCities(inputValue)
    setIsShowResult(true)
  }
  const handleClickItem = useCallback((city: CityData) => {
    addCity(city)
    setIsShowResult(false)
  }, [])

  return {
    cities,
    ref,
    inputValue,
    searchResultData,
    isShowResult,
    isLoading,
    error,
    isError,
    handleChangeInput,
    handleFocusInput,
    handleSubmit,
    handleClickItem,
  }
}
