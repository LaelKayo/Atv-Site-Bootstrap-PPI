import React from 'react'
import UsuarioService from '../service/UsuarioService'
import NavBar from '../components/NavBar'
import { mensagemErro, messagemSucesso } from '../components/Toastr'
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button'

export default class ListaUsuarios extends React.Component {


    constructor() {
        super()
        this.usuarioService = new UsuarioService()
    }

    state = {
        usuarios: [],
        renderDialogFooter: false,
        usuarioDeletar:null
    }

    prepareCadastro = () => {
        this.props.history.push("/cadastro-usuario")
    }

    prepareEditar = (usuario) => {
        this.props.history.push(`/cadastro-usuario/${usuario.id}`)
    }

    prepareExcluir = (usuario) => {
        this.setState({renderDialogFooter: true, usuarioDeletar: usuario})
    }

    excluir = () => {
        this.usuarioService.deletar(this.state.usuarioDeletar.id).then(response => {
            const users = this.state.usuarios
            const index = users.indexOf(this.state.usuarioDeletar)
            users.splice(index, 1)
            this.setState({ usuarios: users })
            messagemSucesso("Usuario Excluido Com Sucesso!")
            this.confirmarCancelar()
        }).catch(erro => {
            mensagemErro("Erro ao Excluir Usuario")
        })
    }

    confirmarCancelar  = () =>{
        this.setState({renderDialogFooter:false, usuarioDeletar:{}})
    }

    componentDidMount() {
        this.usuarioService.buscarTodos().then(response => {
            this.setState({ usuarios: response.data })
        })
    }

    render() {

        const users = this.state.usuarios;

        const dialogFooter = (
            <div>
                <Button label="SIM" icon="pi pi-check"  className="p-button-success" onClick={this.excluir} />
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
                                <th scope="col">Nome</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Perfil</th>
                                <th scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.cpf}</td>
                                        <td>{usuario.contato.telefone}</td>
                                        <td>{usuario.perfil}</td>
                                        <td>
                                            <button type="button" onClick={((e) => this.prepareEditar(usuario))} className="btn btn-secondary">Editar</button>
                                            <a> </a>
                                            <button type="button" onClick={((e) => this.prepareExcluir(usuario))} className="btn btn-danger">Excluir</button>
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
                    onHide={(e) => this.setState({renderDialogFooter:false})}>
                        Deseja Excluir o Usuario?
                </Dialog>
            </>
        )
    }
}