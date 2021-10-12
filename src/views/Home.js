import React from 'react'
import NavBar from '../components/NavBar'
import LocalStorageService from '../service/LocalStorege'

export default class Home extends React.Component{

    state = {
        usuario : ''
    }

    componentDidMount(){
        const user = JSON.parse(LocalStorageService.getItem('usuario_logado'))
        this.setState({usuario:user})
    }

    render(){
        return (
            <>
            <NavBar/>
            <div className= "container">

                <div className="jumbotron mt-5">
                    <h1 className="display-3">Book System</h1>
        <p className="lead">Seja Bem Vindo, {this.state.usuario.nome} {this.state.usuario.perfil}</p>
                    <hr className="my-4"/>
                    <p>Utilize a aplicação para melhor comodidade</p>
                </div>
            </div>
            </>
        )
    }
}