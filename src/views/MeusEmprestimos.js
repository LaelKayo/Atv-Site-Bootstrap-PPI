
import React from 'react'
import { EmprestimoService } from '../service/EmprestimoService.'
import LocalStoregeService from '../service/LocalStorege'
import { Dialog } from 'primereact/dialog';
import NavBar from '../components/NavBar'


export default class MinhasConsultas extends React.Component {

    constructor() {
        super()
        this.empresimoService = new EmprestimoService()
    }


    state = {
        usuarioLogado: JSON.parse(LocalStoregeService.getItem('usuario_logado')),
        emprestimos: [],
        renderDialogFooter: false,
        livros: []

    }

    consultasDosUsuarios = () => {
        const nomeUsuario = this.state.usuarioLogado.nome
        this.empresimoService.buscarEmprestimoPorUsuario(nomeUsuario)
            .then(response => {
                this.setState({ emprestimos: response.data })
                console.log(this.state.emprestimos)
            }).catch(erro => {
                console.log(erro)
            })
    }

    detalhesEmprestimo = (emprestimo) => {
        this.setState({ livros: emprestimo.livrosLocados, renderDialogFooter: true })
        console.log("livos: ",this.state.livros)
    }

    componentDidMount() {
        this.consultasDosUsuarios()
    }

    render() {
        const emprestimo = this.state.emprestimos
        return (

            <>

                <NavBar />
                <div className="container">
                    <h3>Meus Emprestimos</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Data do emprestimo</th>
                              

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.emprestimos.map(emp => (
                                    <tr key={emp.id}>
                                        <td>{new Date(emp.dataEmprestimo).toLocaleDateString("pt-br")}</td>
                                   
                                        <td>
                                            <button type="button"
                                                onClick={(e) => this.detalhesEmprestimo(emp)}
                                                className="btn btn-success">Ver detalhes</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <Dialog
                    header="Detalhes do Empréstimo"
                    visible={this.state.renderDialogFooter}
                    style={{ width: '50vw' }}
                    modal
                    onHide={(e) => this.setState({ renderDialogFooter: false })}>




                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ISBN</th>
                                <th scope="col">Titulo</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.livros.map(livro => (
                                    <tr key={livro.id}>
                                        <td>{livro.isbn}</td>
                                        <td>{livro.nome}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>



                </Dialog>


            </>
        )




    }
}