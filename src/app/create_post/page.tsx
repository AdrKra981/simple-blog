import { FunctionComponent } from "react";
import AppHeader from "../ui/organism/AppHeader";
import PostForm from "../ui/organism/PostForm";
import { PostFormValues } from "../types/BlogPost";
import { fetchRequest } from "../../../helpers/request";

interface CreatePostProps {}

const CreatePost: FunctionComponent<CreatePostProps> = () => {
  const handleSubmit = async (values: PostFormValues) => {
    "use server";
    await fetchRequest({
      endpoint: "blog_post",
      method: "POST",
      data: values,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppHeader />
      <div
        className="flex flex-col justify-center items-center w-[97.3%] min-h-full bg-white px-24 border-gray-400"
        style={{
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <h1 className="text-3xl my-8">Create Post</h1>
        <PostForm handleSubmit={handleSubmit} />
      </div>
    </main>
  );
};

export default CreatePost;
