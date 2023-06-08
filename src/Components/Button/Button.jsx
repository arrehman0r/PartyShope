import React from "react";
import styles from  './styles.module.scss';

export const Button = ({ title, onClick, className }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};