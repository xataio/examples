import { useCallback, useState } from "react";
import styles from "./AddTodo.module.css";

export type AddTodoProps = {
  onAdd: (payload: { title: string }) => void;
};

export function AddTodo(props: AddTodoProps) {
  const [title, setTitle] = useState("");
  const onAdd = useCallback(() => {
    props.onAdd({ title });
    setTitle("");
  }, [props, setTitle, title]);

  return (
    <input
      className={styles.addTodo}
      type="text"
      placeholder="What needs to be done?"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onAdd();
        }
      }}
    />
  );
}
