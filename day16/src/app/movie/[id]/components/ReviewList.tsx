import { ReviewData } from "@/types";
import React from "react";
import ReviewItem from "./ReviewItem";

export default async function ReviewList( { movieId }: { movieId: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`, { cache: "no-store"})

    if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
    }
    const reviews : ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}
