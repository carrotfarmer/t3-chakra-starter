import { Box, Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { Post as IPost } from "@prisma/client";
import React from "react";
import { api } from "../../utils/api";

interface PostProps {
  post: IPost;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const Post: React.FC<PostProps> = ({ post, setPosts }) => {
  const { mutate: deletePost } = api.post.deletePost.useMutation({
    onSuccess: (data) => {
      setPosts((prev) => (prev.length > 1 ? [...prev.filter((t) => t.id !== data.id)] : []));
    },
  });

  return (
    <Box width="sm" height="28" p="3" color="pink.200" border="2px" borderRadius="lg">
      <HStack>
        <Text fontWeight="bold">{post.name}</Text>
        <Spacer />
        <Button colorScheme="red" size="xs" onClick={() => deletePost({ postId: post.id })}>
          delete
        </Button>
      </HStack>
    </Box>
  );
};
