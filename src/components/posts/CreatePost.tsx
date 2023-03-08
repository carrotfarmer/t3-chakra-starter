import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";

import { createPostConstants } from "../../lib/constants";
import { api } from "../../utils/api";

import { Post as IPost } from "@prisma/client";

interface CreatePostProps {
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const CreatePost: React.FC<CreatePostProps> = ({ setPosts }) => {
  const { MIN_LENGTH, MAX_LENGTH } = createPostConstants;

  const createPostSchema = z.object({
    name: z
      .string()
      .min(MIN_LENGTH, { message: "min length is 2 chars" })
      .max(MAX_LENGTH, {
        message: `the maximum length is ${MAX_LENGTH} chars`,
      }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
  });

  const toast = useToast();

  const { mutate: createPost } = api.post.createPost.useMutation({
    onSuccess: (data) => {
      setPosts((prev) => [data, ...prev]);

      toast({
        status: "success",
        title: "created post",
        isClosable: true,
        duration: 5000,
      });
    },

    onError: async (err) => {
      toast({
        status: "error",
        title: "an error occurred",
        description: `something went wrong! please try again!`,
        isClosable: true,
        duration: 5000,
      });
    },
  });

  return (
    <Box>
      <form
        onSubmit={handleSubmit((data) => {
          createPost({ name: data.name });
          console.log(data);
          reset();
        })}
      >
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">post name</FormLabel>
          <Input id="name" placeholder="my first post" {...register("name")} />
          <FormErrorMessage>{errors.name && errors.name.message?.toString()}</FormErrorMessage>
        </FormControl>
        <Box pt="5">
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            type="submit"
            _hover={{
              bg: "pink.300",
            }}
          >
            create
          </Button>
        </Box>
      </form>
    </Box>
  );
};
