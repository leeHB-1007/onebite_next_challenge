"use client";

import Delete_review_action from "@/actions/Delete_review_action";
import React, { useActionState, useEffect, useRef } from "react";

export default function ReiviewDelete({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, fromAction, isPending] = useActionState(
    Delete_review_action,
    null
  );

  useEffect(() => {
    if(state && !state.status) {
        alert(state.error);
      }
  }, [state]);
  
  return (
    <form ref={formRef} action={fromAction}>
      <input name="reviewId" value={reviewId} hidden readOnly/>
      <input name="movieId" value={movieId} hidden readOnly/>
      {isPending ? (
        <div>삭제중입니다</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>
          🗑️ 리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
