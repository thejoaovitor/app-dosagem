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
  Table
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  var [ac1, setAc1] = useState(0);
  var [fcj1, setFcj1] = useState(0);
  var [m1, setM1] = useState(0);
  var [c1, setC1] = useState(0);
  var [ac2, setAc2] = useState(0);
  var [fcj2, setFcj2] = useState(0);
  var [m2, setM2] = useState(0);
  var [c2, setC2] = useState(0);
  var [ac3, setAc3] = useState(0);
  var [fcj3, setFcj3] = useState(0);
  var [m3, setM3] = useState(0);
  var [c3, setC3] = useState(0);

  var [sd, setSd] = useState(0); //Desvio padrão relacionado à condição de preparo de concreto
  var [ca, setCa] = useState(0);
  var [tc, setTc] = useState(0);
  var [ta, setTa] = useState(0);
  var [fck, setFck] = useState(0);
  var [acMin, setAcMin] = useState(0);
  var [fckMin, setFckMin] = useState(0);
  var [ccMin, setCcMin] = useState(0);
  var [fcjFinal, setFcjFinal] = useState(0);
  var [acFinal, setAcFinal] = useState(0);
  var [mFinal, setMFinal] = useState(0);
  var [areiaFinal, setAreiaFinal] = useState(0);
  var [cFinal, setCFinal] = useState(0);
  var [bFinal, setBFinal] = useState(0);

  const [isShowingResult, setIsShowingResult] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isShowingResult === true){
      document.getElementById("result").scrollIntoView({behavior: 'smooth'})
    }
}, [isShowingResult]);// This is be executed when the state changes

  const AnswerChangeHandler = (e) => {
    if (e.target.name === "sd") {
      sd = parseFloat(e.target.value);
      setSd(parseFloat(e.target.value));
      console.log(sd);
    }
    if (e.target.name === "ca") {
      ca = parseInt(e.target.value);
      setCa(parseInt(e.target.value));
      console.log(ca);
    }
    if (e.target.name === "tc") {
      tc = e.target.value;
      setTc(e.target.value);
      console.log(tc);
    }

    setMinimumValues();
  };

  function setMinimumValues() {
    if (tc === "CP") {
      if (ca === 1) {
        setAcMin(0.6);
        setFckMin(25);
        setCcMin(260);
      } else if (ca === 2) {
        setAcMin(0.55);
        setFckMin(30);
        setCcMin(280);
      } else if (ca === 3) {
        setAcMin(0.5);
        setFckMin(35);
        setCcMin(320);
      } else if (ca === 4) {
        setAcMin(0.45);
        setFckMin(40);
        setCcMin(360);
      }
    }

    if (tc === "CA") {
      if (ca === 1) {
        setAcMin(0.65);
        setFckMin(20);
        setCcMin(260);
      } else if (ca === 2) {
        setAcMin(0.6);
        setFckMin(25);
        setCcMin(280);
      } else if (ca === 3) {
        setAcMin(0.55);
        setFckMin(30);
        setCcMin(320);
      } else if (ca === 4) {
        setAcMin(0.45);
        setFckMin(40);
        setCcMin(360);
      }
    }

    console.log({ sd, ca, tc, acMin, fckMin, ccMin });
  }

  function calculateResult() {
    m1 = +document.getElementById("m1").value;
    ac1 = +document.getElementById("ac1").value;
    fcj1 = +document.getElementById("fcj1").value;
    const me1 = +document.getElementById("me1").value;

    m2 = +document.getElementById("m2").value;
    ac2 = +document.getElementById("ac2").value;
    fcj2 = +document.getElementById("fcj2").value;
    const me2 = +document.getElementById("me2").value;

    m3 = +document.getElementById("m3").value;
    ac3 = +document.getElementById("ac3").value;
    fcj3 = +document.getElementById("fcj3").value;
    const me3 = +document.getElementById("me3").value;

    setAc1(ac1);
    setFcj1(fcj1);
    setM1(m1);
    setC1((me1 * 1000) / (1 + m1 + ac1));

    setAc2(ac2);
    setFcj2(fcj2);
    setM2(m2);
    setC2((me2 * 1000) / (1 + m2 + ac2));

    setAc3(ac3);
    setFcj3(fcj3);
    setM3(m3);
    setC3((me3 * 1000) / (1 + m3 + ac3));

    ta = +document.getElementById("ta").value;
    fck = +document.getElementById("fck").value;

    console.log({ ta, fck, sd });

    const x =
      log(fcj1, 10) * (2 * ac1 - ac2 - ac3) +
      log(fcj2, 10) * (2 * ac2 - ac1 - ac3) +
      log(fcj3, 10) * (2 * ac3 - ac1 - ac2);

    const y =
      2 * (Math.pow(ac1, 2) + Math.pow(ac2, 2) + Math.pow(ac3, 2)) -
      2 * (ac1 * ac2 + ac1 * ac3 + ac2 * ac3);

    const b = x / y;
    const k1 = Math.pow(
      10,
      (1 / 3) *
        (log(fcj1, 10) + log(fcj2, 10) + log(fcj3, 10) - b * (ac1 + ac2 + ac3))
    );
    const k2 = Math.pow(10, -b);
    const k4 =
      (m1 * ac1 + m2 * ac2 + m3 * ac3 - m2 * (ac1 + ac2 + ac3)) /
      (Math.pow(ac1, 2) +
        Math.pow(ac2, 2) +
        Math.pow(ac3, 2) -
        Math.pow(ac1 + ac2 + ac3, 2) / 3);

    const c1 = (me1 * 1000) / (1 + m1 + ac1);
    const c2 = (me2 * 1000) / (1 + m2 + ac2);
    const c3 = (me3 * 1000) / (1 + m3 + ac3);

    const k6 =
      (1000 * 3 * (m1 / c1 + m2 / c2 + m3 / c3) -
        1000 * (1 / c1 + 1 / c2 + 1 / c3) * (m1 + m2 + m3)) /
      (3 * (Math.pow(m1, 2) + Math.pow(m2, 2) + Math.pow(m3, 2)) -
        Math.pow(m1 + m2 + m3, 2));
    const k5 = (1000 * (1 / c1 + 1 / c2 + 1 / c3) - k6 * (m1 + m2 + m3)) / 3;
    const k3 = m2 - (k4 * (ac1 + ac2 + ac3)) / 3;

    if (fck < fckMin) {
      fcjFinal = fckMin + 1.65 * sd;
    } else {
      fcjFinal = fck + 1.65 * sd;
    }

    acFinal = (log(k1, 10) - log(fcjFinal, 10)) / log(k2, 10);

    if (acFinal > acMin) {
      acFinal = acMin;
    }

    mFinal = k3 + acFinal * k4;

    areiaFinal = (ta * (1 + mFinal)) / 100 - 1;
    cFinal = 1000 / (k5 + k6 * mFinal);
    if (cFinal < ccMin) {
      cFinal = ccMin;
    }ain

    bFinal = mFinal - areiaFinal;

    console.log({
      x,
      y,
      b,
      k1,
      k2,
      k3,
      k4,
      k5,
      k6,
      fcjFinal,
      acFinal,
      mFinal,
      areiaFinal,
      cFinal,
    });
    console.log({ areiaFinal, bFinal, acFinal });

    setAreiaFinal(areiaFinal.toFixed(2));
    setBFinal(bFinal.toFixed(2));
    setAcFinal(acFinal.toFixed(2));
    setCFinal(cFinal.toFixed(2))

    //console.log(validated)
  };

  function populateDemoValues() {
    document.getElementById("m1").value = 4;
    document.getElementById("ac1").value = 0.47;
    document.getElementById("fcj1").value = 45.1;
    document.getElementById("me1").value = 2.28;

    document.getElementById("m2").value = 5;
    document.getElementById("ac2").value = 0.56;
    document.getElementById("fcj2").value = 36.4;
    document.getElementById("me2").value = 2.3;

    document.getElementById("m3").value = 6;
    document.getElementById("ac3").value = 0.65;
    document.getElementById("fcj3").value = 29.6 ;
    document.getElementById("me3").value = 2.32;

    document.getElementById("ta").value = 52;
    document.getElementById("fck").value = 30;
    console.log("populate function")
  }
  

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(false);
      setIsShowingResult(false)
    } else {
      calculateResult()
      setIsShowingResult(true)
      if (isShowingResult === true){
        document.getElementById("result").scrollIntoView()
      }
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

  const optionsLyse = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "A/C (Kg/Kg)",
        },
      },
      y: {
        beginAtZero: true,
        reverse: true,
        position: "right",
        title: {
          display: true,
          text: "m (Kg)",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Lei de Lyse",
        position: "bottom",
      },
      legend: {
        display: false,
      },
    },
  };

  const optionsKirilos = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        reverse: true,
        title: {
          display: true,
          text: "Consumo (Kg/m³)",
        },
      },
      y: {
        beginAtZero: true,
        reverse: true,
        title: {
          display: true,
          text: "m (Kg)",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Lei de Kirilos",
        position: "bottom",
      },
      legend: {
        display: false,
      },
    },
  };

  const optionsAbrams = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        position: "top",
        title: {
          display: true,
          text: "A/C (Kg/Kg)",
        },
      },
      y: {
        beginAtZero: true,
        position: "right",
        title: {
          display: true,
          text: "fcj (MPa)",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Lei de Abrams",
      },
      legend: {
        display: false,
      },
    },
  };

  const dataAbrams = {
    datasets: [
      {
        //label: 'Dataset 1',
        data: [
          { x: ac1, y: fcj1 },
          { x: ac2, y: fcj2 },
          { x: ac3, y: fcj3 },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        showLine: true,
        tension: 0.4,
      },
    ],
  };

  const dataKirilos = {
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: c1, y: m1 },
          { x: c2, y: m2 },
          { x: c3, y: m3 },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        showLine: true,
        tension: 0.4,
      },
    ],
  };

  const dataLyse = {
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: ac1, y: m1 },
          { x: ac2, y: m2 },
          { x: ac3, y: m3 },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        showLine: true,
        tension: 0.4,
      },
    ],
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
        <Container className="my-5" style={{ maxWidth: 960 }}>
        <Button variant="outline-secondary" onClick={populateDemoValues}>
              Adicionar Valores Demonstração
            </Button>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="my-4">
              <h3>Ensaio 1</h3>
              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="m1">
                  <Form.Label>Traço</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>1 : </InputGroup.Text>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="10"
                      
                    />
                    
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="ac1">
                  <Form.Label>a/c</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.1"
                      step="any"
                      max="10"
                      
                    />
                    <InputGroup.Text>kg/kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="fcj1">
                  <Form.Label>
                    f<sub>cj</sub>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="100"
                      
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="me1">
                  <Form.Label>Massa Específica</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="1000"
                      
                    />
                    <InputGroup.Text>kg/m³</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4">
              <h3>Ensaio 2</h3>
              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="m2">
                  <Form.Label>Traço</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>1 : </InputGroup.Text>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="10"
                      
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="ac2">
                  <Form.Label>a/c</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.1"
                      step="any"
                      max="10"
                      
                    />
                    <InputGroup.Text>kg/kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="fcj2">
                  <Form.Label>
                    f<sub>cj</sub>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="100"
                      
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="me2">
                  <Form.Label>Massa Específica</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="1000"
                      
                    />
                    <InputGroup.Text>kg/m³</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4">
              <h3>Ensaio 3</h3>
              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="m3">
                  <Form.Label>Traço</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>1 : </InputGroup.Text>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="10"
                      
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="ac3">
                  <Form.Label>a/c</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.1"
                      step="any"
                      max="10"
                      
                    />
                    <InputGroup.Text>kg/kg</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="fcj3">
                  <Form.Label>
                    f<sub>cj</sub>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="100"
                      
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col xs={6} md={3} className="mt-2">
                <Form.Group controlId="me3">
                  <Form.Label>Massa Específica</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="1000"
                      
                    />
                    <InputGroup.Text>kg/m³</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="my-4">
              <h3>Propriedades do Concreto</h3>
              <Col>
                <Form.Group controlId="ta">
                  <Form.Label>Teor de Argamassa</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="0.0"
                      required
                      type="number"
                      inputMode="decimal"
                      min="1"
                      step="any"
                      max="100"
                      
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
                      inputMode="decimal"
                      min="0.5"
                      step="any"
                      max="50"
                      
                    />
                    <InputGroup.Text>MPa</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Card className="my-2 p-2">
              <fieldset>
                <Form.Group as={Row} controlId="sd">
                  <Form.Label as="legend" column sm={2}>
                    Condição de Preparo do Concreto
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label="A"
                      name="sd"
                      id="a"
                      required
                      value={4.0}
                      onChange={AnswerChangeHandler}
                    />
                    <Form.Check
                      type="radio"
                      label="B"
                      name="sd"
                      id="b"
                      value={5.5}
                      onChange={AnswerChangeHandler}
                    />
                    <Form.Check
                      type="radio"
                      label="C"
                      name="sd"
                      id="c"
                      value={7}
                      onChange={AnswerChangeHandler}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Card>

            <Card className="my-2 p-2">
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
                      value="1"
                      required
                      onChange={AnswerChangeHandler}
                    />
                    <Form.Check
                      type="radio"
                      label="II"
                      name="ca"
                      value="2"
                      onChange={AnswerChangeHandler}
                    />
                    <Form.Check
                      type="radio"
                      label="III"
                      name="ca"
                      value="3"
                      onChange={AnswerChangeHandler}
                    />
                    <Form.Check
                      type="radio"
                      label="IV"
                      name="ca"
                      value="4"
                      onChange={AnswerChangeHandler}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Card>
            <Card className="my-2 p-2">
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
                      value="CA"
                      onChange={AnswerChangeHandler}
                    />
                    <Form.Check
                      type="radio"
                      label="CP - Concreto Protendido"
                      name="tc"
                      id="cp"
                      value="CP"
                      onChange={AnswerChangeHandler}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Card>
            <div className="d-grid gap-2 my-2">
            <Button variant="primary" type="submit" size="lg">
              Calcular
            </Button>
            
            </div>
          </Form>

          {isShowingResult && (<Card id="result" className="my-5" border="primary">
            <Card.Header>Resultado</Card.Header>
            <Card.Body>
            <Table striped bordered>
                  <thead>
                    
                      <th> Traço Final </th>
                    
                  </thead>
                  <tbody>
                  <tr>
                      <th>Cimento</th>
                      <th>Areia</th>
                      <th>Brita</th>
                      <th>Água</th>
                    </tr>
                    <tr>
                      <td> 1 </td>
                      <td> {areiaFinal} </td>
                      <td>{bFinal} </td>
                      <td> {acFinal} </td>
                    </tr>
                    <tr>
                      <td> Consumo de Materiais (Kg/m³ de Concreto)</td>
                      <td> {cFinal} </td>
                      <td> {(cFinal*areiaFinal).toFixed(2)} </td>
                      <td> {(cFinal*bFinal).toFixed(2)} </td>
                      <td> {(cFinal*acFinal).toFixed(2)} </td>
                    </tr>
                  </tbody>
                </Table>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th> </th>
                      <th>Cimento</th>
                      <th>Areia</th>
                      <th>Brita</th>
                      <th>Água</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Traço Final</td>
                      <td> 1 </td>
                      <td> {areiaFinal} </td>
                      <td>{bFinal} </td>
                      <td> {acFinal} </td>
                    </tr>
                    <tr>
                      <td> Consumo de Materiais (Kg/m³ de Concreto)</td>
                      <td> {cFinal} </td>
                      <td> {(cFinal*areiaFinal).toFixed(2)} </td>
                      <td> {(cFinal*bFinal).toFixed(2)} </td>
                      <td> {(cFinal*acFinal).toFixed(2)} </td>
                    </tr>
                  </tbody>
                </Table>
              <Card.Text>
                Teste
              </Card.Text>
              <Card.Text>
                Sd:{sd} Tipo de concreto é {tc}, CA:{ca}, FCKmin:{fckMin}{" "}
                A/cmin:{acMin} e ConsumoCMin:{ccMin}
              </Card.Text>
              <Row style={{ height: 250 }}>
                <Col xs={6} className="pe-0"></Col>
                <Col xs={6} className="ps-0">
                  <Scatter options={optionsAbrams} data={dataAbrams} />{" "}
                </Col>
              </Row>
              <Row style={{ height: 250 }}>
                <Col xs={6} className="pe-0">
                  <Scatter options={optionsKirilos} data={dataKirilos} />
                </Col>
                <Col xs={6} className="ps-0">
                  <Scatter options={optionsLyse} data={dataLyse} />
                </Col>
              </Row>

            </Card.Body>
          </Card>)}
        </Container>
      </div>
    </div>
  );
}

export default App;
