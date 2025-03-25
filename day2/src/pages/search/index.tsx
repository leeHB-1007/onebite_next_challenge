import React from 'react'
import { useRouter } from 'next/router'

export default function Search() {
    const router = useRouter();
    const { q } = router.query;
  return (
    <div>검색결과 : {q}</div>
  )
}
