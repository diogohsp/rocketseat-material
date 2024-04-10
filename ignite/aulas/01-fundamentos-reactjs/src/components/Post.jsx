import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            src="https://avatars.githubusercontent.com/u/126338371?v=4"
            alt="img-avatar"
          />
          <div className={styles.authorInfo}>
            <strong>Diogo HSP</strong>
            <span>Web Developer</span>
          </div>
        </div>
        <time title="10 de Abril às 12:13 " dateTime="2023-10-04 12:13:30">
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Acabei de subir mais um projeto no meu portifa. </p>
        <p>Fala galeraa 👋 </p>
        <p>
          É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do
          projeto é DoctorCare 🚀{" "}
        </p>
        <p>
          👉 <a href="#">jane.design/doctorcare</a>
        </p>
        <p>
          <a href="#">#novoprojeto #nlw #rocketseat</a>
        </p>
      </div>
    </article>
  );
}
