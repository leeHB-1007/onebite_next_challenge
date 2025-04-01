import React from "react";
import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchDetail from "@/lib/fetchDetail";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchDetail(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Movie({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입 씨네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 씨네마" />
          <meta
            property="og:description"
            content="한입 씨네마에 등록된 영화들을 만나보세요!"
          />
        </Head>

        <div className={style.loading}>Loading...</div>
      </>
    );
  }

  if (!movie) {
    return <div>영화 정보를 가져오는 중에 문제가 발생했습니다..</div>;
  }
  return (
    <div className="movie-detail">
      <Head>
        <title>{movie.title}</title>
        <meta property="og:image" content={movie.posterImgUrl} />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.description} />
      </Head>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url(${movie.posterImgUrl})` }}
      >
        <img src={movie.posterImgUrl} alt={`${movie.title} 포스터`} />
      </div>
      <div className={style.info}>
        <h1 className={style.title}>{movie.title}</h1>
        <div className={style.meta}>
          <p>{movie.releaseDate}</p>/<p>{movie.genres.join(", ")}</p>/
          <p>{movie.runtime}분</p>
        </div>
        <p>{movie.company}</p>
        <p className={style.subTitle}>{movie.subTitle}</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}
