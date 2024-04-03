import { Post } from "./Post";
import { Header } from "./components/header";
import { Sidebar } from "./components/Sidebar";

import "./global.css";
import styles from './App.module.css';

export function App() {
  return (
    <div>
      <Header/>
      
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
        <Post author="Diego NSC" content="Demoro mano" />
        <Post
          author="Igor"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint ab temporibus distinctio earum veritatis? Recusandae ipsam possimus mollitia illo ut placeat non obcaecati, nam cumque ab harum vero iure tenetur."
        />
        </main>
      </div>
    </div>
  );
}
