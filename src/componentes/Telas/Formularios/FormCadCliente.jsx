import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormCadCliente(props) {
    // Verifica se existe clienteSelecionado e inicializa corretamente
    const [cliente, setCliente] = useState(
        props.clienteSelecionado || {
            codigo: "",
            nome: "",
            cpf: "",
            endereco: "",
            dataNasc: ""
        }
    );
    const [formValidado, setFormValidado] = useState(false);

    // Atualiza o estado do cliente se o prop mudar
    useEffect(() => {
        setCliente(props.clienteSelecionado || {
            codigo: "",
            nome: "",
            cpf: "",
            endereco: "",
            dataNasc: ""
        });
    }, [props.clienteSelecionado]);

    function manipularSubmissao(evento) {
        evento.preventDefault(); // Impede o comportamento padrão do formulário
        evento.stopPropagation(); // Impede a propagação do evento

        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                // Cadastrar o cliente
                props.setListaClientes([...props.listaClientes, cliente]);
            } else {
                // Atualizar o cliente existente
                props.setListaClientes(props.listaClientes.map((item) => 
                    item.codigo !== cliente.codigo ? item : cliente
                ));
                // Voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setClienteSelecionado({
                    codigo: 0,
                    nome: "",
                    cpf: "",
                    endereco: "",
                    dataNasc: ""
                });
            }
            props.setExibirTabela(true);
        } else {
            setFormValidado(true);
        }
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value; 
        setCliente({ ...cliente, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            required
                            type="text"
                            id="codigo"
                            name="codigo"
                            value={cliente.codigo}
                            disabled={props.modoEdicao}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>
                            Código inválido.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={cliente.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o nome completo.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="cpf"
                            name="cpf"
                            aria-describedby="cpf"
                            value={cliente.cpf}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o cpf!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Endereço</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="endereco"
                            name="endereco"
                            aria-describedby="endereco"
                            value={cliente.endereco}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o endereço!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Data de nascimento</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="dataNasc"
                            name="dataNasc"
                            aria-describedby="dataNasc"
                            value={cliente.dataNasc}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a data de nascimento!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>
                        Voltar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
