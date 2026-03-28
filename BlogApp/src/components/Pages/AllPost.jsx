import React, { useState, useEffect } from "react";
import { PostCard, Container } from "../index";
import appWriteService from "../../appwrite/config";

function AllPost() {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    appWriteService
      .getPosts([]) // for all posts
      .then((Posts) => {
        if (Posts) {
          setPosts(Posts.documents);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);
  return (
    <div className="py-8 w-full">
      <Container>
        <div className="felx flex-wrap">
          {Posts.map((post) => {
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
