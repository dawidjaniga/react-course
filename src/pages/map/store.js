import { createStore, createHook } from 'react-sweet-state'
import { defaults } from 'react-sweet-state'
import { produce } from 'immer'

defaults.devtools = true
defaults.mutator = (currentState, producer) => produce(currentState, producer)

const Store = createStore({
  initialState: {
    markers: [],
    googleApiLoaded: false
  },
  actions: {
    addMarkers: markers => ({ setState, getState }) => {
      const state = getState()
      const existingMarkers = state.markers.map(marker => marker.pageid)
      const newMarkers = markers.filter(
        marker => !existingMarkers.includes(marker.pageid)
      )

      setState(draft => {
        draft.markers.push(...newMarkers)
      })
    },
    setGoogleApiLoaded: value => ({ setState, getState }) => {
      setState(draft => {
        draft.googleApiLoaded = value
      })
    }
  }
})

export const useMapStore = createHook(Store)
