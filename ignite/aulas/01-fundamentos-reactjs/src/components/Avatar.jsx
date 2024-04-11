import styles from "./Avatar.module.css";

const unknown = "https://png.pngtree.com/png-vector/20220527/ourlarge/pngtree-unknown-person-icon-avatar-question-png-image_4760937.png"

export function Avatar({hasBorder = true, src=unknown}) {

  // const hasBorder = props.hasBorder != false;

  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt=""
    />
  );
}
