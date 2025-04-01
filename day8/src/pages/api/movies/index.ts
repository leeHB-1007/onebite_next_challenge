import { NextApiRequest, NextApiResponse } from 'next';
import moviesData from '@/mocks/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET 요청만 처리
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '허용되지 않는 메서드입니다.' });
  }
  
  // 모든 영화 데이터 반환
  res.status(200).json(moviesData);
}