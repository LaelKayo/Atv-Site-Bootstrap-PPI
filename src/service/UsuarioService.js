import ApiService from "./ApiService";


export default class UsuarioService extends ApiService{

    constructor(){
        super('/Usuario/')
    }

    autenticacao(params){
        return this.get(`login/${params.matricula}/${params.senha}`)
    }
}