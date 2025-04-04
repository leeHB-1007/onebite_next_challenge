import MovieDetailClient from './MovieDetailClient';
export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  // 서버 컴포넌트에서는 params가 이미 사용 가능하므로 바로 전달
  const { id } = await params;
  return <MovieDetailClient id={id} />;
}

