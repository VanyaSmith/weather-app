import React, { useState } from 'react'
import styled from '@emotion/styled'
import { getGeo } from '../query'
import { useMutation } from 'react-query'

const StyledGeoSearch = styled.div``

export interface IGeoSearchProps {
  onAddCity: (city: string) => void
}

export const GeoSearch = React.memo(({ onAddCity }: IGeoSearchProps) => {
  const [value, setValue] = useState('')
  const {
    data,
    error,
    isLoading,
    isError,
    mutate: searchCities,
  } = useMutation((searchText: string) => getGeo(searchText))

  return (
    <StyledGeoSearch>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="button" onClick={() => searchCities(value)}>
        Search
      </button>
      <div>
        {isLoading ? (
          'Loading...'
        ) : isError ? (
          <span>Error: {(error as Error).message}</span>
        ) : (
          data &&
          data.map((geoCode) => (
            <div key={geoCode.lat + geoCode.lon}>
              <button type="button" onClick={() => onAddCity(geoCode.name)}>
                Добавить {geoCode.name}
              </button>
            </div>
          ))
        )}
      </div>
    </StyledGeoSearch>
  )
})
