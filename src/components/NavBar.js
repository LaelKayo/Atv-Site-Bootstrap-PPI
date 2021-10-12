import React from 'react'
import NavItem from '../components/NavItem'
import LocalStoregeService from '../service/LocalStorege'
import DropDown from '../components/DropDown'
import DropDownItem from '../components/DropDownItem'

export default class NavBar extends React.Component {

    state = {
        user: ''
    }

    componentDidMount() {
        this.setState({ user: JSON.parse(LocalStoregeService.getItem('usuario_logado')) })
    }

    isBibliotecario() {
        return this.state.user.perfil === 'Bibliotecario'
    }

    isProfessor() {
        return this.state.user.perfil === 'Professor'
    }

    isAluno() {
        return this.state.user.perfil === 'Aluno'
    }

    isNotNull() {
        return this.state.user !== null
    }

    logout() {
        LocalStoregeService.removeItem('usuario_logado')
    }

    render() {
        return (
            //NavBar
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="home.html">BookSystem</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                            <NavItem href="#/Home" label="Home" render={this.isNotNull()} />
                            <DropDown titulo="Usuários" render={this.isNotNull() && this.isBibliotecario()}>
                                <DropDownItem href="#/cadastro-usuario" label="Cadastro"  />
                                <DropDownItem href="#/lista-usuario" label="Ver todos"  />
                            </DropDown>

                            <DropDown titulo="Livros" render={this.isNotNull() && this.isBibliotecario()}>
                                <DropDownItem href="#/cadastro-livro" label="Cadastro"  />
                                <DropDownItem href="#/lista-livro" label="Ver todos"  />
                            </DropDown>

                            <DropDown titulo="Empréstimo" render={this.isNotNull() && this.isBibliotecario()}>
                                <DropDownItem href="#/cadastro-emprestimo" label="Cadastro"  />
                               
                            </DropDown>
                            <NavItem href="#/lista-emprestimo" label="Meus Emprestimo" render={this.isNotNull()} />
                            <NavItem href = "#/devolucao" label="Devolução" render={this.isNotNull() && this.isBibliotecario()} />
                            <NavItem href="#/" label="Sair" render={this.isNotNull()} onClick={this.logout} />
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}