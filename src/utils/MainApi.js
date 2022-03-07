/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
class MainApi {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  _checkResponse(prom) {
    const response = prom
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => data);
    return response;
  }

  register(email, password, name) {
    return (
      fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          }
          throw new Error('Registration failed');
        })
    );
  }

  login(email, password) {
    return (
      fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            // return data;
            return this.checkToken(data.token);
          } throw new Error('Login failed');
        })
    );
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        // Authorization: this._authToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo(token) {
    const userInfo = fetch(`${this._baseUrl}/users/me`, {
      headers: {
        // Authorization: this._authToken,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return this._checkResponse(userInfo);
  }

  getArticles() {
    const article = fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this._authToken,
      },
    });

    return this._checkResponse(article);
  }

  saveArticle(article) {
    const card = fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this._authToken,
      },
      body: JSON.stringify(article),
    });

    return this._checkResponse(card);
  }

  deleteArticle(article) {
    const deletedArticle = fetch(`${this._baseUrl}/articles/${article._id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this._authToken,
      },
      method: 'DELETE',
    });

    return this._checkResponse(deletedArticle);
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  // baseUrl: 'https://api.infostash.students.nomoreparties.sbs',
  authToken: `Bearer ${localStorage.getItem('token')}`,
});

export default mainApi;
