import React, { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";
import { MovieData } from "@/types";
import style from "./index.module.css";
import MovieItem from "@/components/MovieItem";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    // 검색어가 변경될 때마다 API 호출
    const fetchSearchResults = async () => {
      setLoading(true);
      
      if (!q) {
        setSearchResults([]);
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`/api/movies/search?q=${encodeURIComponent(q as string)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [q]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>`{q}` 검색 결과</h2>
      
      {loading ? (
        <div className={style.loading}>검색 중...</div>
      ) : searchResults.length > 0 ? (
        <div className={style.results}>
          {searchResults.map((movie) => (
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
