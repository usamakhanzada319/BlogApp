import React, { useState, useEffect } from "react";
import appWriteFileService from "../../appwrite/uplodeServices";
import appWritePostService from "../../appwrite/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Container, Button } from "../index";
import { useSelector } from "react-redux";

function Post() {
  const [post, setpost] = useState(null);
  const { slug } = useParams;
  const navigate = useNavigate();
  const userData = useSelector((State) => State.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (slug) {
      appWritePostService.getPost(slug).then((post) => {
        if (post) {
          setpost(post);
        } else {
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appWritePostService.deletePost(post.$id).then((status) => {
      if (status) {
        appWriteFileService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center  mb-4 relative border rounded-xl p-2">
          <img
            src={appWriteFileService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onChange={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
