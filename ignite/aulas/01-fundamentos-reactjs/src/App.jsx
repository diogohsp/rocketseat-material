import { Post } from "./components/Post";
import { Header } from "./components/header";
import { Sidebar } from "./components/Sidebar";

import "./global.css";
import styles from "./App.module.css";

//author: { avatar_url: "", name:"", role:""}
// publishedAt: date
// content: string

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/Diogohsp.png",
      name: "Diogo HSP",
      role: "Software Developer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content: "Acabei de subir mais um projeto no meu portifa.",
      },
      {
        type: "paragraph",
        content:
          "É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do",
      },
      { type: "paragraph", content: "projeto é DoctorCare 🚀" },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2024-04-10 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/Texeraaa.png",
      name: "Texera",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", content: "Fala rapaziada 👋" },
      {
        type: "paragraph",
        content: "Acabei de subir mais um projeto no meu portifa.",
      },
      {
        type: "paragraph",
        content:
          "É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do",
      },
      { type: "paragraph", content: "projeto é DoctorCare 🚀" },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2024-04-09 20:00:00"),
  },
];

//iteração

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
