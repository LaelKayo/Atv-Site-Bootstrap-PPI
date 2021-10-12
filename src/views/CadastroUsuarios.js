import React from 'react'
import Navbar from '../components/NavBar'
import Card from '../components/Card'
import FormGroup from '../components/FormGroup'
import BibliotecarioService from '../service/BibliotecarioService'
import ProfessorService from '../service/ProfessorService'
import AlunoService from '../service/AlunoService'
import { mensagemErro, messagemSucesso } from '../components/Toastr'
import EstadosService from '../service/EstadoService'
import UsuarioService from '../service/UsuarioService'
import CidadeService from '../service/CidadeService'
//import '../js/estados'


export default class CadastroUsuarios extends React.Component {

    constructor() {
        super()
        this.BibliotecarioService = new BibliotecarioService()
        this.ProfessorService = new ProfessorService()
        this.AlunoService = new AlunoService()
        this.estadoService = new EstadosService()
        this.usuarioService = new UsuarioService()
        this.cidadeService = new CidadeService()
    }

    state = {
        id: null,
        senha: '',
        matricula: '',
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        periodo: '',
        area: '',
        genero: '',
        perfil: '',
        estados: [],
        estadoSelecionado: '',
        cidades: [],
        cidadeSelecionado: '',
        longradouro: '',
        numero: '',
        bairro: ''
    }

    resetForm = () => {
        this.setState({
            id: null,
            senha: '',
            matricula: '',
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            periodo: '',
            area: '',
            genero: '',
            perfil: '',
            estadoSelecionado: '',
            cidadeSelecionado: '',
            longradouro: '',
            numero: '',
            bairro: ''
        })
    }

    ordenarLista = (a, b) => {
        return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0)
    }

    initEstados = () => {
        this.estadoService.buscarEstados().then(response => {
            const estadosOrdenados = response.data
            estadosOrdenados.sort(this.ordenarLista)
            console.log(estadosOrdenados)
            this.setState({ estados: estadosOrdenados })
        }).catch(erro => {
            console.log(erro)
        })
    }

    cidadeDoEstado = (estado) => {
        this.setState({ estadoSelecionado: estado})
        this.cidadeService.buscaCidadesPorUf(estado).then(response => {
            this.setState({ cidades: response.data })
        }).catch(erro => {
            console.log("erro ao buscar cidades")
        })
    }

    componentDidMount() {
        this.initEstados()
        const params = this.props.match.params
        if (params.id) {
            this.usuarioService.buscarPorId(params.id).then(response => {
                this.setState({ ...response.data })
                const user = response.data
                const { contato: { telefone, email } } = user
                const { endereco: {uf, cidade, longradouro, bairro, numero } } = user
                const { login: { matricula, senha } } = user
                this.setState({ matricula: matricula, senha: senha })
                this.setState({ telefone: telefone, email: email })
                this.setState({estadoSelecionado: uf, cidadeSelecionado: cidade, rua: longradouro, numero: numero, bairro: bairro })
                console.log(response.data)
            }).catch(erro => {
                mensagemErro("Erro ao tentar recuperar usuario")
            })
        }
    }

    save = () => {
        const user = {
            id: this.state.id,

            nome: this.state.nome,
            cpf: this.state.cpf,

            login: {
                senha: this.state.senha,
                matricula: this.state.matricula,
            },

            contato: {
                email: this.state.email,
                telefone: this.state.telefone,
            },

            endereco: {

                uf: this.state.estadoSelecionado,
                cidade: this.state.cidadeSelecionado,

                rua: this.state.longradouro,
                numero: this.state.numero,
                bairro: this.state.bairro,
            },

            periodo: this.state.periodo,
            genero: this.state.genero,
            perfil: this.state.perfil,
            area: this.state.area

        }

        if (this.state.perfil === 'Bibliotecario') {
            if (this.state.id == null) {
                //salvar
                this.BibliotecarioService.salvar(user)
                    .then(Response => { messagemSucesso("Usuario Cadastrado com sucesso") })
                    .catch(erro => { mensagemErro("Erro ao realizar o cadastro") })
            } else {
                //atualizar
                this.BibliotecarioService.atualizar(user)
                    .then(Response => { messagemSucesso("Usuario Atualiado com sucesso") })
                    .catch(erro => { mensagemErro("Erro ao realizar a atualizacao") })
            }
        } else if (this.state.perfil === 'Professor') {
            if (this.state.id == null) {
                //salvar
                this.ProfessorService.salvar(user)
                    .then(Response => { messagemSucesso("Usuario Cadastrado com sucesso") })
                    .catch(erro => { mensagemErro("Erro ao realizar o cadastro") })
            } else {
                //atualizar
                this.BibliotecarioService.atualizar(user)
                    .then(Response => { messagemSucesso("Usuario Atualiado com sucesso") })
                    .catch(erro => { mensagemErro("Erro ao realizar a atualizacao") })
            }
        } else if (this.state.perfil === 'Aluno') {
            if (this.state.id == null) {
                //salvar
                this.AlunoService.salvar(user)
                    .then(Response => { messagemSucesso("Usuario Cadastrado com sucesso") })
                    .catch(erro => { mensagemErro("Erro ao realizar o cadastro") })
            } else {
                //atualizar
                this.BibliotecarioService.atualizar(user)
                    .then(Response => { messagemSucesso("Usuario Atualiado com sucesso") })
                    .catch(erro => { mensagemErro("Erro ao realizar a atualizacao") })
            }

        }
        this.resetForm()
    }

    verTodos = () => {
        this.props.history.push("/lista-usuario");
    }

    render() {

        const estadosOrdenados = this.state.estados
        const cidadesDoEstado = this.state.cidades

        return (
            <>
                <Navbar />
                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <button type="button" onClick={this.verTodos} className="btn btn-primary mb-2 mt-3">Ver todos</button>
                            <Card titulo="Cadastro de Usuarios">
                                <div className="row">
                                    <div className="col-12">{/*form-group col-md-4*/}
                                        <fieldset>

                                            <FormGroup htmlFor="matriculaInput" label="Matricula">
                                                <input type="text" value={this.state.matricula} onChange={(e) => this.setState({ matricula: e.target.value })} id="matriculaInput" className="form-control" placeholder="Digite a matricula" />
                                            </FormGroup>

                                            <FormGroup htmlFor="senhaInput" label="Senha">
                                                <input type="password" value={this.state.senha} onChange={(e) => this.setState({ senha: e.target.value })} id="senhaInput" className="form-control" placeholder="Digite a senha" />
                                            </FormGroup>

                                            <FormGroup htmlFor="nomeInput" label="Nome">
                                                <input type="text" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} id="nomeInput" className="form-control" placeholder="Digite seu nome" />
                                            </FormGroup>

                                            <FormGroup htmlFor="cpfInput" label="CPF">
                                                <input type="text" value={this.state.cpf} onChange={(e) => this.setState({ cpf: e.target.value })} id="cpfInput" className="form-control" placeholder="Digite seu CPF" />
                                            </FormGroup>

                                            <FormGroup htmlFor="emailInput" label="E-mail">
                                                <input type="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} id="emailInput" className="form-control" placeholder="Digite seu E-mail" />
                                            </FormGroup>

                                            <FormGroup htmlFor="tellInput" label="Telefone">
                                                <input type="tel" value={this.state.telefone} onChange={(e) => this.setState({ telefone: e.target.value })} id="tellInput" className="form-control cel-sp-mask" placeholder="Ex. (00) 00000-0000" />
                                            </FormGroup>

                                            <FormGroup htmlFor="periodoInput" label="Periodo">
                                                <select className="form-control" value={this.setState.periodo} onChange={(e) => this.setState({ periodo: e.target.value })} id="periodoInput">
                                                    <option> </option>
                                                    <option value='1'>P1</option>
                                                    <option value='2'>P2</option>
                                                    <option value='3'>P3</option>
                                                    <option value='4'>P4</option>
                                                    <option value='5'>P5</option>
                                                    <option value='5'>P6</option>
                                                    <option value='7'>P7</option>
                                                    <option value='8'>P8</option>
                                                </select>
                                            </FormGroup>

                                            <FormGroup htmlFor="periodoInput" label="Área">
                                                <select className="form-control" value={this.setState.area} onChange={(e) => this.setState({ area: e.target.value })} id="areaInput">
                                                    <option> </option>
                                                    <option value="1">EXATAS</option>
                                                    <option value="2">HUMANAS</option>

                                                </select>
                                            </FormGroup>

                                            <FormGroup htmlFor="generoInput" label="Genero">
                                                <select className="form-control" value={this.setState.genero} onChange={(e) => this.setState({ genero: e.target.value })} id="generoInput">
                                                    <option></option>
                                                    <option value="1">MASCULINO</option>
                                                    <option value="2">FEMININO</option>
                                                </select>
                                            </FormGroup>

                                            <FormGroup htmlFor="perfilInput" label="Perfil">
                                                <select className="form-control" value={this.setState.perfil} onChange={(e) => this.setState({ perfil: e.target.value })} id="perfilInput">
                                                    <option> </option>
                                                    <option value='Aluno'>Aluno</option>
                                                    <option value='Professor'>Professor</option>
                                                    <option value='Bibliotecario'>Bibliotecario</option>
                                                </select>
                                            </FormGroup>


                                            <div className="form-group row">
                                                <div className="col-12">
                                                    <FormGroup htmlFor="selectEstado" label="Estado">
                                                        <select className="form-control" placeholder="Selecione o Estado" value={this.state.estadoSelecionado}
                                                            onChange={(e) => this.cidadeDoEstado(e.target.value)} id="selectEstado">
                                                            <option></option>
                                                            {
                                                                estadosOrdenados.map(estado => (
                                                                    <option value={estado.sigla}>{estado.nome}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-12">
                                                    <FormGroup htmlFor="selectCidade" label="Cidade">
                                                        <select className="form-control" placeholder="Selecione a Cidade" value={this.state.cidadeSelecionado}
                                                            onChange={(e) => this.setState({ cidadeSelecionado: e.target.value })} id="selectCidade">
                                                            <option></option>
                                                            {
                                                                cidadesDoEstado.map(cidade => (
                                                                    <option value={cidade.nome}>{cidade.nome}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </FormGroup>
                                                </div>
                                            </div>

                                            <FormGroup htmlFor="longradouroInput" label="Longradouro">
                                                <input type="text" value={this.state.longradouro} onChange={(e) => this.setState({ longradouro: e.target.value })} id="longradouroInput" className="form-control" placeholder="Digite o nome da rua" />
                                            </FormGroup>

                                            <FormGroup htmlFor="numeroInput" label="Número">
                                                <input type="text" value={this.state.numero} onChange={(e) => this.setState({ numero: e.target.value })} id="numeroInput" className="form-control" placeholder="Digite o número" />
                                            </FormGroup>

                                            <FormGroup htmlFor="bairroInput" label="Bairro">
                                                <input type="text" value={this.state.bairro} onChange={(e) => this.setState({ bairro: e.target.value })} id="bairroInput" className="form-control" placeholder="Digite seu bairro" />
                                            </FormGroup>

                                        </fieldset>

                                        <button type="button" onClick={this.save} className="btn btn-primary ">Salvar</button>
                                        <button type="reset" onClick={this.resetForm} className="btn btn-danger">Cancelar</button>

                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <script type="text/javascript">
                    $("#tellInput").mask("(00) 0000-0000");
                </script>
            </>
        )
    }
}