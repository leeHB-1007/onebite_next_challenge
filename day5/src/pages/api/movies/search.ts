import type { NextApiRequest, NextApiResponse } from 'next';
import moviesData from '@/mocks/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  
  // 검색어가 없으면 빈 배열 반환
  if (!q || typeof q !== 'string') {
    return res.status(200).json([]);
  }
  
  // 대소문자 구분 없이 검색
  const searchQuery = q.toLowerCase();
  const results = moviesData.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery) || 
    (movie.description && movie.description.toLowerCase().includes(searchQuery))
  );
  
  res.status(200).json(results);
}