import MovieData from "@/types";
import Link from "next/link";
import style from "./movie-Item.module.css";
import Image from "next/image";

export default function MovieItem(props: MovieData) {
  return (
    <Link className={style.container} href={`/movie/${props.id}`}>
      <Image src={props.posterImgUrl} alt="표지 이미지" width={250} height={360}  />
    </Link>
  );
}