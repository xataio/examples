import React from "react";
import styles from "./Card.module.css";

export const Card = (props: React.AllHTMLAttributes<HTMLDivElement>) => (
  <div {...props} className={styles.card} />
);
