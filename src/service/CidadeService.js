import axios from 'axios'


const httpClient = axios.create({
    baseURL : 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
})


const municipios = '/municipios'
export default class CidadeService{
    
    buscaCidadesPorUf(uf){
        return httpClient.get(`${uf}${municipios}`)
    }
}