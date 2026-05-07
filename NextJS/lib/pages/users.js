import { gql } from "@apollo/client";
import client from "../lib/graphql";
import { useState } from "react";

const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!) {
    createUser(input: { username: $username, email: $email }) {
      id
      username
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String, $email: String) {
    updateUser(id: $id, input: { username: $username, email: $email }) {
      id
      username
      email
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export default function Users({ users }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      await client.mutate({
        mutation: UPDATE_USER,
        variables: { id: editId, username, email },
      });
    } else {
      await client.mutate({
        mutation: CREATE_USER,
        variables: { username, email },
      });
    }
    window.location.reload();
  }

  async function handleDelete(id) {
    await client.mutate({ mutation: DELETE_USER, variables: { id } });
    window.location.reload();
  }

  function startEdit(u) {
    setEditId(u.id);
    setUsername(u.username);
    setEmail(u.email);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👤 Usuarios</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} – {u.email}{" "}
            <button onClick={() => startEdit(u)}>✏️ Editar</button>{" "}
            <button onClick={() => handleDelete(u.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>{editId ? "✏️ Editar usuario" : "➕ Crear usuario"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({ query: GET_USERS });
  return { props: { users: data.users } };
}
