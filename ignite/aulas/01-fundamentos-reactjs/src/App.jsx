import { Post } from "./Post";
import { Header } from "./components/header";

import "./styles.css";

export function App() {
  return (
    <div>
      <Header/>
      <Post author="Diego NSC" content="Demoro mano" />
      <Post
        author="Igor"
        content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint ab temporibus distinctio earum veritatis? Recusandae ipsam possimus mollitia illo ut placeat non obcaecati, nam cumque ab harum vero iure tenetur."
      />
    </div>
  );
}
