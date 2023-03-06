import React from "react";

import { useForm } from "react-hook-form";
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Box } from "@chakra-ui/react";

interface CreatePostProps {}

export const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <Box>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <FormControl isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">post name</FormLabel>
          <Input
            id="name"
            placeholder="my first post"
            {...register("name", {
              required: "a name is required",
              minLength: { value: 2, message: "min length is 2 chars" },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message?.toString()}</FormErrorMessage>
        </FormControl>
        <Box pt="5">
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"#"}
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
