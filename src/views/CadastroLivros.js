import React from 'react'
import Navbar from '../components/NavBar'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import LivroService from '../service/LivroService'
import { mensagemErro, messagemSucesso } from '../components/Toastr'

//import '../js/estados'


export default class CadastroUsuarios extends React.Component {

    constructor() {
        super()
        this.LivroService = new LivroService()
    }

    state = {
        id: null,
        nome: '',
        isbn: '',
        area: '',
        quantLivro: ''
    }

    resetForm = () => {
        this.setState({
            id: null,
            nome: '',
            isbn: '',
            area: '',
            quantLivro: ''
        })
    }

    ordenarLista = (a, b) => {
        return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)
    }


  componentDidMount() {

        const params = this.props.match.params
        if (params.id) {
            this.LivroService.buscarPorId(params.id).then(response => {
                this.setState({ ...response.data })
                const user = response.data
                const { nome,isbn,id,quantLivro } = user
                //const { endereco: { uf, cidade, longradouro, bairro, numero } } = user
                //const { login: { matricula, senha } } = user
                this.setState({ nome: nome, isbn: isbn, id : id, quantLivro: quantLivro})
                console.log(response.data)
            }).catch(erro => {
                mensagemErro("Erro ao tentar recuperar usuario")
            })
        }
    }

    save = () => {
        const livro = {
            id: this.state.id,
            nome: this.state.nome,
            isbn: this.state.isbn,
            quantLivro : this.state.quantLivro,
            area: this.state.area

        }


        if (this.state.id == null) {
            //salvar
            this.LivroService.salvar(livro)
                .then(Response => { messagemSucesso("Livro Cadastrado com sucesso") })
                .catch(erro => { mensagemErro("Erro ao realizar o cadastro") })
        } else {
            //atualizar
            this.LivroService.atualizar(livro)
                .then(Response => { messagemSucesso("Livro Atualiado com sucesso") })
                .catch(erro => { mensagemErro("Erro ao realizar a atualizacao") })
        }



        this.resetForm()
    }

    verTodos = () => {
        this.props.history.push("/lista-livro");
    }

    render() {


        return (
            <>
                <Navbar />
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <button type="button" onClick={this.verTodos} className="btn btn-primary mb-2 mt-3">Ver todos</button>
                            <Card titulo="Cadastro de Livros">
                                <div className="row">
                                    <div className="col-12">{/*form-group col-md-4*/}
                                        <fieldset>

                                            <FormGroup htmlFor="isbnInput" label="ISBN">
                                                <input type="text" value={this.state.isbn} onChange={(e) => this.setState({ isbn: e.target.value })} id="isbnInput" className="form-control" placeholder="Digite o ISBN do livro" />
                                            </FormGroup>

                                            <FormGroup htmlFor="nomeInput" label="Nome">
                                                <input type="text" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} id="nomeInput" className="form-control" placeholder="Digite o título do livro" />
                                            </FormGroup>

                                            <FormGroup htmlFor="quantInput" label="Quantidade">
                                                <input type="text" value={this.state.quantLivro} onChange={(e) => this.setState({ quantLivro: e.target.value })} id="quantInput" className="form-control" placeholder="Digite a quantidade de livros" />
                                            </FormGroup>

                                            <FormGroup htmlFor="periodoInput" label="Área">
                                                <select className="form-control" value={this.setState.area} onChange={(e) => this.setState({ area: e.target.value })} id="areaInput">
                                                    <option> </option>
                                                    <option value="1">EXATAS</option>
                                                    <option value="2">HUMANAS</option>

                                                </select>
                                            </FormGroup>



                                        </fieldset>

                                        <button type="button" onClick={this.save} className="btn btn-primary ">Salvar</button>
                                        <button type="reset" onClick={this.resetForm} className="btn btn-danger">Cancelar</button>

                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <script type="text/javascript">
                    $("#tellInput").mask("(00) 0000-0000");
                </script>
            </>
        )
    }
}