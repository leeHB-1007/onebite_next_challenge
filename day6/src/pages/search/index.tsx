import React, { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import MovieItem from "@/components/MovieItem";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovie from "@/lib/fetchMovie";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const q = context.query.q as string || "";
    const movies = await fetchMovie(q);

    return {
        props: {
            movies,
            searchQuery: q,
        },
    };
}

export default function Search({ 
    movies, 
    searchQuery 
}: { 
    movies: InferGetServerSidePropsType<typeof getServerSideProps>["movies"],
    searchQuery: string 
}) {
  return (
    <div className={style.container}>
      <h2 className={style.title}>`{searchQuery}` 검색 결과</h2>
      
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
