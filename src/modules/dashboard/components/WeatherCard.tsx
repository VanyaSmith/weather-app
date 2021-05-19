import React from 'react'
import styled from '@emotion/styled'
import { getWeatherCard } from '../query'
import { useQuery, useQueryClient } from 'react-query'
import { Loader, Text } from 'uikit'
import { Flex, Box } from '@rebass/grid/emotion'
import Image from 'next/image'
import { capitalizeFirstLetter } from 'utils/capitalize'
import { CityData } from '../interfaces'
import { useMutateCities } from '../hooks/useCities'

const StyledWeatherCard = styled(Box)<{ isFetching?: boolean }>`
  width: 100%;
  min-height: 217px;
  position: relative;
  border-radius: 24px;
  background-color: #fff;
  opacity: ${({ isFetching }) => (isFetching ? '0.5' : '1')};
  transition: opacity 0.35s ease-in-out;

  ${({ theme }) => theme.mediaQueries.medium} {
    min-height: 241px;
  }
`
const RemoveButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  background-image: url('/icons/delete.svg');
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  position: absolute;
  top: ${({ theme }) => theme.space[3]}px;
  right: ${({ theme }) => theme.space[3]}px;

  ${({ theme }) => theme.mediaQueries.medium} {
    width: 48px;
    height: 48px;
    top: ${({ theme }) => theme.space[4]}px;
    right: ${({ theme }) => theme.space[4]}px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray100};
  }
  &:active {
    transform: scale(0.95);
  }
`
const City = styled(Text)`
  &:not(:last-child) {
    margin-bottom: 10px;

    ${({ theme }) => theme.mediaQueries.small} {
      margin-bottom: 20px;
    }
  }
`
const Temp = styled(Text)`
  &:not(:last-child) {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.space[2]}px;

    ${({ theme }) => theme.mediaQueries.small} {
      margin-right: ${({ theme }) => theme.space[3]}px;
    }
  }
`
const WeatherCardFooter = styled(Flex)`
  border-top: 1px solid ${({ theme }) => theme.colors.Gray200};
`
const WeatherCardInfo = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.space[4]}px;
    margin-bottom: 4px;

    ${({ theme }) => theme.mediaQueries.small} {
      margin-bottom: 0px;
    }
    ${({ theme }) => theme.mediaQueries.medium} {
      margin-right: ${({ theme }) => theme.space[5]}px;
    }
  }

  ${Text} {
    white-space: nowrap;
    margin-left: ${({ theme }) => theme.space[1]}px;
  }
`

export interface WeatherCardProps extends CityData {}

export const WeatherCard = React.memo(({ ...city }: WeatherCardProps) => {
  const { data, isFetching } = useQuery(['weatherCard', city], () => getWeatherCard(city), {
    refetchInterval: 60000,
  })

  const { removeCity } = useMutateCities()
  const queryClient = useQueryClient()

  const handleClick = () => {
    queryClient.removeQueries(['weatherCard', city])
    removeCity(city)
  }

  return (
    <StyledWeatherCard isFetching={!data || isFetching} px={[4, 4, 4, 5]} py={[3, 3, 3, 4]}>
      {!data ? (
        <Loader width="48px" center />
      ) : (
        <>
          <City mod="Caps" colorText="Purple100">
            {data.name}
          </City>
          <Flex flexDirection="column" mb={[3, 3, 3, 5]}>
            <Flex alignItems="center" mb={1}>
              <Temp mod="Display">{Math.round(data.main.temp)}°C</Temp>
              <Image
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                width="48"
                height="48"
                layout="fixed"
              />
            </Flex>
            <Text mod="Caption" colorText="Gray400">
              {capitalizeFirstLetter(data.weather[0].description)}
            </Text>
          </Flex>
          <WeatherCardFooter
            pt={[3, 3, 3, 4]}
            mx={[-4, -4, -4, -5]}
            px={[4, 4, 4, 5]}
            flexDirection={['column', 'column', 'column', 'row']}
          >
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
