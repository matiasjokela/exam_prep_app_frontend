//import Button from './Button'
import loginService from "../services/login";
import userService from "../services/user";
import Notification from "./Notification";
import { useState } from "react";
import LandingPage from "./LandingPage";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [messageStyle, setMessageStyle] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("click", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("loggedExamPrepUser", JSON.stringify(user));
      userService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("logged in as", user);
    } catch (exception) {
      console.log(exception);
      setUser(null);
      setUsername("");
      setPassword("");
      setMessageStyle("incorrect");
      setMessage("Väärä käyttäjätunnus tai salasana");
      setTimeout(() => {
        setMessage(null);
        setMessageStyle("");
      }, 3000);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    console.log("click", username, password);
    try {
      const user = await userService.addUser({
        username,
        password,
      });
      console.log(user);
      window.localStorage.setItem("loggedExamPrepUser", JSON.stringify(user));
      userService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      console.log("logged in as", user);
    } catch (exception) {
      console.log(exception);
      setUser(null);
      setUsername("");
      setPassword("");
      setMessageStyle("incorrect");
      setMessage("Ei onnistunut");
      setTimeout(() => {
        setMessage(null);
        setMessageStyle("");
      }, 3000);
    }
  };

  if (user) {
    return <LandingPage />;
  }

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
        <Button className="form-button mb-3" variant="primary" type="submit">
          Kirjaudu sisään
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;

// OMA CSS

/*<div className='card_view'>
<Notification style={messageStyle} message={message}/>
<h2>Kirjaudu sisään</h2>
<form>
	<div>
		<input className='form_field' type='username' id='username' placeholder='käyttäjätunnus' value={username} onChange={({ target }) => setUsername(target.value)}/>
	</div>
	<div>
		<input className='form_field' type='password' id='password' placeholder='salasana' value={password} onChange={({ target }) => setPassword(target.value)}/>
	</div>
	<div>
		<Button style='login_button' text='kirjaudu' handleClick={handleLogin}/>
		<Button style='login_button' text='uusi käyttäjä' handleClick={handleAddUser}/>
	</div>
</form>
</div>*/
