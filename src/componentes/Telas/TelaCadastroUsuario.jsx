import { useState } from "react";
import { Alert } from "react-bootstrap";
export default function TelaCadastroUsuario(props){
    const[exibirTabela, setExibirTabela] = useState(true);
    const[listaUsuarios, setListaUsuarios] = useState(usuarios);
    const[modoEdicao, setModoEdicao] = useState(false);
    const[usuarioSelecionado, setUsuarioSelecionado] = useState({
        "codigo":0,
        "nome":"",
        "funcao":"",
        "cpf":""
    });
    
    return(
        <div>
            <Pagina>
                <Alert>
                    <h2>Cadastro de Usuário</h2>
                </Alert>
                {
                    exibirTabela ? (
                        <TabelaUsuario>
                            listaUsuarios = {listaUsuarios}
                            setListaClientes={setListaClientes}
                        </TabelaUsuario>
                    ) : (
                        <FormCad
                    )
                }
            </Pagina>
        </div>
    );
}