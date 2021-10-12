import ApiService from "./ApiService";


export default class UsuarioService extends ApiService{

    constructor(){
        super('/Usuario')
    }

    autenticacao(params){
        return this.get(`/login/${params.matricula}/${params.senha}`)
    }

    buscarTodos(){
        return this.get('/all')
    }

    buscarPorId(id){
        return this.get(`/busca/${id}`)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    buscaUsuarioPeloNome(nome){
        return this.get(`/nome/${nome}`)
    }
}