import React, { useMemo } from 'react'

import { Post } from './Post'

export const Posts = ({
  data = [],
  showYears,
  query,
  prefix,
  hideDate,
  yearOnly,
  ...props
}) => {
  const postsByYear = useMemo(() => {
    const collection = {}

    data.forEach((post) => {
    //  const year = post.date?.split(', ')[1]
      const formattedDate = new Date(post.date) //.toLocaleDateString();
      const year  = formattedDate.getFullYear();

      collection[year] = [...(collection[year] || []), post]
    })

    return collection
  }, [data])
  const years = useMemo(() => Object.keys(postsByYear).reverse(), [postsByYear])

  if (showYears) {
    return years.map((year) => (
      <section key={year} className="segment">
        <h2 className="year">{year}</h2>
        <div className="posts">
          {postsByYear[year].map((node) => (
            <Post key={node.id} node={node} query={query} prefix={prefix} />
          ))}
        </div>
      </section>
    ))
  } else {
    return (
      <div className={props.newspaper ? 'posts newspaper' : 'posts'}>
        {data.map((node) => (
          <Post
            key={node.id}
            node={node}
            query={query}
            prefix={prefix}
            hideDate={hideDate}
            yearOnly={yearOnly}
            {...props}
          />
        ))}
      </div>
    )
  }
}
