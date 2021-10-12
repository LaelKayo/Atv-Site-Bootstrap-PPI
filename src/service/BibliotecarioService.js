import ApiService from "./ApiService";

export default class BibliotecarioService extends ApiService{

    constructor(){
        super('/bibliotecario')
    }

    salvar(bibliotecario){
        return this.post('/', bibliotecario)
    }

    atualizar(bibliotecario){
        return this.put('/', bibliotecario)
    }
}