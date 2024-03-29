import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet/>   {/*this is where the nested Routes component will render and outlet is a built it comp of react-router-dom it render the nested routes components*/}
      <Footer />
    </div>
  );
}
