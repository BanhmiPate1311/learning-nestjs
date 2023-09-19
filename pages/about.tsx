import Header from '@/components/common/header'
import { MainLayout } from '@/components/layout'
// import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// tsdrp

// const Header = dynamic(() => import('@/components/common/header'), { ssr: false }) // không render bên phía server

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const [postList, setPostList] = useState([])
  const router = useRouter()

  console.log('About query: ', router.query)
  const page = router.query?.page

  useEffect(() => {
    // Check query available
    if (!page) return
    ;(async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data = await response.json()
      setPostList(data.data)
      // useSWR
    })()
  }, [page])

  const handleNextClick = () => {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }, // không chạy lại getstaticprop nữa, chỉ chạy trên phía client
    )
  }

  //JSON.parse($0.text)

  return (
    <div>
      <h1>About Page</h1>
      <Header />
      <ul className="post-list">
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next Page</button>
    </div>
  )
}

AboutPage.Layout = MainLayout

export async function getStaticProps() {
  console.log('get static prop')

  return {
    props: {},
  }
}

// export async function getServerSideProps(context) {
// context: params: path/route params
//          req: HTTP imcomingMessage object
//          res: HTTP response object
//          query

// context.res.setHeader('Cache-Control','s-maxage=5') : gọi api tại getServerSideProps và lưu lại (cache)
// trong CDN trong vòng 0-5s, sau 5s sẽ gọi lại getServerSideProps và cache trong 5s tiếp theo đó

// context.res.setHeader('Cache-Control','s-maxage=5, stale-while-revalidate')
// trong vòng 0-5s sau khi gọi api thì sẽ trả về giá trị cache, từ giây thứ 5 trở đi đến lần gọi đầu tiên vẫn sẽ trả về giá trị trong cache đồng thời thực hiện gọi api và sẽ trả giá trị mới này trong lần tiếp theo

// context.res.setHeader('Cache-Control','s-maxage=5, stale-while-revalidate=5')
// trong khoảng time maxage + stale-while-revalidate=5 sẽ trả về giá trị trong cache, hết khoảng time này nếu có request thì sẽ gọi api lấy giá trị mới (chờ response trả về)

//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
