import Pagina from "../layouts/Pagina";

//props ->passa dado de componente pai para filho
export default function TelaCadastroCliente(props){



    return(
        <div>
            <Pagina>
            <Alert className="mt-02 mb-02 success text-center" variant="success">
                <h2>Cadastro de Cliente</h2>
            </Alert>
            
            </Pagina>
        </div>
    )
}