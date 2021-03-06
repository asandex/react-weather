import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment, Header, Icon } from 'semantic-ui-react'

import { WeatherDataList } from '@/components/WeatherDataList'
import { initialize } from './slice'


export function GeolocationWeather() {
  const dispatch = useDispatch()
  const permission = useSelector(state => state.geo.permission)
  const position = useSelector(state => state.geo.position)
  const weather = useSelector(state => state.geo.weather)
  const units = useSelector(state => state.app.units)

  useEffect(() => {
    dispatch(initialize())
  }, [permission])

  if (permission === 'denied' || !position || !weather) {
    return null
  }

  return (
    <Segment>
      <Icon size='large' style={{ float: 'right' }} name='map marker alternate' />
      <Header style={{ marginTop: '0' }}>{weather.name}</Header>
      <WeatherDataList data={weather.main} units={units} />
    </Segment>
  )
}
