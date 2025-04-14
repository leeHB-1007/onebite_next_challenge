import { createReviewAction } from "@/actions/Create_review_action";
import style from "./ReviewEditor.module.css";

export async function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form action={createReviewAction} className={style.form_container}>
        <input type="hidden" name="movieId" value={movieId} readOnly />
        <textarea
          name="content"
          placeholder="리뷰를 작성해주세요."
          className={style.textarea}
        />
        <div className={style.submit_container}>
          <input
            type="text"
            name="author"
            placeholder="작성자"
            className={style.input}
          />
          <button type="submit" className={style.submit_btn}>
            리뷰등록{" "}
          </button>
        </div>
      </form>
    </section>
  );
}
