import React from 'react'

import { Route, Switch, HashRouter } from 'react-router-dom'
import CadastroUsuarios from '../views/CadastroUsuarios'
import Home from '../views/Home'
import ListaUsuarios from '../views/ListaUsuarios'
import Login from '../views/login'
import CadastroLivro from '../views/CadastroLivros'
import ListaLivro from '../views/ListaLivros'
import CadastroEmprestimo from '../views/CadastroEmprestimo'
import MeusEmprestimos from '../views/MeusEmprestimos'
import Devolucao from '../views/Devolucao'



export default function Rotas() {

    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact component={Home} />
                <Route path="/cadastro-usuario/:id?" exact component={CadastroUsuarios} />
                <Route path="/lista-usuario" exact component={ListaUsuarios} />
                <Route path="/lista-livro" exact component={ListaLivro} />
                <Route path="/cadastro-livro/:id?" exact component = {CadastroLivro}/> 
                <Route path="/cadastro-emprestimo" exact component = {CadastroEmprestimo}/> 
                <Route path="/lista-emprestimo" exact component = {MeusEmprestimos}/> 
                <Route path="/devolucao" exact component = {Devolucao}/> 
                
            </Switch>
        </HashRouter>
    )
}