import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import Head from "next/head";
import MovieItem from "@/components/MovieItem";

import fetchMovie from "@/lib/fetchMovie";
import { InferGetStaticPropsType } from "next";
import fetchRand from "@/lib/fetchRand";

export const getStaticProps = async () => {
  const [movies, recommendedMovies] = await Promise.all([
    fetchMovie(),
    fetchRand(),
  ]);

  return {
    props: {
      movies,
      recommendedMovies,
    },
    revalidate: 5,
  };
};

export default function Home({
  movies,
  recommendedMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
    <Head>
        <title>한입 씨네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마" />
        <meta property="og:description" content="한입 씨네마에 등록된 영화들을 만나보세요!" />    
    </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
