import ApiService from "./ApiService";



export class DevolucaoService extends ApiService{
    constructor(){
        super('/devolucao')
    }


    salvarDevolucaoPorEmprestimo(emprestimo){
        console.log(emprestimo)
        return this.post('/dev/',emprestimo)
    }

    buscarEmprestimoPorUsuario(nome){
        return this.get(`/${nome}`)
    }
}