import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("auth/login", {
      login,
      password,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <input
          type="email"
          className="form-control form-control my-2"
          placeholder="Почта"
          required
          onChange={e => setLogin(e.target.value)}
        />
        <input
          type="password"
          className="form-control form-control my-2"
          placeholder="Пароль"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Войти
        </button>
      </form>
    </main>
  );
};

export default Login;