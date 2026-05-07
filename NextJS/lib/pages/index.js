import client from "../lib/graphql";
import { gql } from "@apollo/client";

export default function Home({ message }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 Next.js + GraphQL</h1>
      <p>Respuesta backend: {message}</p>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        hello(input: "NextJS") 
      }
    `,
  });

  return {
    props: {
      message: data.hello,
    },
  };
}
