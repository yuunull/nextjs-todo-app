import React from "react";
import styles from "./statusLabel.module.css";

type Props = {
  completed: boolean;
};

export const StatusLabel: React.FC<Props> = (props) => {
  return (
    <div className={styles.container}>
      {props.completed ? (
        <div className={styles.done}>完了</div>
      ) : (
        <div className={styles.unDone}>未完了</div>
      )}
    </div>
  );
};
