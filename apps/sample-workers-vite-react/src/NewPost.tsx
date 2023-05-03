import { useEffect, useState } from "react";
import "./App.css";
import { xataWorker } from "./xata";

function NewPost() {
  const [postText, setPostText] = useState("");
  const [title, setTitle] = useState("");
  const [labels, setLabels] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [loading, setLoading] = useState(false);
  const newPost = xataWorker("newPost", async ({ xata },
    title: string,
    labels: string,
    slug: string,
    text: string,
    author: string,
  ) => {
    const record = await xata.db.Posts.create({
      title: title,
      labels: labels.split(" "),
      slug: slug,
      text: text,
      author: author,
      createdAt: new Date(),
      views: 0,
    });
    return record;
  });
  const getAuthors = xataWorker("getAuthors", async ({ xata }) => {
    const records = await xata.db.Users.select(["id"]).getAll();
    return records;
  });
  useEffect(() => {
    if (author.length > 0) {
      return;
    }
    getAuthors().then((records) => {
      for (let i of records) {
        setAuthor(author => [...author, i.id]);

      }
    });
  }, [
    author,
    getAuthors,
  ]);
  return (
    <div>
      <h2>Create a new post</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="labels">Labels (separated by spaces):</label>
        <input
          type="text"
          id="labels"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="slug">Slug:</label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <select
          id="author"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          {author.map((author, index) => (
            <option key={index} value={author}>
              {author.charAt(0).toUpperCase() + author.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        rows={15}
        style={{ width: "100%", fontSize: "20px" }}
      />
      <button
        disabled={loading}
        onClick={() => {
          if (title === "") {
            alert("Title is required");
            return;
          }
          if (labels === "") {
            alert("Labels are required");
            return;
          }
          if (slug === "") {
            alert("Slug is required");
            return;
          }
          if (postText === "") {
            alert("Post text is required");
            return;
          }
          if (selectedAuthor === "") {
            alert("Author is required");
            return;
          }
          setLoading(true);
          newPost(
            title,
            labels,
            slug,
            postText,
            selectedAuthor
          ).then((record) => {
            alert("Post created!");
            setPostText("");
            setTitle("");
            setLabels("");
            setSlug("");
            setSelectedAuthor("");
            setLoading(false);
          });
        }}
        style={{ width: "100%", fontSize: "20px", padding: "15px" }}
      >
        Create Post
      </button>
    </div>
  );
}

export default NewPost;
