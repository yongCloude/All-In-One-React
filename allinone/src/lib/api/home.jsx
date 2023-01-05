import client from './client';


export const fetchPopularPost = () => {
  return client.get(
    `/v2/main/postlist`,
  );
};

export const fetchPopularCafe = () => {
  return client.get(
    `/v2/main/cafelist`,
  );
};