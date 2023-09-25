import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostPageProps {
  post: any;
}

export default function PostDetailPage({ post }: PostPageProps) {
  const router = useRouter();
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
  if (router.isFallback) {
    // sử dụng khi set fallback:true và sử dụng với ISR
    return <div>Loading ...</div>;
  }
  if (!post) return null;
  return (
    <div>
      {/* posts/12345 :Path parameter/ route parameter
        posts/12345?abc=12 :queryParam */}
      <h1>Post Detail Page</h1>

      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('\nget statis path');
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();

  data.data.map((post: any) => ({ params: { postId: post.id } }));

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: false,
  };
  // fallback: false: nếu không có trong cache sẽ trả về not found
  //           blocking: nếu không có trong cache sẽ gọi api ở getStaticProps và show lên giao diện (có time chờ)
  //           true: giống blocking nhưng có xử lý thêm isFetching
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (context: GetStaticPropsContext) => {
  // get static path sẽ chạy trước, sau đó sẽ gọi get statis props theo số lượng params
  console.log('get statis props', context.params?.postId);
  const postId = context.params?.postId;
  if (!postId) return { notFound: true };
  // server-side
  // build-time
  // console.log('static props')
  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
  const data = await response.json();
  // console.log('data: ', data)
  return {
    props: {
      post: data,
    },
    revalidate: 5, // sau khoảng time 5s sẽ trả lại giá trị cũ đồng thời gọi api
  };
};
