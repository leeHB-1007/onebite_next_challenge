import style from "./_components/MoviesList.module.css";
import { MovieData } from "@/types";
import MovieItem from "@/components/movie-Item";

async function RecoMovies() {
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
  return (
    <section>
      지금 가장 추천하는 영화
      <div className={style.reco_container}>
        {recoMovies.map((movie) => (
          <MovieItem key={`reco-${movie.id}`} {...movie} />
        ))}
      </div>
    </section>
  );
}

async function AllMovies() {
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
    <section>
      등록된 모든 영화
      <div className={style.all_container}>
        {allMovies.map((movie) => (
          <MovieItem key={`all-${movie.id}`} {...movie} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <div>
        <span className="blur"></span>
        <span className="blur"></span>
      </div>
      <RecoMovies />
      <AllMovies />
    </div>
  );
}
