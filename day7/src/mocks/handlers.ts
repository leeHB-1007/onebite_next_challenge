import { http, HttpResponse } from 'msw';
import movies from './movies.json';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/api/moviesd`, () => {
    return HttpResponse.json(movies);
  }),

  http.get(`${baseUrl}/api/movies/recommendes`, () => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, 2);
    
    return HttpResponse.json(recommended);
  }),

//   http.get(`${baseUrl}/api/movies/:id`, ({ params }) => {
//     const { id } = params;
//     const movie = movies.find(movie => movie.id.toString() === id);
    
//     if (!movie) {
//       return new HttpResponse(
//         JSON.stringify({ message: '영화를 찾을 수 없습니다.' }),
//         { status: 404 }
//       );
//     }
    
//     return HttpResponse.json(movie);
//   }),
];