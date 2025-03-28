import React from "react";
import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchDetail from "@/lib/fetchDetail";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const id = context.params!.id
    const movie = await fetchDetail(Number(id))

    return {
        props: {
            movie,
        },
    }
}



export default function Movie({movie} : InferGetServerSidePropsType<typeof getServerSideProps>) {

    if(!movie) { return <div>영화 정보를 가져오는 중에 문제가 발생했습니다..</div> }
  return (
    <div className="movie-detail">
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${movie.posterImgUrl})` }}
      >
        <img src={movie.posterImgUrl} alt={`${movie.title} 포스터`} />
      </div>
      <div className={style.info}>
        <h1 className={style.title}>{movie.title}</h1>
        <div className={style.meta}>
          <p>{movie.releaseDate}</p>/
          <p>{movie.genres.join(", ")}</p>/
          <p>{movie.runtime}분</p>
        </div>
        <p>{movie.company}</p>
        <p className={style.subTitle}>{movie.subTitle}</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}
