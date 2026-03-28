import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { Input, Button, Select, RTE } from "../index";
import appWriteFileService from "../../appwrite/uplodeServices";
import appWritePostService from "../../appwrite/config";

export default function PostForm({ post }) {
  const navigate = useNavigate();

  const { handleSubmit, control, register, setValue, getValues, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.id || "",
        status: post?.status || "active",
      },
    });
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appWriteFileService.uplodeFile(data.image[0])
        : null;

      if (file) {
        appWriteFileService.deleteFile(post.featuredImage);
      }

      const dbpost = await appWritePostService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.id : undefined,
      });
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = await appWriteFileService.uplodeFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appWritePostService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransfrom = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subcription = watch((value, { name }) => {
      if (name === "title") {
        setValue(
          "slug",
          slugTransfrom(value.title, {
            shouldValidate: true,
          }),
        );
      }
    });

    return () => {
      subcription.unsubscribe();
    };
  }, [watch, setValue, slugTransfrom]); // ye interview ka question h

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          OnInput={(e) => {
            setValue("slug", slugTransfrom(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name=" content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png , image/jpg , image/jpeg , image/gif "
          {...register("image", {
            required: !post,
          })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={appWriteFileService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
