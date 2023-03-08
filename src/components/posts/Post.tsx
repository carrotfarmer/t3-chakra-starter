import { Box, Button, HStack, Spacer, Text, useToast } from "@chakra-ui/react";
import { Post as IPost } from "@prisma/client";
import React from "react";
import { api } from "../../utils/api";

interface PostProps {
  post: IPost;
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const Post: React.FC<PostProps> = ({ post, posts, setPosts }) => {
  const toast = useToast();

  const { mutate: deletePost } = api.post.deletePost.useMutation({
    onSuccess: (data) => {
      setPosts((prev) => (prev.length > 1 ? [...prev.filter((t) => t.id !== data.id)] : []));

      toast({
        status: "success",
        title: "deleted post",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Box width="sm" height="28" p="3" color="pink.200" border="2px" borderRadius="lg">
      <HStack>
        <Text fontWeight="bold">{post.name}</Text>
        <Spacer />
        <Button
          colorScheme="red"
          size="xs"
          onClick={() => {
            deletePost({ postId: post.id });

            if (posts.length === 0) {
              window.location.reload();
            }
          }}
        >
          delete
        </Button>
      </HStack>
    </Box>
  );
};
