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
        console.log("URL: ",requestUrl)
        console.log("Parametros: ",params)
        return httpClient.get(requestUrl, params)
    }

    post(url, objeto){
        const requestUrl = `${this.apiURL}${url}`
        return httpClient.post(requestUrl, objeto)
    }

    put(url, objeto){
        const requestUrl = `${this.apiURL}${url}`
        return httpClient.put(requestUrl, objeto)
    }

    delete(url){
        const requestUrl = `${this.apiURL}${url}`
        return httpClient.delete(requestUrl)
    }

}