import { useRouter } from 'next/router'
import * as React from 'react'

export interface PostDetailPagePropsProps {}

export default function PostDetailPage(props: PostDetailPagePropsProps) {
  const router = useRouter()
  /**
   * pathname
   * query
   * basePath
   * locale
   * isFallback
   */
  /**
   * router.push()
   *    router.push({
   *      pathname:'/posts/[postId]',
   *      query:{
   *        postId:123,
   *        ref:'social;
   *      },
   * })
   * router.replace()
   * router.prefetch()
   * router.back()
   * router.reload()
   */
  return (
    <div>
      {/* posts/12345 :Path parameter/ route parameter
        posts/12345?abc=12 :queryParam */}
      <h1>Post Detail Page</h1>

      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  )
}
