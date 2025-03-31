import React, { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import MovieItem from "@/components/MovieItem";

import fetchMovie from "@/lib/fetchMovie";
import { MovieData } from "@/types";
import { useRouter } from "next/router";



export default function Search() {
  const [movies, setMovie] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearch = async () => {
    const movies = await fetchMovie(q);
    setMovie(movies);
  };
  useEffect(() => {
    fetchSearch();
  }, [q]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>`{q}` 검색 결과</h2>

      {!movies ? (
        <div className={style.loading}>검색 중...</div>
      ) : movies.length > 0 ? (
        <div className={style.results}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <div className={style.noResults}>
          <p>검색 결과가 없습니다.</p>
          <p>다른 검색어로 시도해보세요.</p>
        </div>
      )}
    </div>
  );
}

Search.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
