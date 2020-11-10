import React from 'react'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import UsuarioService from '../service/UsuarioService'


export default class Login extends React.Component {

    constructor(){
        super()
        this.usuarioService = new UsuarioService()
    }

    state = {
        email : '',
        senha : '',

    }

    login = () => {
       this.usuarioService.autenticacao({
           matricula : this.state.matricula,
           senha : this.state.senha
       }).then(response => {
           console.log(response)
       }).catch(erro => {
           console.log(erro)
       })
    }

    render() {
    
        return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <Card titulo="Login">
                            <div className="row">
                                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                    <div className='bs-components'>
                                    <fieldset>
                                        <FormGroup htmlFor="inputMatricula" label="Matricula">
                                        <input type="text" value={this.state.matricula} onChange={(e) => this.setState({matricula : e.target.value})} id="inputMatricula" className="form-control" name="username"
                                    placeholder="Digite a matricula" required />
                                        </FormGroup>

                                        <FormGroup htmlFor="inputPassword" label="Senha">
                                        <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha : e.target.value})} id="inputPassword" className="form-control" name="password"
                                    placeholder="Digite a Senha" required/>
                                        </FormGroup>

                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" htmlFor="customCheck1">
                                    Lembre-se de senha</label>
                                    </div>
                                   </fieldset>
                                    </div>
                                    <button onClick={this.login} type="button" className="btn btn-primary ">Login</button>
                                    <button type="reset" className="btn btn-danger">Limpar</button>
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