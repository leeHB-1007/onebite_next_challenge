import { MovieData } from "@/types";

export default async function fetchDetail(id : number): Promise<MovieData | null> {
    const baseUrl = process.env.BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/movie/${id}`);
        if (!response.ok) {
            throw new Error();
        }
        return await response.json();
    } catch (error) {
        console.error('영화 상세 데이터를 가져오는 중 오류 발생:', error);
        return null;
    }

}
