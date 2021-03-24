import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Layout as AntLayout, Input } from 'antd'
import { useMapStore } from '../pages/map/store'
import { emit } from '../pages/map/mediator'
const { Header: AntHeader } = AntLayout

const Logo = styled.h2`
  color: #ffffff;
`

const StyledHeader = styled(AntHeader)`
  display: flex;
  flex-direction: row;
`

const SearchBox = styled(Input).attrs({
  type: 'text',
  placeholder: 'Type address to search...'
})`
  margin: 10px 20px;
`

export default function Header () {
  const [{ googleApiLoaded }] = useMapStore()

  useEffect(() => {
    if (googleApiLoaded) {
      const input = document.getElementById('searchbox')
      const searchBox = new window.google.maps.places.SearchBox(input)

      searchBox.addListener('places_changed', () => {
        const selectedPlace = searchBox.getPlaces()[0]
        const { location } = selectedPlace.geometry

        emit('searchBoxPlacesSelected', location.toJSON())
      })
    }
  }, [googleApiLoaded])

  return (
    <StyledHeader>
      <Logo>Wikipedia Map</Logo>
      <SearchBox id='searchbox' />
    </StyledHeader>
  )
}
