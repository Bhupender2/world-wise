import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const [showLogo, setShowLogo] = useState(false);
  useEffect(() => {
    function checkScreenWidth() {
      setShowLogo(window.innerWidth <= 1000);
    }
    checkScreenWidth(); // to set the state based on the window width

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <div className={styles.sidebar}>
      {!showLogo ? <Logo /> : <div style={{ height: "22px" }}></div>}
      <AppNav />
      <Outlet />{" "}
      {/*this is where the nested Routes component will render and outlet is a built it comp of react-router-dom it render the nested routes components*/}
      <Footer />
    </div>
  );
}
