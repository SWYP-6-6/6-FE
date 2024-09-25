const BASE_URL = 'http://13.209.88.22:8080/';

export interface FetchFeedParamsType {
  userId: number;
  page: number;
  size: number;
}

interface FetchFeedDetailParamsType {
  id: string;
}
export async function getFetchFeedList({
  userId,
  page,
  size,
}: FetchFeedParamsType) {
  const res = await fetch(
    `${BASE_URL}api/v1/feed/recommend/feedList?userId=${userId}&page=${page}&size=${size}&sort=string`,
  );
  const data = await res.json();
  console.log(data);
  return data.content;
}
export async function getFetchFeedDetail({ id }: FetchFeedDetailParamsType) {
  const res = await fetch(`${BASE_URL}api/v1/feed/${id}`);
  const data = await res.json();
  return data;
}
