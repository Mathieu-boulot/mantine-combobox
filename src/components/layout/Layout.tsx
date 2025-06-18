import { Flex } from "@mantine/core";
import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <Flex justify='center' align='center' w='100vw' h='100vh'>
      {children}
    </Flex>
  );
}

export function Column({ children }: { children: ReactNode }) {
  return (
    <Flex direction='column' justify='center' align='center' gap='xl'>
      {children}
    </Flex>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return (
    <Flex justify='center' align='center' gap='10rem'>
      {children}
    </Flex>
  );
}
