import React from "react";

export function TodoList({ children }: React.PropsWithChildren) {
  return <ul>{children}</ul>;
}
