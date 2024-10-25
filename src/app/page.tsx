import React from "react";
import styles from "./page.module.css";
import CopyrightFooter from "@/components/CopyrightFooter";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar isAuthenticated={false} />
      <main className={styles.main}>main</main>
      <CopyrightFooter />
    </div>
  );
}
