import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
// tsdrp

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const router = useRouter()

  console.log('About query: ', router.query)

  useEffect(() => {
    // Check query available
  }, [])

  //JSON.parse($0.text)

  return <div>About Page</div>
}

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}
