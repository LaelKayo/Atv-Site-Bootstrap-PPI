import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import UsuarioService from '../service/UsuarioService'
import LocalStoregeService from '../service/LocalStorege'
import NavBar from '../components/NavBar'
import {mensagemErro} from '../components/Toastr'


export default class Login extends React.Component {

    constructor() {
        super()
        this.usuarioService = new UsuarioService()
    }

    state = {
        matricula: '',
        senha: '',

    }

    resetForm = () => {
        this.setState({matricula: '', senha: ''})
    }

    login = () => {
        this.usuarioService.autenticacao({
            matricula: this.state.matricula,
            senha: this.state.senha
            
        }).then(response => {
            LocalStoregeService.addItem('usuario_logado', JSON.stringify(response.data))
            this.props.history.push('/Home')
            //console.log(response.data)
        }).catch(erro => {
            mensagemErro("Login ou Senha inválidos!")
        })
    }

    render() {

        return (
            <>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <Card titulo="Login">
                                <div className="row">
                                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                        <div className="bs-components">
                                            <fieldset>
                                                <FormGroup htmlFor="inputMatricula" label="Matricula">
                                                    <input type="text" value={this.state.matricula} onChange={(e) => this.setState({ matricula: e.target.value })} id="inputMatricula" className="form-control" name="username"
                                                        placeholder="Digite a matricula" required />
                                                </FormGroup>

                                                <FormGroup htmlFor="inputPassword" label="Senha">
                                                    <input type="password" value={this.state.senha} onChange={(e) => this.setState({ senha: e.target.value })} id="inputPassword" className="form-control" name="password"
                                                        placeholder="Digite a Senha" required />
                                                </FormGroup>

                                            </fieldset>
                                        </div>
                                        <button onClick={this.login} type="button" className="btn btn-primary ">Login</button>
                                        <button type="reset" onClick={this.resetForm} className="btn btn-danger">Limpar</button>
                                        <hr className="my-4" />
                                        <button type="button" className="btn btn-primary btn-sm btn-block">Quero me cadastrar</button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}