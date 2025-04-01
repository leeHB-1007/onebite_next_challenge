
import { MovieData } from "@/types";
import Link from "next/link";

import React from "react";

export default function MovieItem({
  id,

  posterImgUrl,
}: MovieData) {
  return <Link href={`/movie/${id}`}><img src={posterImgUrl} alt='포스터이미지' /></Link>;
}
