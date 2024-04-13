import { useEffect, useState } from "react";
import usePosts from "./redux/postActions";
import { useQuery } from "@apollo/client";
import { getAllPost } from "./graphQl/query";

function App() {
  const { getFetchPost, addPost, deletePosts, updatePost, postsData, loading, error } = usePosts();
  
  const { refetch } = useQuery(getAllPost)

  const [postDatadb, setPostDataDB] = useState([])
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updationId, setUpdationId] = useState(null);


  const handleAddPost = async (e) => {
    e.preventDefault();
    const payload = { title, description }
    if (title && description) {
      const response = await addPost(payload)
      if (response) {
        refetch()
      }
      if (!error) {
        console.log("success")
        await getFetchPost()
      } else {
        console.log(error)
      }
    } else {
      alert("enter something ")
    }
  };

  const handleDeletePost = async (id) => {
    const payload = { id }
    deletePosts(payload)
    refetch()
  };

  const handleUpdatePost = (data) => {
    setIsUpdate(true);
    setUpdationId(data.id);
    setTitle(data.title);
    setDescription(data.description);
  };

  const handleUpdate = async () => {
    const payload = {
      id: updationId,
      title,
      description,
    }
    updatePost(payload)
    setIsUpdate(false);
    await refetch();
  };

  useEffect(() => {
    if (postsData) {
      setPostDataDB(postsData)
    }
  }, [postsData]);

  useEffect(() => {
    getFetchPost()
  }, []);

  console.log(usePosts());


  return (
    <>
      <form>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter the title"
        />
        <input
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter the Description"
        />
        <button type="submit" onClick={(e) => handleAddPost(e)}>Add Post </button>
      </form>

      <div style={{ border: "1px solid red", marginTop: "20px" }}>
        {/* {loading ? <h2>Loading...</h2> : */}
        <section>
          {postDatadb?.getPosts?.map((data) =>
            !(isUpdate && data.id === updationId) ? (
              <div key={data.id}>
                <h1> data-title : {data.title} </h1>
                <h1> Data-Description : {data.description} </h1>
                <button
                  onClick={() => {
                    handleDeletePost(data.id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleUpdatePost(data);
                  }}
                >
                  Update
                </button>
                <br />
              </div>
            ) : (
              <aside>
                <input
                  type="text"
                  defaultValue={data.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <input
                  type="text"
                  defaultValue={data.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <button onClick={handleUpdate}>Update</button>
              </aside>
            )
          )}
        </section>
        {/* } */}
      </div>
    </>
  );
}

export default App;
