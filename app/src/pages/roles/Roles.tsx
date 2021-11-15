import React, { useEffect, useState } from "react";
import Wrapper from "../../composnents/Wrapper";
import { Link } from "react-router-dom";
import axios from "axios";
import { Role } from "../../models/role";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("role");
      setRoles(data);
    })();
  }, []);

  const del = async (id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить данную запись?")) return;
    await axios.delete(`role/${id}`);

    setRoles(roles.filter((r: Role) => r.id !== id));
  };

  {
    return (
      <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link to={"/roles/create"} className="btn btn-sm btn-outline-secondary">
            Создать
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Описание</th>
                <th scope="col">Дейтвие</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role: Role) => {
                return (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.value}</td>
                    <td>{role.description}</td>
                    <td>
                      <div className="btn-group mr-2">
                        <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">
                          Изменить
                        </Link>
                        <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(role.id)}>
                          Удалить
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link">
                Назад
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                Вперед
              </a>
            </li>
          </ul>
        </nav>
      </Wrapper>
    );
  }
};

export default Roles;
