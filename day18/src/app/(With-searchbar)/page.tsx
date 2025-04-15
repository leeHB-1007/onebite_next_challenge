import style from "./page.module.css";
import MovieData from "@/types";
import MovieItem from "@/components/movie-Item";
import { delay } from "@/lib/delay";
import { Suspense } from "react";
import MovieListSkeleton from "./_components/skeleton/movieIistSKList";

async function RecoMovies() {
    await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    {
      next: { revalidate: 5 },
      // 5초마다 서버에서 데이터를 가져옴
    }
  );
  if (!response.ok) {
    return <div>영화 추천을 불러오지 못했습니다.</div>;
  }
  const recoMovies: MovieData[] = await response.json();
  return recoMovies.map((movie) => (
    <MovieItem key={`reco-${movie.id}`} {...movie} />
  ));
}

async function AllMovies() {
    await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    {
      cache: "force-cache",
      //   아직 영화 추가하기 기능이 없기 때문에 캐시에서 데이터를 가져옴
    }
  );
  if (!response.ok) {
    return <div>영화 목록을 불러오지 못했습니다.</div>;
  }
  const allMovies: MovieData[] = await response.json();
  return (

        allMovies.map((movie) => (
          <MovieItem key={`all-${movie.id}`} {...movie} />
        ))

  );
}

export default function Home() {
  return (
    <div className={style.container}>
        <h1 className={style.recotitle}>추천 영화</h1>
      <section className={style.reco_container}>
        <Suspense fallback={<MovieListSkeleton count={3} />}>
          <RecoMovies />
        </Suspense>
      </section>
        <h1 className={style.moviestitle}>등록된 모든 영화</h1>
      <section className={style.all_container}>
        <Suspense fallback={<MovieListSkeleton count={10} />}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
