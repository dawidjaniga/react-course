const articlesKey = 'articles'

function ArticlesDatabase () {
  let articles = getArticles()

  function getArticles () {
    try {
      const articles = localStorage.getItem(articlesKey)

      if (articles) {
        return JSON.parse(articles)
      } else {
        return []
      }
    } catch (e) {
      console.error('Error while reading articles from localStorage', e)
    }
  }

  function addArticle (title) {
    try {
      articles.push(title)
      localStorage.setItem(articlesKey, JSON.stringify(articles))
    } catch (e) {
      console.error('Error while adding article to localStorage', e)
    }
  }

  const api = {
    refresh () {
      articles = getArticles()
    },
    isArticleRead (title) {
      return articles.includes(title)
    },
    setArticleAsRead (title) {
      addArticle(title)
    }
  }
  return api
}

export default ArticlesDatabase()
