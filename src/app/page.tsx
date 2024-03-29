import AppHeader from "./ui/organism/AppHeader";

export default async function Home() {
  async function getAllBlogPosts() {
    "use server";
    try {
      const blogPosts = await fetch("http://localhost:3000/api/blog_post", {
        cache: "no-cache",
      }).then((res) => {
        return res.json();
      });

      return blogPosts;
    } catch (error: any) {
      throw new Error(`${error?.message}`);
    }
  }

  const blogPosts = await getAllBlogPosts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppHeader />
    </main>
  );
}
