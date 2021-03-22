import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { emit } from '../pages/map/mediator'

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646
}
const defaultZoom = 11

export default function GoogleMap () {
  useEffect(() => {
    emit('mapLoaded', gdanskPosition)
  }, [])

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={gdanskPosition}
        defaultZoom={defaultZoom}
        onChange={event => emit('mapDragged', event.center)}
      ></GoogleMapReact>
    </div>
  )
}
