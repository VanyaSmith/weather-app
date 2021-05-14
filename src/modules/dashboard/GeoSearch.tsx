import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { getGeo } from './query'
import { useMutation } from 'react-query'
import { GeoSearchResultItem } from './components/GeoSearchResultItem'
import { CityData } from './interfaces'
import { Loader, Text } from 'uikit'
import { useCities, useMutateCities } from './hooks/useCities'
import { useOnClickOutside } from 'src/hooks/useClickOutside'
import { Flex } from '@rebass/grid/emotion'

const StyledGeoSearch = styled.form`
  position: relative;
  display: flex;
  z-index: 1;
`
const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.colors.Gray300};
  border-radius: 8px 0 0 8px;
  height: 48px;
  width: 304px;
  padding: 12px 16px;
`
const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.Purple100};
  background-image: url('/icons/search.svg');
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  border-radius: 0 8px 8px 0;
`
const SearchResultWrapper = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.space[2]}px);
  left: 0;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgb(28 7 19 / 10%);
  overflow: hidden;
`
const SearchError = styled.div`
  padding: 20px 24px;
  width: 100%;
  text-align: center;
`

export interface GeoSearchProps {}

export const GeoSearch = React.memo(() => {
  const { cities } = useCities()
  const { addCity } = useMutateCities()
  const ref = useRef<HTMLFormElement | null>(null)
  const [value, setValue] = useState('')
  const [isShowResult, setIsShowResult] = useState(false)
  const {
    data,
    isLoading,
    error,
    isError,
    mutate: searchCities,
  } = useMutation<CityData[], Error, string>((searchText: string) => getGeo(searchText))
  useOnClickOutside(ref, () => setIsShowResult(false))

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const handleFocusInput = () => {
    if (value && data && data.length) {
      setIsShowResult(true)
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchCities(value)
    setIsShowResult(true)
  }
  const handleClickItem = useCallback((city: CityData) => {
    addCity(city)
    setIsShowResult(false)
  }, [])

  return (
    <StyledGeoSearch onSubmit={handleSubmit} ref={ref}>
      <SearchInput
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleChangeInput}
        onFocus={handleFocusInput}
      />
      <SearchButton type="submit" />
      {isShowResult && (
        <SearchResultWrapper>
          {isLoading ? (
            <Flex py="30px" justifyContent="center">
              <Loader />
            </Flex>
          ) : isError ? (
            <SearchError>
              <Text mod="Body" bold margin="0">
                {error?.message}
              </Text>
              <Text mod="Caption">Try different city name</Text>
            </SearchError>
          ) : (
            data &&
            data.map((geoCode) => {
              const isExist = Boolean(
                cities?.find((city) => JSON.stringify(geoCode) === JSON.stringify(city))
              )

              return (
                <GeoSearchResultItem
                  key={geoCode.lat + geoCode.lon}
                  {...geoCode}
                  isExist={isExist}
                  onClick={handleClickItem}
                />
              )
            })
          )}
        </SearchResultWrapper>
      )}
    </StyledGeoSearch>
  )
})
