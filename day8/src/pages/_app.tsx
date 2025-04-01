import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";
import { ReactNode } from "react";
import { NextPage } from "next";



type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
}

// 서버 사이드에서만 실행되는 코드
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  // 서버 측 MSW 초기화 코드
  import('../mocks/http').then(({ server }) => {
    server.listen();
  }).catch(error => {
    console.error('서버 측 MSW 초기화 중 오류 발생:', error);
  });
}
  
export default function App({ Component, pageProps }: AppProps &{ Component: NextPageWithLayout }) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    // 클라이언트 사이드에서만 실행되는 코드
 

  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
