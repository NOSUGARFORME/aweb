import React, { Component, SyntheticEvent } from "react";
import "./Login.css";
import axios from "axios";
import { Redirect } from "react-router";

class Register extends Component {
  name = "";
  surname = "";
  thirdName = "";
  phoneNumber = "";
  email = "";
  password = "";
  state = {
    redirect: false,
  };

  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await axios.post(`auth/registration`, {
      name: this.name,
      surname: this.surname,
      thirdName: this.thirdName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
    });
    console.log(res);

    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }
    return (
      <main className="form-signin">
        <form onSubmit={this.submit}>
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
          <input
            type="text"
            className="form-control my-2 form-control"
            placeholder="Имя"
            required
            onChange={e => (this.name = e.target.value)}
          />
          <input
            type="text"
            className="form-control my-2 form-control"
            placeholder="Фамилия"
            required
            onChange={e => (this.surname = e.target.value)}
          />
          <input
            type="text"
            className="form-control my-2 form-control"
            placeholder="Отчество"
            onChange={e => (this.thirdName = e.target.value)}
          />
          <input
            type="text"
            className="form-control my-2 form-control"
            placeholder="Номер телефона"
            required
            onChange={e => (this.phoneNumber = e.target.value)}
          />
          <input
            type="email"
            className="form-control my-2 form-control"
            placeholder="Почта"
            required
            onChange={e => (this.email = e.target.value)}
          />
          <input
            type="password"
            className="form-control my-2 form-control"
            placeholder="Пароль"
            required
            onChange={e => (this.password = e.target.value)}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Создать аккаунт
          </button>
        </form>
      </main>
    );
  }
}

export default Register;
