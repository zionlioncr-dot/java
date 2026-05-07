import Link from "next/link";
import "../styles.css";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f4f4f4" }}>
        <Link href="/">Home</Link> | <Link href="/users">Usuarios</Link> |{" "}
        <Link href="/posts">Posts</Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
