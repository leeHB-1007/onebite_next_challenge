import React from 'react'
import { useRouter } from 'next/router'

export default function Movie() {
    const router = useRouter();
    const { id } = router.query;
  return (
    <div>Movie : {id} : 상세 페이지</div>
  )
}
