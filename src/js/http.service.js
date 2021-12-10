import axios from 'axios';

export default class HttpService {
  constructor() {
    this.host = 'https://ahj-http-yanach.herokuapp.com/';
  }

  // eslint-disable-next-line class-methods-use-this
  async getAll() {
    return axios.get(`${this.host}?method=allTickets`).then((res) => res.data);
  }

  async getById(id) {
    return axios.get(`${this.host}?method=ticketById&id=${id}`).then((res) => res.data);
  }

  async addNew(data) {
    return axios.post(`${this.host}?method=createTicket`, data).then((res) => res.data);
  }

  async editItem(data) {
    return axios.post(`${this.host}?method=editTicket`, data).then((res) => res.data);
  }

  async deleteItem(id) {
    return axios.delete(`${this.host}?method=deleteItem&id=${id}`).then((res) => res.data);
  }
}
