import { useCallback, useState } from "react";
import styles from "./TodoItem.module.css";

export type TodoItemProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  onDelete: (item: { id: string }) => void;
  onEdit: (
    item: { id: string; title: string } | { id: string; isCompleted: boolean }
  ) => void;
};

export function TodoItem(props: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(props.title);

  const onDelete = useCallback(() => props.onDelete({ id: props.id }), [props]);
  const onTitleEdit = useCallback(() => {
    props.onEdit({ id: props.id, title: draftTitle });
    setIsEditing(false);
  }, [props, draftTitle]);
  const onCompletedToggle = useCallback(
    () => props.onEdit({ id: props.id, isCompleted: !props.isCompleted }),
    [props]
  );

  const isOptimistic = props.id.startsWith("optimistic_");

  return (
    <li className={styles.todoItem}>
      <input
        type="checkbox"
        checked={props.isCompleted}
        onChange={onCompletedToggle}
      />
      {isEditing && !isOptimistic ? (
        <input
          autoFocus
          type="text"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={onTitleEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") onTitleEdit();
          }}
        />
      ) : (
        <label onDoubleClick={() => setIsEditing(true)}>{props.title}</label>
      )}
      <button
        className="delete-button"
        onClick={onDelete}
        disabled={isOptimistic}
      >
        x
      </button>
    </li>
  );
}
