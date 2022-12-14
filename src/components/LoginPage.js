//import Button from './Button'
import loginService from "../services/login";
import userService from "../services/user";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validUser = useSelector((state) => state.user);
  let local = null;
  try {
    local = JSON.parse(window.localStorage.getItem("loggedExamPrepUser"));
  } catch (e) {
    console.log(e);
  }

  useEffect(() => {
    if (local && local.token) {
      const token = local.token;
      dispatch(checkUser({ token }));
    }
  }, [dispatch, local]);

  useEffect(() => {
    if (validUser) {
      navigate("/", {
        state: {
          user: validUser,
        },
      });
    }
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedExamPrepUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      const response = JSON.parse(exception.request.response);
      window.confirm(response.error);
      setUsername("");
      setPassword("");
    }
    window.location.reload(false);
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      if (
        window.confirm(`Olet luomassa käyttäjää ${username}, haluatko jatkaa?`)
      ) {
        const user = await userService.addUser({
          username,
          password,
        });
        window.localStorage.setItem("loggedExamPrepUser", JSON.stringify(user));
        setUsername("");
        setPassword("");
      }
    } catch (exception) {
      const response = JSON.parse(exception.request.response);
      window.confirm(response.error);
      setUsername("");
      setPassword("");
    }
    window.location.reload(false);
  };

  return (
    <Container id="login" className="mb-3 shadow rounded p-sm-4 col-sm-6">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>käyttäjätunnus</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
          <Form.Label>salasana</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          className="form-button mb-3"
          variant="primary"
          type="submit"
          disabled={!username || !password}
        >
          Kirjaudu sisään
        </Button>
        <Button
          className="form-button mb-3"
          variant="secondary"
          disabled={!username || !password}
          onClick={(e) => handleAddUser(e)}
        >
          Lisää käyttäjä
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
