import client from './client';
import qs from 'qs';

export const post = ({ title, content, token }) => {
  client.post(
    'v2/boards',
    { title, content },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};

export const editPost = ({ id, title, content, token }) => {
  client.put(
    `/v2/boards/${id}`,
    {
      title,
      content,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );
};

export const removePost = ({ id, token }) =>
  client.delete(`/v2/boards/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const postComment = ({ board_id, comment, token }) =>
  client.post(
    `/v2/boards/${board_id}/comments`,
    {
      comment,
    },
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  );

export const removeComment = ({ board_id, comment_id, token }) =>
  client.delete(`/v2/boards/${board_id}/comments/${comment_id}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

export const fetchPost = ({ id, accessToken }) => {
  return client.get(
    `/v2/boards/${id}`,
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  );
};

export const fetchPosts = ({ all, title, writer }) => {
  console.log(writer);
  return client.get(`/v2/boards`,
    {
      params: {
        all: all,
        title: title,
        writer: writer,
      },
    });
};

export const like = ({ accessToken, board_id }) =>
  client.post(
    `/v2/boards/${board_id}/likes`,
    {},
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  );

export const unlike = ({ accessToken, board_id }) =>
  client.delete(
    `/v2/boards/${board_id}/unlikes`,
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  );

