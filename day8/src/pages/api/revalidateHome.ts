// import { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler({req, res}: { req: NextApiRequest, res: NextApiResponse}) {
//     try {
//         await res.revalidate('/'); // revalidate the home page
//         return res.json({ revalidated: true, message: '홈페이지가 성공적으로 재검증되었습니다.' });

//     } catch (error) {
//         console.error('Error revalidating:', error);
//         return res.status(500).send('페이지 갱신 오류 발생');
//     }
// }
