import { Seo } from '@/components/common';
import { Post } from '@/models';
import { getPostList } from '@/utils/posts';
import { Box, Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Script from 'next/script';
import React from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import { unified } from 'unified';

export interface BlogPageProps {
  post: Post;
}

export default function PostDetailPage({ post }: BlogPageProps) {
  if (!post) return null;

  return (
    <Box>
      <Seo
        data={{
          title: post.title,
          description: post.description,
          url: `${process.env.HOST_API}/blog/${post.slug}`,
          thumbnailUrl:
            post.thumbnailUrl ||
            'https://e7.pngegg.com/pngimages/515/775/png-clipart-lovely-cat-waving-cats-paw-cat-thumbnail.png',
        }}
      />
      <Container>
        {/* posts/12345 :Path parameter/ route parameter
        posts/12345?abc=12 :queryParam */}

        <p>{post.title}</p>
        <p>{post.author?.name}</p>
        <p>{post.description}</p>

        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>

      <Script src="/prism.js" strategy="afterInteractive"></Script>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList();

  return {
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
  // fallback: false: nếu không có trong cache sẽ trả về not found
  //           blocking: nếu không có trong cache sẽ gọi api ở getStaticProps và show lên giao diện (có time chờ)
  //           true: giống blocking nhưng có xử lý thêm isFetching
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (context: GetStaticPropsContext) => {
  // get static path sẽ chạy trước, sau đó sẽ gọi get statis props theo số lượng params
  const postList = await getPostList();
  const slug = context.params?.slug;
  if (!slug) return { notFound: true };

  const post = postList.find((x) => x.slug === slug);
  if (!post) return { notFound: true };

  // convert markdown to html
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: 'agenda.*' }) // thay đổi tên Table of contents
    .use(require('remark-prism'))
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeDocument, { title: 'Blog details page' }) // wrap: bọc đoạn heading lại bằng link
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent || '');
  post.htmlContent = file.toString();

  return {
    props: {
      post,
    },
  };
};
