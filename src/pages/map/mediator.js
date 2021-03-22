import WikipediaApi from '../../services/api/wikipedia'
const listeners = {}

export function emit (event, ...args) {
  const listener = listeners[event]

  if (listener) {
    listener(...args)
  } else {
    console.log(
      'MapMediator:emit no listener found for event %s with args',
      event,
      ...args
    )
  }
}

function attachListner (eventName, listener) {
  listeners[eventName] = listener
}

function useMapMediator () {
  async function mapDragged (center) {
    const articles = await WikipediaApi.getArticles({ coord: center })

    console.log('MapMediator:mapDragged fetched articles:', articles)
  }

  async function mapLoaded (center) {
    const articles = await WikipediaApi.getArticles({ coord: center })

    console.log('MapMediator:mapLoaded fetched articles:', articles)
  }

  attachListner('mapLoaded', mapLoaded)
  attachListner('mapDragged', mapDragged)
}

export default function MapMediator () {
  useMapMediator()

  return null
}
