import React from "react";

function App() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));

    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <div className="App">
      {console.log(posts)}
      <header className="App-header">Server Rendered React App</header>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
