import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";

export default function Home() {
  return (
    <>
        <h1>ONEBITE - CINEMA 메인 페이지</h1>
    </>
  );
}

Home.getLayout = (page : ReactNode) => {
    return (
        <SearchableLayout>
            {page}
        </SearchableLayout>
    )
}
