/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { delay } from "@/lib/delay";
import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: "모든 필드를 입력해주세요.",
    };
  }

  try {
    delay(1000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
      }
    );
    if(!response.ok) {
        throw new Error(response.statusText); 
    }
    revalidateTag(`review-${movieId}`);
    return{
        status: true,
        error: "",
    }
  } catch (err) {
    console.error(err);
    return {
        status: false,
        error: "리뷰 등록에 실패했습니다.",
    };
  }
}
