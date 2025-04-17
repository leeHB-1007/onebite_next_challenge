import MovieItem from "@/components/movie-Item";
import MovieData from "@/types";
import style from "./page.module.css";
import { delay } from "@/lib/delay";
import { Suspense } from "react";
import MovieListSkeleton from "@/app/(With-searchbar)/_components/skeleton/movieIistSKList";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) : Promise<Metadata> {
    const { q } = await searchParams;
  return {
    title: `한입 시네마 : 검색어 ${q}`,
    description: `한입 시네마에 등록된 ${q}}들을 만나보세요`,
    openGraph: {
        title: `한입 시네마 : 검색어 ${q}`,
        description: `한입 시네마에 등록된 ${q}}들을 만나보세요`,
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
  await delay(1000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className={style.container}>
      <Suspense key={q || ""} fallback={<MovieListSkeleton count={10} />}>
        <SearchResult q={q || ""} />
      </Suspense>
    </div>
  );
}
