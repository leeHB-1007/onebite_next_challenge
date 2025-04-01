import { MovieData } from "@/types";


export default async function fetchMovie( id? : string) : Promise<MovieData[]> {
    const baseUrl = process.env.BASE_URL;

    if(id){
        try {
            const response = await fetch(`https://onebite-cinema-api-main-5.vercel.app/movie/search?q=${id}`);
            if (!response.ok) {
                throw new Error();
            }
            return await response.json();
        } catch (error) {
            console.error('영화 데이터를 가져오는 중 오류 발생:', error);
            return [];
        }
    }

    try {
        const response = await fetch(`${baseUrl}/movie`);
        if (!response.ok) {
            throw new Error();
        }
        return await response.json();
    } catch (error) {
        console.error('영화 데이터를 가져오는 중 오류 발생:', error);
        return [];
    }
  
}
