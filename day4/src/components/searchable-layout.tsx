import React, { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";
import { useRouter } from "next/router";

export default function SerachableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const q = router.query.q as string;
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onClickButton = () => {
    if(!search) return;
    router.push(`/search?q=${search}`);
  };
  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        onClickButton();
        }
  }

  useEffect(() => {
    setSearch(q || "");
  }, [q]);
  return (
    <div>
      <div className={style.searchBar}>
        <input
          className={style.input}
          placeholder="검색어를 입력하세요.."
          onChange={onChangeInput}
          onKeyDown={onPressEnter}
          value={search}
        />
        <button className={style.searchBtn} onClick={onClickButton}>
          검색
        </button>
      </div>
      {children}
    </div>
  );
}
