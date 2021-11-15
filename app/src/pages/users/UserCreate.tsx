import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../composnents/Wrapper";
import axios from "axios";
import { Role } from "../../models/role";
import { Redirect } from "react-router";

const UserCreate = () => {
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("1");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("role");
      setRoles(data);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log(roleId);

    await axios.post("user/register", {
      name,
      surname,
      thirdName,
      phoneNumber,
      email,
      password,
      roleId: Number(roleId),
    });

    setRedirect(true);
  };

  if (redirect) return <Redirect to={"/users"} />;

  return (
    <Wrapper>
      <form className="mt-5" onSubmit={submit}>
        <div className="mb-3">
          <label>Имя</label>
          <input type="text" className="form-control" onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Фамилия</label>
          <input type="text" className="form-control" onChange={e => setSurName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Отчество</label>
          <input type="text" className="form-control" onChange={e => setThirdName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Номер телефона</label>
          <input type="text" className="form-control" onChange={e => setPhoneNumber(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Почта</label>
          <input type="text" className="form-control" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Пароль</label>
          <input type="text" className="form-control" onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Роль</label>
          <select className="form-control" value={roleId} onChange={e => setRoleId(e.target.value)}>
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value={r.id}>
                  {r.value}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-secondary">Сохранить</button>
      </form>
    </Wrapper>
  );
};

export default UserCreate;
