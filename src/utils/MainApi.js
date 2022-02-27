/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
class MainApi {
  constructor({ baseUrl, authToken }) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
  }

  register(email, password, username) {
    return (
      fetch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
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
            return data;
          } throw new Error('Login failed');
        })
    );
  }

  getUserInfo() {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  // getCards() { }
  //  saveCard(){}
  // deleteCard()
}

const mainApi = new MainApi({
  baseUrl: 'https://api.infostash.students.nomoreparties.sbs',
  authToken: `Bearer ${localStorage.getItem('token')}`,
});

export default mainApi;
