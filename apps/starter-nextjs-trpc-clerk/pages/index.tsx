import Head from "next/head";
import { SignedIn, SignedOut, SignOutButton, useAuth } from "@clerk/nextjs";

import { RouterOutputs, trpc } from "../utils/trpc";
import { AddTodo } from "../components/AddTodo/AddTodo";
import { TodoItem } from "../components/TodoItem/TodoItem";
import { Card } from "../components/Card/Card";
import { Welcome } from "../components/Welcome/Welcome";

export default function Home() {
  const utils = trpc.useContext();
  const { isSignedIn } = useAuth();

  const { data: todos } = trpc.todo.list.useQuery(undefined, {
    enabled: isSignedIn,
  });

  const { mutate: addTodo } = trpc.todo.add.useMutation({
    onMutate: async (newTodo) => {
      await utils.todo.list.cancel();

      const previousTodos = await utils.todo.list.getData();

      const optimisticTodo: RouterOutputs["todo"]["list"][-1] = {
        title: newTodo.title,
        createdAt: new Date().toISOString(),
        userId: "me",
        id: "optimistic_" + self.crypto.randomUUID(),
        isCompleted: false,
      };
      utils.todo.list.setData(undefined, (old) =>
        old ? [...old, optimisticTodo] : [optimisticTodo]
      );

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      utils.todo.list.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });

  const { mutate: deleteTodo } = trpc.todo.delete.useMutation({
    onMutate: async (deletedTodo) => {
      await utils.todo.list.cancel();

      const previousTodos = await utils.todo.list.getData();

      utils.todo.list.setData(undefined, (old) =>
        old ? old.filter((i) => i.id !== deletedTodo.id) : []
      );

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      utils.todo.list.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });

  const { mutate: updateTodo } = trpc.todo.update.useMutation({
    onMutate: async (updatedTodo) => {
      await utils.todo.list.cancel();

      const previousTodos = await utils.todo.list.getData();
      utils.todo.list.setData(undefined, (old) =>
        old
          ? old.map((i) =>
              i.id === updatedTodo.id ? { ...i, ...updatedTodo } : i
            )
          : []
      );

      return { previousTodos };
    },
    onError: (_err, _newTodo, context) => {
      utils.todo.list.setData(undefined, context?.previousTodos);
    },
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });

  return (
    <>
      <Head>
        <title>Xata & Clerk starter</title>
        <meta name="description" content="Xata & Clerk starter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignedIn>
        <Card>
          <header>
            <h1>Todos</h1>
          </header>
          <section>
            <ul>
              {todos?.map((todo) => (
                <TodoItem
                  id={todo.id}
                  key={todo.id}
                  title={todo.title}
                  isCompleted={todo.isCompleted}
                  onDelete={deleteTodo}
                  onEdit={updateTodo}
                />
              ))}
            </ul>
          </section>
          <section>
            <AddTodo onAdd={addTodo} />
          </section>
          <footer>
            <p>Double-click to edit a todo - Press Enter to validate</p>
            <SignOutButton />
          </footer>
        </Card>
      </SignedIn>
      <SignedOut>
        <Card>
          <header>
            <h1>Todos</h1>
          </header>
          <Welcome />
        </Card>
      </SignedOut>
    </>
  );
}
