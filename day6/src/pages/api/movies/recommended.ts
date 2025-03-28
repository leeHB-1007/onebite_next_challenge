import { NextApiRequest, NextApiResponse } from 'next';
import moviesData from '@/mocks/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET 요청만 처리
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '허용되지 않는 메서드입니다.' });
  }
  
  // 원본 배열을 복사해서 랜덤하게 섞기
  const shuffled = [...moviesData].sort(() => 0.5 - Math.random());
  
  // 처음 5개만 추천 영화로 선택
  const recommended = shuffled.slice(0, 3);
  
  // 추천 영화 데이터 반환
  res.status(200).json(recommended);
}