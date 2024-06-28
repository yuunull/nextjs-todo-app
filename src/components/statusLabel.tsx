import React from "react";
import styles from "./statusLabel.module.css";

type Props = {
  completed: boolean;
};

export const StatusLabel: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      {props.completed ? "完了" : "未完了"}
    </div>
  );
};
