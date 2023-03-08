import React from "react";
import { useSession } from "next-auth/react";

import { Text, Box, Center, Spinner } from "@chakra-ui/react";
import { CreatePost } from "./posts/CreatePost";
import { api } from "../utils/api";
import { Post as IPost } from "@prisma/client";
import { Post } from "./posts/Post";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const [posts, setPosts] = React.useState<IPost[]>([]);

  const { data: session } = useSession();

  const { data: postsData, isLoading, isFetching } = api.post.getPosts.useQuery();

  if (isLoading && isFetching) {
    return (
      <Center pt="10">
        <Spinner />
      </Center>
    );
  }

  if (posts.length === 0 && postsData && postsData!.length > 0) {
    setPosts(postsData);
  }

  return (
    <Box pt="5">
      <Text>
        Logged in as: {session!.user.name} - {session!.user.email}
      </Text>
      <Box pt="5">
        <CreatePost setPosts={setPosts} />
      </Box>
      <Box pt="5">
        <Box>
          {posts.map((post) => (
            <Box pt="5">
              <Post post={post} posts={posts} setPosts={setPosts} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
