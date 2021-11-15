import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../../composnents/Wrapper";
import axios from "axios";
import { User } from "../../models/user";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`user?page=${page}`);
      setUsers(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page]);

  const next = () => {
    if (page < lastPage) setPage(page + 1);
  };

  const prev = () => {
    if (page > 1) setPage(page - 1);
  };

  const del = async (id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить данную запись?")) return;
    await axios.delete(`user/${id}`);

    setUsers(users.filter((user: User) => user.id !== id));
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to={"/users/create"} className="btn btn-sm btn-outline-secondary">
          Создать
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Имя</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Телефон</th>
              <th scope="col">Роль</th>
              <th scope="col">Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.role.value}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-outline-secondary">
                        Изменить
                      </Link>
                      <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => del(user.id)}>
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
            <a href="#" className="page-link" onClick={prev}>
              Назад
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link" onClick={next}>
              Вперед
            </a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Users;
