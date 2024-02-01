"use client";
import { BlogPost } from "@/app/types/BlogPost";
import { Box, List, ListItem, ListItemText, Paper } from "@mui/material";
import { FunctionComponent } from "react";
import Button from "../atoms/Button";
import Link from "next/link";

interface BlogTableProps {
  blogPosts: BlogPost[];
}

const BlogTable: FunctionComponent<BlogTableProps> = ({ blogPosts }) => {
  return (
    <div
      className="flex flex-col w-[97.3%] min-h-full bg-white px-24 border-gray-400"
      style={{
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
      }}
    >
      <h1>Blog List</h1>
      <Button>
        <Link
          href="/create_post"
          className="flex items-center justify-center text-gray-500 mt-2"
        >
          Create Post
        </Link>
      </Button>
      <Box sx={{ minWidth: 900, width: "100%" }} component={Paper}>
        <List>
          {blogPosts.map((item: BlogPost) => {
            return (
              <ListItem key={`posts_list_${item._id}`}>
                <ListItemText>{item.author}</ListItemText>
                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </div>
  );
};

export default BlogTable;
