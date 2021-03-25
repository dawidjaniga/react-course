import React from 'react'
import GoogleMapReact from 'google-map-react'
import { emit } from '../pages/map/mediator'
import Marker from './Marker'
import { useMapStore } from '../pages/map/store'

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646
}
const defaultZoom = 14

export default function GoogleMap () {
  const [{ markers }] = useMapStore()

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY,
          libraries: ['places']
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => emit('mapLoaded', map)}
        defaultCenter={gdanskPosition}
        defaultZoom={defaultZoom}
      >
        {markers.map(marker => (
          <Marker
            lat={marker.lat}
            lng={marker.lng}
            title={marker.title}
            key={marker.pageid}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
