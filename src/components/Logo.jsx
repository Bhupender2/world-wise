import { useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {

  const navigate=useNavigate()
  return <>
    <img src="/logo.png" alt="WorldWise logo" className={styles.logo} onClick={()=>navigate("/")}/>
    <img src="/icon.png" alt="WorldWise logo" className={styles.logo_icon} onClick={()=>navigate("/")}/>
  </>;
}

export default Logo;
