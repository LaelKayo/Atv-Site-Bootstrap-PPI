import ApiService from "./ApiService";



export class EmprestimoService extends ApiService{
    constructor(){
        super('/emprestimo')
    }


    save(emprestimo){
        console.log(emprestimo)
        return this.post('/',emprestimo)
    }

    buscarEmprestimoPorUsuario(nome){
        console.log(nome)
        return this.get(`/${nome}`)
    }


    buscarEmprestimoPendentes(nome){
        console.log(nome)
        return this.get(`/pendentes/${nome}`)
    }
}