import React from 'react'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import { EmprestimoService } from '../service/EmprestimoService.'
import { DevolucaoService } from '../service/DevolucaoService'
import { mensagemErro, messagemSucesso } from '../components/Toastr'




export default class Devolucao extends React.Component {

    constructor() {
        super()
        this.emprestimoService = new EmprestimoService()
        this.devolucaoService = new DevolucaoService()
    }


    state = {
        nomeUsuario: '',
        emprestimos: [],
        livros: [],
        devolucao: ''

    }





    consultasDosUsuarios = () => {
        const nomeUsuario = this.state.nomeUsuario
        this.emprestimoService.buscarEmprestimoPendentes(nomeUsuario)
            .then(response => {
                this.setState({ emprestimos: response.data })
                console.log(this.state.emprestimos)
            }).catch(erro => {
                console.log(erro)
            })
    }

    realizarDevolucao = (emprestimo) => {
        this.devolucaoService.salvarDevolucaoPorEmprestimo(emprestimo)
            .then(Response => { messagemSucesso("Devolução Realizada com sucesso") })
            .catch(erro => { mensagemErro("Erro ao realizar o devolução") })

    }



    render() {
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
                                            <button type="button" onClick={(e) => this.consultasDosUsuarios()} className="btn btn-primary ">pesquisar</button>


                                        </div>

                                    </div>
                                </Card>


                                <div className="col-8">

                                    <div className="alert alert-dismissible alert-success">
                                        <strong><h3>Lista de Emprestimos Pendentes</h3></strong>
                                    </div>


                                </div>

                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Data Emprestimo</th>
                                            <th scope="col">Ação</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.emprestimos.map(emp => (
                                                <tr key={emp.id}>
                                                    <td>{new Date(emp.dataEmprestimo).toLocaleDateString("pt-br")}</td>
                                                    <td>
                                                        <button type="button"
                                                            onClick={(e) => this.realizarDevolucao(emp)}
                                                            className="btn btn-success">Devolver</button>
                                                    </td>
                                                </tr>
                                            ))

                                        }
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