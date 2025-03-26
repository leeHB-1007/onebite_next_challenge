import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import SearchableLayout from "@/components/searchable-layout";

export default function Search() {
    const router = useRouter();
    const { q } = router.query;
  return (
    <div>검색결과 : {q} 영화 상세 페이지</div>
  )
}
Search.getLayout = (page : ReactNode) => {
    return (
        <SearchableLayout>
            {page}
        </SearchableLayout>
    )
}
