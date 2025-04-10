import MovieItem from "@/components/movie-Item";
import React from "react";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/lib/delay";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await delay(1500) 
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  // 영화 검색 실행
  if (!response.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  const movies: MovieData[] = await response.json();

  return (
    <div>
      <div className={style.container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}
