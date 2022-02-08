import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { log } from "mathjs";
import {
  Button,
  Form,
  Col,
  Row,
  Container,
  InputGroup,
  Card,
  Navbar, 
  Badge
} from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion'
import React, { useState } from "react";

function App() {
  
  const [y, sety] = useState(null);



  const calculateResult = () => {

    const t1 = +document.getElementById("t1").value;
    const ac1 = +document.getElementById("ac1").value;
    const fcj1 = +document.getElementById("fcj1").value;
    const c1 = +document.getElementById("c1").value;

    //const t2 = +document.getElementById("t2").value;
    const ac2 = +document.getElementById("ac2").value;
    const fcj2 = +document.getElementById("fcj2").value;
    //const c2 = +document.getElementById("c2").value;

    //const t3 = +document.getElementById("t3").value;
    const ac3 = +document.getElementById("ac3").value;
    const fcj3 = +document.getElementById("fcj3").value;
    //const c3 = +document.getElementById("c3").value;

    console.log(log(fcj1, 10));
    console.log(log(fcj2, 10));
    console.log(log(fcj3, 10));

    const x =
      log(fcj1, 10) * (2 * ac1 - ac2 - ac3) +
      log(fcj2, 10) * (2 * ac2 - ac1 - ac3) +
      log(fcj3, 10) * (2 * ac3 - ac1 - ac2);

    console.log(x);

    const y = Math.pow(ac1, 2);
    sety(y)

    // const y =
    //   2 * (Math.pow(ac1, 2) + Math.pow(ac2, 2) + Math.pow(ac3, 2)) -
    //   2(ac1 * ac2 + ac1 * ac3 + ac2 * ac3);

    console.log("Y: %d", y);
    

    const value = t1 + ac1 + fcj1 + c1;
    console.log(value);
    //console.log(validated)
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(false);
    }

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    // if (form.checkValidity() === true) {
    //   setValidated(true);
    //   //event.preventDefault();
    //   //event.stopPropagation();
    // }

    console.log(form.checkValidity());
    console.log(validated);
  };

  return (
    <div className="App">
      <div>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src="https://www.ufes.br/sites/all/themes/padrao_ufes/images/marca_ufes.png"
                //width="30"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Brand>Calculadora de Dosagem de Concreto</Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="my-5" style={{maxWidth: 960}}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <h3>Ensaio 1</h3>
              <Col xs={6} md={3}>
                <Form.Group controlId="t1">
                  <Form.Label>Traço</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>1 : </InputGroup.Text>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="10"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="ac1">
                  <Form.Label>a/c</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.1"
                      step="any"
                      max="10"
                    />
                    <InputGroup.Text>kg/kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="fcj1">
                  <Form.Label>
                    f<sub>cj</sub>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="100"
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="c1">
                  <Form.Label>Massa Específica</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="1000"
                    />
                    <InputGroup.Text>kg/dm³</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <h3>Ensaio 2</h3>
              <Col xs={6} md={3}>
                <Form.Group controlId="t2">
                  <Form.Label>Traço</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>1 : </InputGroup.Text>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="10"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="ac2">
                  <Form.Label>a/c</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.1"
                      step="any"
                      max="10"
                    />
                    <InputGroup.Text>kg/kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="fcj2">
                  <Form.Label>
                    f<sub>cj</sub>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="100"
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="c2">
                  <Form.Label>Consumo</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="1000"
                    />
                    <InputGroup.Text>kg/m³</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <h3>Ensaio 3</h3>
              <Col xs={6} md={3}>
                <Form.Group controlId="t3">
                  <Form.Label>Traço</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>1 : </InputGroup.Text>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="10"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="ac3">
                  <Form.Label>a/c</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.1"
                      step="any"
                      max="10"
                    />
                    <InputGroup.Text>kg/kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="fcj3">
                  <Form.Label>
                    f<sub>cj</sub>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="100"
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3}>
                <Form.Group controlId="c3">
                  <Form.Label>Consumo</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="1000"
                    />
                    <InputGroup.Text>kg/m³</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <h3>Propriedades do Concreto</h3>
              <Col>
                <Form.Group controlId="ta">
                  <Form.Label>Teor de Argamassa</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="10"
                    />
                    <InputGroup.Text>% em massa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="fck">
                  <Form.Label>
                    f<sub>ck</sub>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="numeric"
                      min="0.5"
                      step="any"
                      max="10"
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Card>
              <fieldset>
                <Form.Group as={Row} controlId="cpc">
                  <Form.Label as="legend" column sm={2}>
                    Condição de Preparo do Concreto
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="A"
                      name="cpc"
                      id="a"
                      required
                    />
                    <Form.Check type="radio" label="B" name="cpc" id="b" />
                    <Form.Check type="radio" label="C" name="cpc" id="c" />
                  </Col>
                </Form.Group>
              </fieldset>
            </Card>

            <Card>
              <fieldset>
                <Form.Group as={Row} controlId="ca">
                  <Form.Label as="legend" column sm={2}>
                    Classe de Agressividade
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="I"
                      name="ca"
                      id="1"
                      required
                    />
                    <Form.Check type="radio" label="II" name="ca" id="2" />
                    <Form.Check type="radio" label="III" name="ca" id="3" />
                    <Form.Check type="radio" label="IV" name="ca" id="4" />
                  </Col>
                </Form.Group>
              </fieldset>
            </Card>
            <Card>
              <fieldset>
                <Form.Group as={Row} controlId="tc">
                  <Form.Label as="legend" column sm={2}>
                    Tipo de Concreto
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="CA - Concreto Armado"
                      name="tc"
                      id="ca"
                      required
                    />
                    <Form.Check
                      type="radio"
                      label="CP - Concreto Protendido"
                      name="tc"
                      id="cp"
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Card>
            <Button variant="primary" type="submit" onClick={calculateResult}>
              Calcular->
            </Button>
          </Form>
          
          <Badge bg="secondary"> New</Badge>
          <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Resultado</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Valor de Y é {y} 
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
          

          

        </Container>
      </div>
    </div>
  );
}

export default App;
