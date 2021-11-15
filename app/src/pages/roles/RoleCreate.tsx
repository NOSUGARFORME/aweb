import React, { SyntheticEvent, useState } from "react";
import Wrapper from "../../composnents/Wrapper";
import axios from "axios";
import { Redirect } from "react-router";

const RoleCreate = () => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("role", {
      value,
      description,
    });

    setRedirect(true);
  };

  if (redirect) return <Redirect to={"/roles"} />;

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Название</label>
          <input type="text" className="form-control" onChange={e => setValue(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Описание</label>
          <input type="text" className="form-control" onChange={e => setDescription(e.target.value)} />
        </div>
      </form>
    </Wrapper>
  );
};

export default RoleCreate;
