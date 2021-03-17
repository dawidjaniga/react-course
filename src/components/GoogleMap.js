import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import WikipediaApi from '../services/api/wikipedia'

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646
}
const defaultZoom = 11

export default function GoogleMap () {
  useEffect(() => {
    async function fetchArticles () {
      const articles = await WikipediaApi.getArticles({ coord: gdanskPosition })
      console.log('Articles for Gdańsk: ', articles)
    }

    fetchArticles()
  }, [])
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
