import WikipediaApi from '../../services/api/wikipedia'
import createDebug from 'debug'
import { useMapStore } from './store'
import ArticlesDatabase from '../../services/ArticlesDatabase'
import debounce from 'lodash/debounce'

const debug = createDebug('wikipedia-map:map:mediator')

const readArticleColor = 'blue'
const defaultArticleColor = 'orange'

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

function mapReadArticles (articles) {
  return articles.map(({ title, ...rest }) => ({
    ...rest,
    title,
    color: ArticlesDatabase.isArticleRead(title)
      ? readArticleColor
      : defaultArticleColor
  }))
}

const callGetArticlesAfterLastInvocationMs = 1000

function useMapMediator () {
  const [
    ,
    {
      addMarkers,
      setMarkerColor,
      setGoogleApiLoaded,
      setModalVisible,
      setCurrentArticle
    }
  ] = useMapStore()

  const debouncedGetArticles = debounce(
    getArticlesForMapCenter,
    callGetArticlesAfterLastInvocationMs
  )

  async function getArticlesForMapCenter () {
    const response = await WikipediaApi.getArticles({
      coord: map.center.toJSON(),
      limit: 100
    })
    let articles = mapWikipediaArticlesToMarkers(response.query.geosearch)
    articles = mapReadArticles(articles)
    addMarkers(articles)

    debug('"getArticlesForMapCenter" fetched articles:', articles)
  }

  function mapLoaded (mapInstance) {
    map = mapInstance
    map.addListener('idle', debouncedGetArticles)

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
    setMarkerColor({ title, color: readArticleColor })

    ArticlesDatabase.setArticleAsRead(title)
  }

  attachListner('mapLoaded', mapLoaded)
  attachListner('searchBoxPlacesSelected', searchBoxPlacesSelected)
  attachListner('markerClicked', markerClicked)
}

export default function MapMediator () {
  useMapMediator()

  debug('MapMediator component rendered')

  return null
}
