import ApiService from "./ApiService";

export default class LivroService extends ApiService{

    constructor(){
        super('/livro')
    }

    salvar(livro){
        return this.post('/', livro)
    }

    atualizar(livro){
        return this.put('/', livro)
    }

    buscarPorId(id){
        return this.get(`/id/${id}`)
    }

    buscarTodos(){
        return this.get('/all')
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    buscarLivroPorISBN(isbn){
        console.log("Isbn: ",isbn)
        return this.get(`/isbn/${isbn}`)
    }
}