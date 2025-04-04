'use client'

import { useEffect, useState } from 'react'

export default function MswInitializer() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const setupMsw = async () => {
      try {
        // 환경 변수로 MSW 활성화 여부 제어
        if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
          const { initMocks } = await import('@/mocks')
          await initMocks()
          console.log('✅ MSW 초기화 완료')
          setIsInitialized(true)
        }
      } catch (error) {
        console.error('❌ MSW 초기화 실패:', error)
      }
    }
  
    setupMsw()
  }, [])

  return null
}