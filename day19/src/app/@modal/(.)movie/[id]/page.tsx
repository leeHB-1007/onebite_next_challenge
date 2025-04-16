/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import MovieDetailPage from "@/app/movie/[id]/page";
import Modal  from "@/components/Modal";

export default function page(props: any) {
  return (
    <Modal>
      <MovieDetailPage {...props} />
    </Modal>
  );
}
