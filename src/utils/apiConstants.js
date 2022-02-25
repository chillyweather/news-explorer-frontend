/* eslint-disable prettier/prettier */

const getTime = () => {
  const time = new Date();
  time.setDate(time.getDate() - 7);
  return time.toISOString().split('T')[0];
};

const getCurrentTime = () => {
  const time = new Date();
  time.setDate(time.getDate());
  return time.toISOString().split('T')[0];
};

const API_KEY = '6d3e71d61e114ecc8e1171b9b27376b1';
const NEWS_URL = 'https://newsapi.org/v2';
const PROXY_URL = 'https://nomoreparties.co/news/v2';
const FROM = getTime();
const TO = getCurrentTime();
const PAGE_SIZE = 100;

export {
  API_KEY,
  NEWS_URL,
  PROXY_URL,
  FROM,
  PAGE_SIZE,
  TO,
};
