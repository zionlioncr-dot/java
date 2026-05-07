import { gql } from "@apollo/client";
import client from "../lib/graphql";
import { useState } from "react";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      user {
        id
        username
      }
    }
    users {
      id
      username
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $userId: ID!) {
    createPost(input: { title: $title, content: $content, userId: $userId }) {
      id
      title
      content
      user {
        id
        username
      }
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, input: { title: $title, content: $content }) {
      id
      title
      content
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export default function Posts({ posts, users }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(users[0]?.id || "");
  const [editId, setEditId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      await client.mutate({
        mutation: UPDATE_POST,
        variables: { id: editId, title, content },
      });
    } else {
      await client.mutate({
        mutation: CREATE_POST,
        variables: { title, content, userId },
      });
    }
    window.location.reload();
  }

  async function handleDelete(id) {
    await client.mutate({ mutation: DELETE_POST, variables: { id } });
    window.location.reload();
  }

  function startEdit(p) {
    setEditId(p.id);
    setTitle(p.title);
    setContent(p.content);
    setUserId(p.user?.id || "");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📄 Posts</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> – {p.content}{" "}
            <em>(by {p.user?.username || "?"})</em>{" "}
            <button onClick={() => startEdit(p)}>✏️ Editar</button>{" "}
            <button onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>{editId ? "✏️ Editar post" : "➕ Crear post"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {!editId && (
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>
        )}
        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({ query: GET_POSTS });
  return { props: { posts: data.posts, users: data.users } };
}
