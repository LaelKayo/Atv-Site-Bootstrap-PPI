import ApiService from "./ApiService";

export default class ProfessorService extends ApiService{

    constructor(){
        super('/professor')
    }

    salvar(professor){
        return this.post('/', professor)
    }

    atualizar(professor){
        return this.put('/update',professor)
    }
}