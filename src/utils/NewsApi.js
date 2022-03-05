/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import {
  API_KEY, NEWS_URL, PROXY_URL, FROM, PAGE_SIZE, TO,
} from './apiConstants';

class NewsApi {
  constructor(settings) {
    this._apiKey = settings.apiKey;
    this._newsUrl = settings.newsUrl;
    this._proxyUrl = settings.proxyUrl;
    this._fromDate = settings.fromDate;
    this._toDate = settings.toDate;
    this._pageSize = settings.pageSize;
  }

  find(keyword) {
    return fetch(
      `${this._newsUrl}`
      + '/everything?'
      + `q=${keyword}&`
      + `apiKey=${this._apiKey}&`
      + `from=${this._fromDate}&`
      + `to=${this._toDate}&`
      + `pageSize=${this._pageSize}`,
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('no news for you!'))))
      .then((data) => data.articles);
  }

  // seems like i don't need it anymore...
  // downloadInitial() {
  //   return fetch(
  //     `${this._newsUrl}`
  //     + '/top-headlines?'
  //     + 'country=us&'
  //     + `apiKey=${this._apiKey}&`
  //     + 'pageSize=18',
  //   )
  //     .then((res) => (res.ok ? res.json() : Promise.reject(new Error('no news for you!'))))
  //     .then((data) => data.articles);
  // }
}

const newsApi = new NewsApi({
  apiKey: API_KEY,
  newsUrl: NEWS_URL,
  proxyUrl: PROXY_URL,
  fromDate: FROM,
  toDate: TO,
  pageSize: PAGE_SIZE,
});

export default newsApi;
