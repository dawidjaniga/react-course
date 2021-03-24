import WikipediaApi from '../../services/api/wikipedia'
import createDebug from 'debug'
import { useMapStore } from './store'

const debug = createDebug('wikipedia-map:map:mediator')

const listeners = {}
let map

export function emit (event, ...args) {
  const listener = listeners[event]

  if (listener) {
    debug(
      'found listener for event "%s". Executing with arguments',
      event,
      ...args
    )
    listener(...args)
  } else {
    debug('no listener found for event "%s" with args', event, ...args)
  }
}

function attachListner (eventName, listener) {
  listeners[eventName] = listener
  debug(
    'attached listener for event "%s". Listeners object: ',
    eventName,
    listeners
  )
}

function mapWikipediaArticlesToMarkers (articles) {
  return articles.map(({ lat, lon, pageid, title }) => ({
    lat,
    lng: lon,
    pageid,
    title
  }))
}

function useMapMediator () {
  const [
    ,
    { addMarkers, setGoogleApiLoaded, setModalVisible, setCurrentArticle }
  ] = useMapStore()

  async function mapDragged (center) {
    const response = await WikipediaApi.getArticles({
      coord: center,
      limit: 100
    })
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch)
    addMarkers(articles)

    debug('"mapDragged" listener fetched articles:', articles)
  }

  function mapLoaded (mapInstance) {
    map = mapInstance
    setGoogleApiLoaded(true)
  }

  function searchBoxPlacesSelected (position) {
    if (map) {
      map.setCenter(position)
    }
  }

  async function markerClicked (title) {
    const { query } = await WikipediaApi.getArticle({ title })
    const articles = Object.values(query.pages)
    const article = articles[0]

    setCurrentArticle({ url: article.fullurl, title })
    setModalVisible(true)
  }

  attachListner('mapLoaded', mapLoaded)
  attachListner('mapDragged', mapDragged)
  attachListner('searchBoxPlacesSelected', searchBoxPlacesSelected)
  attachListner('markerClicked', markerClicked)
}

export default function MapMediator () {
  useMapMediator()

  debug('MapMediator component rendered')

  return null
}
