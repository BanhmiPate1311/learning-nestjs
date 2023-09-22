import { Post } from '@/models';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const BLOG_FOLDER = path.join(process.cwd(), 'blog'); // cwd: current working directory

export async function getPostList(): Promise<Post[]> {
  // read all markdown files
  const fileNameList = fs.readdirSync(BLOG_FOLDER); // đọc trong folder có bao nhiêu file sẽ trả ra danh sách filename

  const postList: Post[] = [];

  for (const fileName of fileNameList) {
    const filePath = path.join(BLOG_FOLDER, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { data, excerpt, content } = matter(fileContents, { excerpt_separator: '<!-- truncate-->' });

    postList.push({
      id: fileName,
      slug: data.slug,
      title: data.title,
      author: {
        name: data.author,
        title: data.author_title,
        profileUrl: data.author_url,
        avatarUrl: data.author_image_url,
      },
      tagList: data.tags,
      publishedDate: data.date,
      description: excerpt || '',
      mdContent: content,
    });
  }
  return postList;
}
