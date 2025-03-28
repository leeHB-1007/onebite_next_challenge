import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useState, useEffect } from "react";

import MovieItem from "@/components/MovieItem";
import { MovieData } from "@/types";
import fetchMovie from "@/lib/fetchMovie";
import { InferGetServerSidePropsType } from "next";
import fetchRand from "@/lib/fetchRand";

export const getServerSideProps = async () => {


    const [movies, recommendedMovies] = await Promise.all([
      fetchMovie(),
      fetchRand(),
    ]);

  return {
    props: {
      movies,
      recommendedMovies,
    },
  };
};

export default function Home( {movies, recommendedMovies} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <h3>지금 가장 추천하는 영화</h3>
      <section className={style.recommended}>
        {recommendedMovies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </section>
      <h3>등록된 모든 영화</h3>
      <section className={style.movies}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
