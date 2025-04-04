"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import style from "./searchbar.module.css";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickSearch = () => {
    if (search) {
      router.push(`/search?q=${search}`);
    }
  };
  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };
  return (
    <div className={style.container}>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDownEnter}
        
      />
      <button
        onClick={onClickSearch}
        
      >
        검색
      </button>
    </div>
  );
}
