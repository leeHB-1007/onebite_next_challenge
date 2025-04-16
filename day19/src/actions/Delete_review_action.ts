/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";


export default async function Delete_review_action(  _: any, formData: FormData) {
    
    const reviewId = formData.get("reviewId")?.toString();
    const movieId = formData.get("movieId")?.toString();

    if(!reviewId || !movieId) {
        return {
            status: false,
            error: "삭제하려는 리뷰가 이미 존재하지 않습니다..",
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`, {
            method: "DELETE",
        })
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        revalidateTag(`review-${movieId}`);
    } catch (err) {
        console.error(err);
        return {
            status: false,
            error: "리뷰 삭제에 실패했습니다.",
        };
    }
}
