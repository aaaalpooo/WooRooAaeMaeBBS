import axios from 'axios';

type WritePayload = { username: string; title: string; content: string };

export const write = (payload: WritePayload, token: string) =>
  axios.post('/api/v1/bbs/', payload, {
    headers: {
      Authorization: token,
    },
  });
