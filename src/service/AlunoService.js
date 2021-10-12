import ApiService from "./ApiService";

export default class AlunoService extends ApiService{

    constructor(){
        super('/aluno')
    }

    salvar(aluno){
        return this.post('/', aluno)
    }

    atualizar(Aluno){
        return this.put('/update', Aluno)
    }
}