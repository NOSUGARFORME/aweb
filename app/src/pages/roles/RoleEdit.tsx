import React, { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../composnents/Wrapper";
import axios from "axios";
import { Redirect } from "react-router";

const RoleEdit = (props: any) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`role/${props.match.params.id}`);

      setValue(data.value);
      setDescription(data.description);
    })();
  }, []);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`role/${props.match.params.id}`, {
      value,
      description,
    });

    setRedirect(true);
  };

  if (redirect) return <Redirect to={"/roles"} />;

  return (
    <Wrapper>
      <form className="mt-5" onSubmit={submit}>
        <div className="mb-3">
          <label>Название</label>
          <input type="text" className="form-control" defaultValue={value} onChange={e => setValue(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Описание</label>
          <input type="text" className="form-control" defaultValue={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <button className="btn btn-outline-secondary">Сохранить</button>
      </form>
    </Wrapper>
  );
};

export default RoleEdit;
