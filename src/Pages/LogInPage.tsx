import { FirebaseError } from "firebase/app";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoginCredentials } from "../types/Admin.types";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
    toast.warning('Vi kunde tyvärr inte logga in dig');

    try {
      setLoading(true);
      await login(data.email, data.password);
      navigate("/restaurants");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        toast.warning("Något blev fel vid inloggning");
      }
      setLoading(false);
    }
  };

  return (
    <Container className="py-3 center-y">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Login</Card.Title>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit(onLogin)}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="name@epost.se"
                    type="email"
                    {...register("email", {
                      required: "Du måste uppge en mail",
                    })}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Lösenord</Form.Label>
                  <Form.Control
                    placeholder="Lösenord"
                    type="password"
                    autoComplete="Lösenord"
                    {...register("password", {
                      required: "Obligatoriskt fält",
                      minLength: {
                        value: 6,
                        message:
                          "Ditt lösenord behöver vara minst 3 tecken långt",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="ogiltig">
                      {errors.password.message ?? "ogiltigt värde"}
                    </p>
                  )}
                  <Form.Text>At least 6 characters</Form.Text>
                </Form.Group>

                <Button disabled={loading} variant="primary" type="submit">
                  {loading ? "Loggar in..." : "Logga In"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
