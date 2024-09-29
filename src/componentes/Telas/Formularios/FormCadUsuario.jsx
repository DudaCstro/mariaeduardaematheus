import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(
        props.usuarioSelecionado || {
            codigo: 0,
            nome: "",
            rg: "",
            funcao: "",
            senha: ""
        }
    );
    const [formValidado, setFormValidado] = useState(false);

    useEffect(() => {
        setUsuario(props.usuarioSelecionado || {
            codigo: 0,
            nome: "",
            rg: "",
            funcao: "",
            senha: ""
        });
    }, [props.usuarioSelecionado]);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                // Cadastrar o usuário
                props.setListaUsuarios([...props.listaUsuarios, usuario]);
            } else {
                // Atualizar o usuario existente
                props.setListaUsuarios(props.listaUsuarios.map((item) =>
                    item.codigo !== usuario.codigo ? item : usuario
                ));
                // Voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                    codigo: 0,
                    nome: "",
                    rg: "",
                    funcao: "",
                    senha: ""
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
        setUsuario({ ...usuario, [elemento]: valor });
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
                            value={usuario.codigo}
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
                        value={usuario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o nome completo.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>RG</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="rg"
                            name="rg"
                            aria-describedby="rg"
                            value={usuario.rg}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o RG!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Função</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="funcao"
                            name="funcao"
                            aria-describedby="funcao"
                            value={usuario.funcao}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a sua função!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="4">
                    <Form.Label>Senha</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            id="senha"
                            name="senha"
                            aria-describedby="senha"
                            value={usuario.senha}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a sua senha!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setExibirTabela(true);
                        props.setUsuarioSelecionado({
                            codigo: 0,
                            nome: "",
                            rg: "",
                            funcao: "",
                            senha: ""
                        })
                    }}>
                        Voltar
                    </Button>
                </Col>
            </Row>
        </Form>
    );

}