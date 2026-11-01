import { useMemo } from 'react';
import {
  createMemoryRouter,
  Form,
  Link,
  Outlet,
  redirect,
  RouterProvider,
  useLoaderData,
  useNavigation,
} from 'react-router';

// fake in-memory "database"
const posts = [
  { id: '1', title: 'Hello router', body: 'Loaders fetch data before render.' },
  { id: '2', title: 'Second post', body: 'Actions handle form submissions.' },
];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function postsLoader() {
  await wait(300);
  return posts;
}

async function postLoader({ params }) {
  await wait(300);
  const post = posts.find((p) => p.id === params.postId);
  if (!post) throw new Response('Not found', { status: 404 });
  return post;
}

async function newPostAction({ request }) {
  const form = await request.formData();
  posts.push({
    id: String(posts.length + 1),
    title: form.get('title'),
    body: form.get('body'),
  });
  return redirect('/');
}

function Root() {
  const navigation = useNavigation();
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Posts</Link>
        <Link to="/new">New post</Link>
        {navigation.state !== 'idle' && <em>loading...</em>}
      </nav>
      <hr />
      <Outlet />
    </>
  );
}

function PostList() {
  const list = useLoaderData();
  return (
    <ul>
      {list.map((p) => (
        <li key={p.id}>
          <Link to={`/posts/${p.id}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}

function PostDetail() {
  const post = useLoaderData();
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </article>
  );
}

function NewPost() {
  const navigation = useNavigation();
  return (
    <Form method="post">
      <input name="title" placeholder="Title" required />
      <input name="body" placeholder="Body" required />
      <button disabled={navigation.state === 'submitting'}>Save</button>
    </Form>
  );
}

function ErrorPage() {
  return <p>Something went wrong (or the post doesn't exist).</p>;
}

export default function RoutingDataExample() {
  // create once; real apps use createBrowserRouter at module level
  const router = useMemo(
    () =>
      createMemoryRouter([
        {
          path: '/',
          element: <Root />,
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <PostList />, loader: postsLoader },
            { path: 'posts/:postId', element: <PostDetail />, loader: postLoader },
            { path: 'new', element: <NewPost />, action: newPostAction },
          ],
        },
      ]),
    []
  );

  return (
    <section>
      <h2>14 - Routing with Data (loaders &amp; actions)</h2>
      <RouterProvider router={router} />
    </section>
  );
}
