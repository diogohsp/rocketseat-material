export function Post(props) {
  console.log(props);
  return (
    <>
      <strong><p>{props.author}</p></strong>
      <p>{props.content}</p>
    </>
  );
}
