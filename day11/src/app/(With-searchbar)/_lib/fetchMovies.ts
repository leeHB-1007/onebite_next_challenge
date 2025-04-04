import { MovieData } from '@/types';

// MSW 초기화 대기 함수
export const waitForMsw = async (): Promise<void> => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
    console.log("⏳ MSW 초기화 확인 중...");
    // 짧은 지연 후 요청 시작 (MSW 초기화 시간 확보)
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

// 전체 영화 목록 가져오기
export async function fetchAllMovies(): Promise<MovieData[]> {
  console.log("📞 영화 데이터 요청 시작");
  
  const response = await fetch('/api/movies');
  
  console.log("✅ 응답 상태:", response.status);
  
  if (!response.ok) {
    throw new Error('영화 데이터를 불러오는데 실패했습니다.');
  }
  
  const data = await response.json();
  console.log("📊 받은 데이터:", data.slice(0, 2)); // 처음 2개 항목만 로깅
  return data;
}

// ID로 영화 가져오기
export async function fetchMovieById(id: number): Promise<MovieData> {
  const response = await fetch(`/api/movies/${id}`);
  
  if (!response.ok) {
    throw new Error(`ID가 ${id}인 영화를 불러오는데 실패했습니다.`);
  }
  
  return await response.json();
}

// 랜덤 영화 가져오기
export async function fetchRandomMovies(): Promise<MovieData[]> {
  const response = await fetch('/api/movies/random');
  
  if (!response.ok) {
    throw new Error('랜덤 영화를 불러오는데 실패했습니다.');
  }
  
  return await response.json();
}

// 영화 검색하기
export async function searchMovies(query: string): Promise<MovieData[]> {
  if (!query.trim()) {
    return [];
  }
  
  // 서버와 클라이언트 환경 모두에서 작동하는 URL 생성
  let url: string;
  
  // 서버 환경에서는 절대 URL 필요
  if (typeof window === 'undefined') {
    // 서버 사이드: 절대 URL 사용
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    url = `${baseUrl}/api/movies/search?query=${encodeURIComponent(query)}`;
  } else {
    // 클라이언트 사이드: 상대 URL 사용
    url = `/api/movies/search?query=${encodeURIComponent(query)}`;
  }
  
  console.log('🔍 검색 요청 URL:', url);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('영화 검색에 실패했습니다.');
  }
  
  return await response.json();
}
