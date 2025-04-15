"use client";
import { createReviewAction } from "@/actions/Create_review_action";
import style from "./ReviewEditor.module.css";
import { useActionState, useEffect } from "react";

export function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );
 
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <section>
      <form action={formAction} className={style.form_container}>
        <input type="hidden" name="movieId" value={movieId} readOnly />
        <textarea
          name="content"
          placeholder="리뷰를 작성해주세요."
          className={style.textarea}
          disabled={isPending}
          required
        />
        <div className={style.submit_container}>
          <input
            type="text"
            name="author"
            placeholder="작성자"
            className={style.input}
            disabled={isPending}
            required
          />
          <button
            type="submit"
            className={style.submit_btn}
            disabled={isPending}
          >
            {isPending ? "등록중 입니다." : "리뷰등록"}
          </button>
        </div>
      </form>
    </section>
  );
}
