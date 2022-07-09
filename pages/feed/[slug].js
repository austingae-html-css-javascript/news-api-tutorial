import React from 'react'


import Image from 'next/image'
import Link from 'next/link'

const Feed = ({ pageNumber, articles}) => {

  return (
    <div>
      {articles.map((article) => {
        return (
          <div key={article.title}>
            <img src={article.urlToImage} style={{width: '200px'}}/>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target='_blank' rel="noreferrer">
              <button>
                Read More
              </button>
            </a>
          </div>
        );
      })}
      <p>Page Number: {pageNumber}</p>
      <button>
        <Link href={`/feed/${pageNumber-1}`}>
          <a>Previous Page</a>
        </Link>
      </button>
      <button>
        <Link href={`/feed/${pageNumber+1}`}>
          <a>Next Page</a>
        </Link>
      </button>


    </div>
  )
}

export default Feed

export async function getServerSideProps(pageContext) {
  const pageNumber = pageContext.query.slug;

  const apiResponse = await fetch (`https://newsapi.org/v2/everything?q=trump&sortBy=popularity&page=${pageNumber}&pageSize=5&apiKey=c8bca453280c47ca9d79d26ceaf74003`);
  const apiJSON = await apiResponse.json();

  const articles = apiJSON.articles;
  console.log(articles);

  return {
    props: {
      pageNumber: Number.parseInt(pageNumber),
      articles: articles
    }
  }
}





/*
Once slug has a NUMBER. 
Then getServerSideProps will run. 
Then the Page Component will run.
*/

/*
Authentication for API Keys -- Three Methods to Do This: https://newsapi.org/docs/authentication
      Right now, I am currently using the first method listed. 

Endpoints:
      Everything parameters: https://newsapi.org/docs/endpoints/everything
      Top-headlines parameters: https://newsapi.org/docs/endpoints/top-headlines

Error Message List: https://newsapi.org/docs/errors

NewsAPI in Next.js Tutorial (starting from 35:00): https://www.youtube.com/watch?v=xtItzwYG6oQ&t=2286s&ab_channel=PortEXE

*/

/*
1) Recreate the news website on my own.
2) Learn JSON, including await fetch and .json()
3) learn the difference between the various data rendering functions
4) now, recreate the news website one more time for international relations news
*/