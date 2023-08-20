export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  __checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject("Error");
    }

  }

  getProfileInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(res => this.__checkResponse(res));
  }

  setProfileInformation({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      }),
    }).then(this.__checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this.__checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.__checkResponse);
  }

  patchAvatarInfo({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this.__checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.__checkResponse);
  }

  getLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.__checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.__checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this.__checkResponse);
  }

}

export const api = new Api({
  baseUrl: "https://backend.tzarbasil.nomoredomainsicu.ru",
  headers: {
    authorization: "7ee89985-112e-4652-b81d-a30402b6b6f7",
    "Content-Type": "application/json",
  },
});