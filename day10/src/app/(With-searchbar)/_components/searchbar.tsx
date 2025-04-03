"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
    <div>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDownEnter}
        style={{
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={onClickSearch}
        style={{
          border: "1px solid #ccc",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        검색
      </button>
    </div>
  );
}
