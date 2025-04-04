export async function initMocks() {
  if (typeof window === 'undefined') {
    return
  }

  try {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
      const { worker } = await import('./browser')
      
      // 개선된 디버깅 옵션
      await worker.start({
        onUnhandledRequest: 'warn', // 처리되지 않은 요청에 대한 경고 표시
        waitUntilReady: true, // 초기화가 완료될 때까지 대기
      })
      
      console.log('✅ MSW 초기화 완료')
      return true
    }
  } catch (error) {
    console.error('MSW 초기화 중 오류 발생:', error)
    return false
  }
}