import React from 'react'
import styled from '@emotion/styled'
import { GeoSearchResultItem } from './components/GeoSearchResultItem'
import { Loader, Text } from 'uikit'
import { Flex } from '@rebass/grid/emotion'
import { useGeoSearch } from './hooks/useGeoSearch'

const StyledGeoSearch = styled.form`
  position: relative;
  display: flex;
  z-index: 1;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.small} {
    width: 95%;
  }
  ${({ theme }) => theme.mediaQueries.medium} {
    width: 74.5%;
  }
`
const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.colors.Gray300};
  border-radius: 8px 0 0 8px;
  flex-grow: 1;
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
  const {
    cities,
    ref,
    inputValue,
    isShowResult,
    searchResultData,
    isLoading,
    error,
    isError,
    handleChangeInput,
    handleFocusInput,
    handleSubmit,
    handleClickItem,
  } = useGeoSearch()

  return (
    <StyledGeoSearch onSubmit={handleSubmit} ref={ref}>
      <SearchInput
        type="text"
        placeholder="Search"
        value={inputValue}
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
            searchResultData &&
            searchResultData.map((searchResultItem) => {
              const isExist = Boolean(
                cities?.find((city) => JSON.stringify(city) === JSON.stringify(searchResultItem))
              )

              return (
                <GeoSearchResultItem
                  key={String(searchResultItem.lat) + String(searchResultItem.lon)}
                  {...searchResultItem}
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
