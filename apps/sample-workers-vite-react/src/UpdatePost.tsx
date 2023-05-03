import { useEffect, useState } from "react";
import "./App.css";
import { xataWorker } from "./xata";

function UpdatePost() {
  const [loading, setLoading] = useState(false);
  const [allPostsTitle, setAllPostsTitle] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedPostTitle, setSelectedPostTitle] = useState("");
  const [selectedPostLabels, setSelectedPostLabels] = useState<string[]>([]);
  const [selectedPostSlug, setSelectedPostSlug] = useState("");
  const [selectedPostText, setSelectedPostText] = useState("");
  const [postID, setPostID] = useState("")
  const getPosts = xataWorker("getPosts", async ({ xata }, page?: number) => {
    const records = await xata.db.Posts.select(["title"]).getAll();
    return records;
  });

  const getPostData = xataWorker("getPostData", async ({ xata }, title: string) => {
    const records = await xata.db.Posts.filter(
      "title",
      "🇬🇭 Streamlined extraneous Nissan Clothing of East"
    )
      .select(["id", "title", "labels", "slug", "text"])
      .getAll();
    return records;
  });
  const updatePost = xataWorker("updatePost", async ({ xata },
    title: string,
    labels: string,
    slug: string,
    text: string,
    id: string,
  ) => {
    const record = await xata.db.Posts.update(id, {
      title: title,
      labels: labels.split(" "),
      slug: slug,
      text: text,
    });
    return record;
  });
  useEffect(() => {
    if (allPostsTitle.length > 0) {
      return;
    }
    getPosts().then((records) => {
      for (let i of records) {
        if (allPostsTitle.includes(i.title!)) {
          continue;
        }
        const title = i.title!;
        setAllPostsTitle(allPostsTitle => [...allPostsTitle, title]);

      }
    });
  }, [
    allPostsTitle,
    getPosts,
  ]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTitle(e.target.value)
    getPostData(e.target.value).then((records) => {
      setSelectedPostTitle(records[0].title!);
      setSelectedPostLabels(records[0].labels!);
      setSelectedPostSlug(records[0].slug!);
      setSelectedPostText(records[0].text!);
      setPostID(records[0].id);
    });
  }
  return (
    <div>
      <h2>
        Update a post
      </h2>
      {allPostsTitle.length > 0 ? (<>
        {selectedTitle === "" && (
          <div>
            <label htmlFor="title">
              Select the title of the post you want to update:
            </label>
            <br />
            <select
              id="title"
              value={selectedTitle}
              onChange={(e) => handleTitleChange(e)}
            >
              {allPostsTitle.map((title, index) => (
                <option key={index} value={title}>
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {(selectedTitle !== "") && (
          <>
            <div>
              <div>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                  type="text"
                  id="title"
                  value={selectedPostTitle}
                  onChange={(e) => setSelectedPostTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="labels">Labels:</label>
                <br />
                <input
                  type="text"
                  id="labels"
                  value={selectedPostLabels}
                  onChange={(e) => setSelectedPostLabels(e.target.value.split(","))}
                />
              </div>

              <div>
                <label htmlFor="slug">Slug:</label>
                <br />
                <input
                  type="text"
                  id="slug"
                  value={selectedPostSlug}
                  onChange={(e) => setSelectedPostSlug(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="text">Text:</label>
                <br />
                <textarea
                  id="text"
                  value={selectedPostText}
                  onChange={(e) => setSelectedPostText(e.target.value)}
                  rows={15}
                  style={{ width: "100%", fontSize: "20px" }}
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                style={{ width: "100%", fontSize: "20px", padding: "15px" }}
                onClick={() => {
                  setLoading(true);
                  updatePost(
                    selectedPostTitle,
                    selectedPostLabels.join(" "),
                    selectedPostSlug,
                    selectedPostText,
                    postID
                  ).then((record) => {
                    alert("Post updated successfully");
                    setLoading(false);
                    window.location.href = "/";
                  });
                }}
              >
                Update Post
              </button>
            </div>

          </>
        )}</>) : (<>Loading</>)}
    </div>
  );
}

export default UpdatePost;
