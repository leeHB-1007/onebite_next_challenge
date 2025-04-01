import React, { ReactNode, useEffect, useState } from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import MovieItem from "@/components/MovieItem";

import fetchMovie from "@/lib/fetchMovie";
import { MovieData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <Head>
        <title>한입 씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마 - 검색결과 " />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화들을 만나보세요!"
        />
      </Head>
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
