import React from "react";
import { useSession } from "next-auth/react";

import { Text, Box } from "@chakra-ui/react";
import { CreatePost } from "./posts/CreatePost";

interface MainProps {}

export const Main: React.FC<MainProps> = ({}) => {
  const { data: session } = useSession()

  return (
    <Box pt="5">
      <Text>
        Logged in as: {session!.user.name} - {session!.user.email}
      </Text>
      <Box pt="5">
        <CreatePost />
      </Box>
    </Box>
  );
};