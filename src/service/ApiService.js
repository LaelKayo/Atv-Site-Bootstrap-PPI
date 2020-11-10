import axios from 'axios'


const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})


export default class ApiService{

    constructor(apiURL){
        this.apiURL = apiURL
    }

    get(url, params){
        const requestUrl = `${this.apiURL}${url}`
        return httpClient.get(requestUrl, params)
    }
}