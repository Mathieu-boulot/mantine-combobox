import { Flex } from "@mantine/core";
import { ReactNode } from "react";

export default function Column({ children }: { children: ReactNode }) {
  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      gap='xl'
      h='100vh'
      w='100vw'
    >
      {children}
    </Flex>
  );
}
