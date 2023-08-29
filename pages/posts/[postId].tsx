import { useRouter } from 'next/router'
import * as React from 'react'

export interface PostDetailPagePropsProps {}

export default function PostDetailPage(props: PostDetailPagePropsProps) {
  const router = useRouter()
  return (
    <div>
      {/* posts/12345 :Path parameter/ route parameter
        posts/12345?abc=12 :queryParam */}
      <h1>Post Detail Page</h1>

      <p>Query: {JSON.stringify(router.query)}</p>
    </div>
  )
}
