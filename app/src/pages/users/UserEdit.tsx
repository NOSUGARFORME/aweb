import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../composnents/Wrapper";
import axios from "axios";
import { Role } from "../../models/role";
import { Redirect } from "react-router";

const UserEdit = (props: any) => {
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await axios.get("role");
      setRoles(response.data);

      const { data } = await axios.get(`user/${props.match.params.id}`);

      setName(data.name);
      setSurName(data.surname);
      setThirdName(data.thirdName);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setPassword(data.password);
      setRoleId(data.role.id);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`user/${props.match.params.id}`, {
      name,
      surname,
      thirdName,
      phoneNumber,
      email,
      password,
      roleId,
    });

    setRedirect(true);
  };

  if (redirect) return <Redirect to={"/users"} />;

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Имя</label>
          <input type="text" className="form-control" defaultValue={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Фамилия</label>
          <input type="text" className="form-control" defaultValue={surname} onChange={e => setSurName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Отчество</label>
          <input type="text" className="form-control" defaultValue={thirdName} onChange={e => setThirdName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Номер телефона</label>
          <input type="text" className="form-control" defaultValue={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Почта</label>
          <input type="text" className="form-control" defaultValue={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Пароль</label>
          <input type="text" className="form-control" defaultValue={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Роль</label>
          <select className="form-control" value={roleId} onChange={e => setRoleId(e.target.value)}>
            {roles.map((r: Role) => {
              return (
                <option key={r.id} value="r.id">
                  {r.value}
                </option>
              );
            })}
          </select>

          <button className="btn btn-outline-secondary">Сохранить</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserEdit;
