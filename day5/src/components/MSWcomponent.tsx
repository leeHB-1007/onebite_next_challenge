import { useEffect, useState } from "react";

export const MSWComponent = () => {
  const [isMswStarted, setIsMswStarted] = useState(false);

  useEffect(() => {
    // 브라우저(클라이언트) 환경에서만 실행
    if (typeof window !== 'undefined') {
      const startMsw = async () => {
        if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
          try {
            // 동적 import로 워커 가져오기
            const { default: worker } = await import("@/mocks/browser");
            
            // 워커 시작
            await worker.start({
              onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 통과
            });
            
            console.log('[MSW] 모킹 서버가 성공적으로 시작되었습니다.');
            setIsMswStarted(true);
          } catch (error) {
            console.error('[MSW] 모킹 서버 시작 중 오류 발생:', error);
          }
        }
      };

      startMsw();
    }
  }, []);

  return null; // UI를 렌더링하지 않음
};