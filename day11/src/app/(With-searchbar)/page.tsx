import MoviesList from '@/app/(With-searchbar)/_components/MoviesList'
import MovieReco from '@/app/(With-searchbar)/_components/MovieReco'
import style from './_components/MoviesList.module.css'




export default function Home() {
  return (
    <div className={style.container}>
        <section>
            지금 가장 추천하는 영화
            <MovieReco/>
        </section>
        <section>
            등록된 모든 영화
        <MoviesList />
        </section>
    </div>

    
  );
}
