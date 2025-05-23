import React from "react";
import MovieData from "@/types";
import style from "./page.module.css";
import { ReviewEditor } from "./components/ReviewEditor";
import ReviewList from "./components/ReviewList";
import Image from "next/image";
import { Metadata } from "next";


export async function generateMetadata({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) : Promise<Metadata> {
      const { id } = await params;
    return {
      title: `한입 시네마 : ${id}`,
      description: `한입 시네마에 등록된 ${id}}를 만나보세요`,
      openGraph: {
          title: `한입 시네마 : ${id}`,
          description: `한입 시네마에 등록된 ${id}}을 만나보세요`,
        images: ["/thumbnail.png"],
      },
    };
  }

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  const movies: MovieData[] = await response.json();

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

async function MovieDetailClient({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    throw new Error("네트워크 응답이 올바르지 않습니다.");
  }
  const movie: MovieData = await response.json();

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${movie.posterImgUrl}')` }}
      >
        <Image src={movie.posterImgUrl} alt={movie.title} width={244} height={350} />
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{movie.title}</h2>
          <div>
            {movie.releaseDate} / {movie.genres.join(", ")} / {movie.runtime}분
          </div>
          <div>{movie.company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{movie.subTitle}</div>
          <div className={style.description}>{movie.description}</div>
        </div>
      </div>
    </div>
  );
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <MovieDetailClient movieId={id}  />
      <ReviewEditor movieId={id} />
      <ReviewList movieId={id} />
    </div>
  );
}
