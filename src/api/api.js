import axios from 'axios';

const api = '8ee238e89ee04d40ad65a510137369e7'

export const fetchSources = async () => {
  try {
    const { data: { sources } } = await axios.get(`https://newsapi.org/v2/sources?apiKey=${api}`);
    return sources.map((source) => source);
  } catch (error) {
    return error;
  }
};

export const fetchNews = async (request) => {
  try {
    const { data: { articles } } = await axios.get(`https://newsapi.org/v2/${request.category}?${request.query}&pageSize=${request.results}&apiKey=${api}`);

    return articles.map((article) => (article));
  } catch (error) {
    return error;
  }
};