import React from 'react'
import LivroService from '../service/LivroService'
import NavBar from '../components/NavBar'
import { mensagemErro, messagemSucesso } from '../components/Toastr'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button'

export default class ListaLivros extends React.Component {


    constructor() {
        super()
        this.livroService = new LivroService()
    }

    state = {
        livros: [],
        renderDialogFooter: false,
        livroDeletar: null
    }

    prepareCadastro = () => {
        this.props.history.push("/cadastro-livro")
    }

    prepareEditar = (livro) => {
        this.props.history.push(`/cadastro-livro/${livro.id}`)
    }



    prepareExcluir = (livro) => {
        this.setState({ renderDialogFooter: true, livroDeletar: livro })
    }

    excluir = () => {
        this.livroService.deletar(this.state.livroDeletar.id)
            .then(response => {
                const livros = this.state.livros
                const index = livros.indexOf(this.state.livroDeletar)
                livros.splice(index, 1)
                this.setState({ livros: livros })
                messagemSucesso("Livro Excluido Com Sucesso!")
            }).catch(erro => {
                mensagemErro("Erro ao Excluir Livro")
            })
    }

    confirmarCancelar = () => {
        this.setState({ renderDialogFooter: false, livroDeletar: {} })
    }

    componentDidMount() {
        this.livroService.buscarTodos().then(response => {
            this.setState({ livros: response.data })
        })
    }

    render() {

        const users = this.state.livros;

        const dialogFooter = (
            <div>
                <Button label="SIM" icon="pi pi-check" className="p-button-success" onClick={this.excluir} />
                <Button label="NAO" icon="pi pi-times" className="p-button-danger" onClick={this.confirmarCancelar} />
            </div>
        );

        return (
            <>
                <NavBar />

                <div className="container">
                    <button type="button" onClick={this.prepareCadastro} className="btn btn-primary mb-2 mt-3">Cadastrar Novo</button>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ISBN</th>
                                <th scope="col">Titulo</th>
                                <th scope="col">Área</th>
                                <th scope="col">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(livro => (
                                    <tr key={livro.id}>
                                        <td>{livro.isbn}</td>
                                        <td>{livro.nome}</td>
                                        <td>{livro.area}</td>
                                        <td>{livro.quantLivro}</td>
                                        <td>
                                            <button type="button" onClick={((e) => this.prepareEditar(livro))} className="btn btn-secondary">Editar</button>
                                            <a> </a>
                                            <button type="button" onClick={((e) => this.prepareExcluir(livro))} className="btn btn-danger">Excluir</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <Dialog
                    header="Deseja Realmente Excluir?"
                    footer={dialogFooter}
                    visible={this.state.renderDialogFooter}
                    style={{ width: '50vw' }}
                    modal
                    onHide={(e) => this.setState({ renderDialogFooter: false })}>
                    Deseja Excluir o Usuario?
                </Dialog>
            </>
        )
    }
}