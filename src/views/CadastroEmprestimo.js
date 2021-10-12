import React from 'react'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import UsuarioService from '../service/UsuarioService'
import LivroService from '../service/LivroService'
import { mensagemErro, messagemSucesso } from '../components/Toastr'
import LocalStoregeService from '../service/LocalStorege'
import { EmprestimoService } from '../service/EmprestimoService.'


export default class CadastroEmprestimo extends React.Component {

    constructor(props) {
        super(props)
        this.usuarioService = new UsuarioService()
        this.livroService = new LivroService()
        this.consultaService = new EmprestimoService()

    }

    state = {
        nomeUsuario: '',
        usuario: '',
        isbn: '',
        livro: '',
        livrosEmprestimos: [],
        bibliotecario: JSON.parse(LocalStoregeService.getItem('usuario_logado'))
    }

    consultar = () => {
        this.usuarioService.buscaUsuarioPeloNome(this.state.nomeUsuario).then(response => {
            this.setState({ usuario: response.data })
            console.log("Usuario: ", response.data)
        })
            .catch(erro => {
                mensagemErro("Erro ao encontrar usuario")
            })
    }


    buscarLivroISBN = () => {
        this.livroService.buscarLivroPorISBN(this.state.isbn)
            .then(response => {
                //const { data } = response.data;
                this.setState({ livro: response.data })
                console.log(response.data)
            })
            .catch(erro => {
                mensagemErro("Erro ao encontrar o livro")
            })
    }

    adicionarLivros = (livro) => {
        const itemLivro = livro
        this.state.livrosEmprestimos.push(itemLivro)
        console.log("Livro: ", this.state.livrosEmprestimos)
        this.resetValues()
    }


    resetValues() {
        this.setState({ isbn: '', livro: '' })
    }

    excluir = (livro) => {
        const livrosEmprestimo = this.state.livrosEmprestimos
        const index = livrosEmprestimo.indexOf(livro)
        livrosEmprestimo.splice(index, 1)
        this.setState(livrosEmprestimo)
    }

    salvar = () =>{
        const emprestimo = {
            livrosLocados: this.state.livrosEmprestimos,
            usuario : this.state.usuario
              
            
        }
        this.consultaService.save(emprestimo)
        .then(response =>{
            messagemSucesso("Empréstimo Salvo com Sucesso")
            this.resetValues()
        })
        .catch(erro =>{
            console.log("Erro: ",erro)
        })
    }


    render() {
        const livro = this.state.livro
        const livrosEmprestimos = this.state.livrosEmprestimos

        console.log(livrosEmprestimos)
        return (
            <>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/*<button type="button" onClick={this.verTodos} className="btn btn-primary mb-2 mt-3">Ver todos</button>*/}
                            <Card titulo="Cadastro de Emprestimos">
                                <Card titulo="Pesquisa Usuario">
                                    <div className="row">
                                        <div className="col-12">{/*form-group col-md-4*/}
                                            <fieldset>
                                                <FormGroup htmlFor="nomeUsuarioInput" label="Nome">
                                                    <input type="text" value={this.state.nomeUsuario} onChange={(e) => this.setState({ nomeUsuario: e.target.value })} id="nomeUsuarioInput" className="form-control" placeholder="Digite o nome do usuario" />
                                                </FormGroup>
                                            </fieldset>
                                            <button type="button" onClick={(e) => this.consultar()} className="btn btn-primary ">pesquisar</button>


                                        </div>
                                       
                                    </div>
                                </Card>

                                <div className="alert alert-dismissible alert-primary mb-2 mt-3">
                                    <strong><h3>Consulta</h3></strong>
                                </div>

                                <div className="alert alert-dismissible alert-light mb-2 mt-3">
                                    <h4>Usuario: <strong>{this.state.nomeUsuario}</strong></h4>
                                </div>


                                <div className="col-6">
                                    <Card titulo="Pesquisa Livro">
                                        <div className="row">
                                            <div className="col-12">{/*form-group col-md-4*/}
                                                <fieldset>
                                                    <FormGroup htmlFor="isbnInput" label="ISBN">
                                                        <input type="text" value={this.state.isbn} onChange={(e) => this.setState({ isbn: e.target.value })} id="isbnInput" className="form-control" placeholder="Digite o isbn" />
                                                    </FormGroup>
                                                </fieldset>
                                                <button type="button" onClick={(e) => this.buscarLivroISBN()} className="btn btn-primary ">pesquisar</button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className="col-6">

                                    <div className="alert alert-dismissible alert-success">
                                        <strong><h3>Lista de Livros</h3></strong>
                                    </div>

                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                livrosEmprestimos.map(livroL => (
                                                    <tr key={livroL.id}>
                                                        <td>{livroL.id}</td>
                                                        <td>{livroL.nome}</td>
                                                        <td>
                                                            <button type="button" onClick={(e) => this.excluir(livroL)} className="btn btn-danger">excluir</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">ISBN</th>
                                            <th scope="col">Área</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">Ação</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr key={livro.id}>
                                            <td>{livro.nome}</td>
                                            <td>{livro.isbn}</td>
                                            <td>{livro.area}</td>
                                            <td>{livro.quantLivro}</td>
                                            <td>
                                                {
                                                    this.state.livro.id != null ? <button type="button" onClick={(e) => this.adicionarLivros(livro)} className="btn btn-success">adicionar</button>
                                                        : null
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                        <button onClick={this.salvar} type="button" className="btn btn-primary ">Salvar</button>
                                        </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}