import React from 'react'
import GoogleMapReact from 'google-map-react'

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646
}
const defaultZoom = 11

export default function GoogleMap () {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={gdanskPosition}
        defaultZoom={defaultZoom}
      ></GoogleMapReact>
    </div>
  )
}
