import { useActionState, useOptimistic, useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  // reads the pending state of the parent <form>
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving...' : 'Add todo'}</button>;
}

// fake backend
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function FormActionsExample() {
  const [todos, setTodos] = useState(['Learn React']);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (current, newTodo) => [...current, `${newTodo} (saving...)`]
  );

  async function addTodoAction(prevState, formData) {
    const title = formData.get('title')?.toString().trim();
    if (!title || title.length < 3) {
      return { error: 'Title must be at least 3 characters.', title };
    }
    addOptimisticTodo(title); // show immediately
    await wait(1000); // pretend to call a server
    setTodos((cur) => [...cur, title]);
    return { error: null, title: '' };
  }

  const [state, formAction] = useActionState(addTodoAction, {
    error: null,
    title: '',
  });

  return (
    <section>
      <h2>09 - Form Actions</h2>
      <form action={formAction}>
        <input name="title" defaultValue={state.title} placeholder="New todo" />
        <SubmitButton />
        {state.error && <p style={{ color: 'crimson' }}>{state.error}</p>}
      </form>
      <ul>
        {optimisticTodos.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </section>
  );
}
