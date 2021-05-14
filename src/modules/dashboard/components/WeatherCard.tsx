import React from 'react'
import styled from '@emotion/styled'
import { getWeatherCard } from '../query'
import { useQuery, useQueryClient } from 'react-query'
import { Loader, Text } from 'uikit'
import { Flex } from '@rebass/grid/emotion'
import Image from 'next/image'
import { capitalizeFirstLetter } from 'utils/capitalize'
import { CityData } from '../interfaces'
import { useMutateCities } from '../hooks/useCities'

const StyledWeatherCard = styled.div<{ isFetching?: boolean }>`
  width: 100%;
  min-height: 241px;
  position: relative;
  border-radius: 24px;
  background-color: #fff;
  padding: 24px 32px;
  opacity: ${({ isFetching }) => (isFetching ? '0.5' : '1')};
  transition: opacity 0.35s ease-in-out;
`
const RemoveButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  background-image: url('/icons/delete.svg');
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  position: absolute;
  top: 24px;
  right: 24px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray100};
  }
  &:active {
    transform: scale(0.95);
  }
`
const City = styled(Text)`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`
const Temp = styled(Text)`
  margin-right: ${({ theme }) => theme.space[3]}px;

  &:not(:last-child) {
    margin-bottom: 0;
  }
`
const WeatherCardFooter = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.colors.Gray200};
`
const WeatherCardInfo = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.space[5]}px;
  }

  ${Text} {
    white-space: nowrap;
    margin-left: ${({ theme }) => theme.space[1]}px;
  }
`

export interface WeatherCardProps extends CityData {
  // onRemove: (city: CityData) => void
}

export const WeatherCard = React.memo(({ ...city }: WeatherCardProps) => {
  const { data, isFetching } = useQuery(['weatherCard', city], () => getWeatherCard(city), {
    refetchInterval: 15000,
  })

  const { removeCity } = useMutateCities()
  const queryClient = useQueryClient()

  const handleClick = () => {
    queryClient.removeQueries(['weatherCard', city])
    removeCity(city)
  }

  return (
    <StyledWeatherCard isFetching={!data || isFetching}>
      {!data ? (
        <Loader width="48px" center />
      ) : (
        <>
          <City mod="Caps" color="Purple100">
            {data.name}
          </City>
          <Flex flexDirection="column" mb={5}>
            <Flex alignItems="center" mb={1}>
              <Temp mod="Display">{data.main.temp}°C</Temp>
              <Image
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                width="48"
                height="48"
                layout="fixed"
              />
            </Flex>
            <Text mod="Caption" color="Gray400">
              {capitalizeFirstLetter(data.weather[0].description)}
            </Text>
          </Flex>
          <WeatherCardFooter pt={4} mx={-5} px={5}>
            <WeatherCardInfo>
              <Image width="24" height="24" src="/icons/wind.svg" layout="fixed" />
              <Text mod="Body">{data.wind.speed} m/s</Text>
            </WeatherCardInfo>
            <WeatherCardInfo>
              <Image width="24" height="24" src="/icons/humidity.svg" layout="fixed" />
              <Text mod="Body">{data.main.humidity}%</Text>
            </WeatherCardInfo>
            <WeatherCardInfo>
              <Image width="24" height="24" src="/icons/pressure.svg" layout="fixed" />
              <Text mod="Body">{data.main.pressure} hPa</Text>
            </WeatherCardInfo>
          </WeatherCardFooter>
          <RemoveButton type="button" onClick={handleClick} />
        </>
      )}
    </StyledWeatherCard>
  )
})
