import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';
// tsdrp

export interface PostListPageProps {
  posts: any[];
}

export default function PostListPage({ posts }: PostListPageProps) {
  // console.log('post: ', posts)
  return (
    <div>
      <h1>Post List Page</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
  // server-side
  // build-time
  // console.log('static props')
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
  const data = await response.json();
  // console.log('data: ', data)
  return {
    props: {
      posts: data.data.map((x: any) => ({ id: x.id, title: x.title })), // cắt bớt dữ liệu, chỉ lấy id và title
    },
  };
};
