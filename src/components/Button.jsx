import styles from "./Button.module.css";

export default function Button({ children, type, onClick }) {
  return (
    <button className={`${styles[type]} ${styles.btn}`} onClick={onClick}>
      {children}
    </button>
  );
}
