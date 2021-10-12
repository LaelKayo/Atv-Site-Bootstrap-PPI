

export default class LocalStoregeService{

    static addItem(chave, valor){
        localStorage.setItem(chave, valor);
    }

    static getItem(chave){
        return localStorage.getItem(chave);
    }

    static removeItem(chave){
        return localStorage.removeItem(chave);
    }
    
}