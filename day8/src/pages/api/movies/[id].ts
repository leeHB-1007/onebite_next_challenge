import { NextApiRequest, NextApiResponse } from 'next';
import moviesData from '@/mocks/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET 요청만 처리
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '허용되지 않는 메서드입니다.' });
  }
  
  // URL에서 영화 ID 가져오기
  const { id } = req.query;
  
  // ID로 영화 찾기
  const movie = moviesData.find(movie => movie.id.toString() === id);
  
  // 영화가 없으면 404 오류 반환
  if (!movie) {
    return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
  }
  
  // 영화 데이터 반환
  res.status(200).json(movie);
}