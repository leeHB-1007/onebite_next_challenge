import { MovieData } from "@/types";

export default async function fetchReco() : Promise<MovieData[]> {
  const baseUrl = process.env.BASE_URL;

  try{
    const response = await fetch(`${baseUrl}/movie/random`);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error){
    console.error('영화 랜덤 데이터를 가져오는 중 오류 발생:', error);
    return [];
  }
}
