// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

// type Data = {
//   name: string
// }

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise((resolve) => {
    // convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`;
    }

    // dont send cookies to API server
    req.headers.cookie = '';

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    // proxy.once('proxyRes', () => {
    //   //   resolve(true) // đóng lại do theo đúng cú pháp của một API handler trong Next.js, bạn nên không trả về giá trị nào mà thay vào đó bạn nên sử dụng res để trả về kết quả cho client.
    // })
  });
}
