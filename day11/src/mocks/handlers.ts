import { http, HttpResponse, delay } from "msw";
import movieData from "./dummy.json";
import { MovieData } from "@/types";

// baseUrl 변수 제거하고 절대 경로 패턴만 사용
export const handlers = [
  // 검색 API (구체적인 경로)
  http.get("/api/movies/search", async ({ request }) => {
    console.log("🔍 검색 API 핸들러 호출됨", request.url);
    await delay(400);

    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.toLowerCase() || "";

    if (!query) {
      return HttpResponse.json([]);
    }

    const filteredMovies = movieData.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(query))
    );

    console.log(`🔍 검색 결과: ${filteredMovies.length}개 항목 찾음`);
    return HttpResponse.json(filteredMovies as MovieData[]);
  }),

  // 랜덤 영화 API (구체적인 경로)
  http.get("/api/movies/random", async () => {
    console.log("🎲 랜덤 영화 API 핸들러 호출됨");
    await delay(300);

    // 영화 데이터를 얕은 복사하고 섞기
    const shuffled = [...movieData].sort(() => 0.5 - Math.random());
    
    // 처음 3개 선택
    const randomMovies = shuffled.slice(0, 3);
    
    console.log(`🎲 랜덤으로 선택된 영화: ${randomMovies.map(m => m.title).join(', ')}`);
    return HttpResponse.json(randomMovies as MovieData[]);
  }),

  // ID로 영화 조회 API (패턴 매칭)
  http.get("/api/movies/:id", async ({ params }) => {
    console.log(`🎬 ID로 영화 조회: ${params.id}`);
    await delay(300);

    const { id } = params;
    const movie = movieData.find((movie) => movie.id === Number(id));

    if (!movie) {
      console.log(`❌ ID ${id}에 해당하는 영화를 찾을 수 없음`);
      return new HttpResponse(null, { status: 404 });
    }

    console.log(`✅ 영화 찾음: ${movie.title}`);
    return HttpResponse.json(movie as MovieData);
  }),

  // 전체 영화 목록 API (가장 일반적인 경로)
  http.get("/api/movies", async () => {
    console.log("📋 전체 영화 목록 API 핸들러 호출됨");
    await delay(500);

    console.log(`📋 총 ${movieData.length}개 영화 반환`);
    return HttpResponse.json(movieData as MovieData[]);
  }),
];
