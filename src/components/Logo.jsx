import styles from "./Logo.module.css";

function Logo() {
  return <>
    <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    <img src="/icon.png" alt="WorldWise logo" className={styles.logo_icon} />
  </>;
}

export default Logo;
