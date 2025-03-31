import type { NextApiRequest, NextApiResponse } from 'next';
import moviesData from '@/mocks/movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET 요청만 처리
  if (req.method !== 'GET') {
    return res.status(405).json({ message: '허용되지 않는 메서드입니다.' });
  }
  
  // URL에서 영화 ID 가져오기
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: '유효한 영화 ID가 필요합니다.' });
  }
  
  // ID로 영화 찾기
  const movie = moviesData.find(movie => movie.id.toString() === id);
  
  // 영화가 없으면 404 오류 반환
  if (!movie) {
    return res.status(404).json({ message: '영화를 찾을 수 없습니다.' });
  }
  
  // 영화 상세 데이터 반환
res.status(200).json({
    ...movie,
    // 추가 정보가 필요하다면 여기에 추가
    relatedMovies: getRelatedMovies(movie.id.toString(), movie.genres)
});
}

// 관련 영화 찾기 (같은 장르의 영화 중 무작위로 4개 선택)
function getRelatedMovies(movieId: string, genres: string[]) {
  if (!genres || genres.length === 0) return [];
  
  // 같은 장르를 가진 다른 영화 필터링
  const relatedMovies = moviesData.filter(movie => 
    movie.id.toString() !== movieId && // 현재 영화 제외
    movie.genres && 
    movie.genres.some(genre => genres.includes(genre)) // 장르가 하나라도 일치
  );
  
  // 관련 영화 무작위로 섞기
  const shuffled = [...relatedMovies].sort(() => 0.5 - Math.random());
  
  // 최대 4개까지만 반환
  return shuffled.slice(0, 4);
}