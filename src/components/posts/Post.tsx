import { Box, Text } from "@chakra-ui/react";
import { Post as IPost } from "@prisma/client";
import React from "react";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Box width="sm" height="28" p="3" color="pink.200" border="2px" borderRadius="lg">
      <Text fontWeight="bold">{post.name}</Text>
    </Box>
  );
};
