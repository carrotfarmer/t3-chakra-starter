import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FormErrorMessage, FormLabel, FormControl, Input, Button, Box } from "@chakra-ui/react";

import { createPostConstants } from "../../lib/constants";

interface CreatePostProps {}

export const CreatePost: React.FC<CreatePostProps> = ({}) => {
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPostSchema),
  });

  return (
    <Box>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
