import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../index";
import appWriteService from "../../appwrite/config";

function Home() {
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    appWriteService
      .getPosts()
      .then((res) => {
        if (res && res.documents) {
          setPosts(res.documents);
        }
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (Posts.length === 0) {
    return (
      <div className="w-full py-8 text-center mt-4">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover: text-gray-500">
                Login to to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {Posts.map((post) => {
            <div post={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
