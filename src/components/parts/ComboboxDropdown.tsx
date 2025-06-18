import { Combobox, ScrollArea, Text } from "@mantine/core";
import { ReactNode } from "react";

export function ComboboxDropdown({
  hidden,
  children,
}: {
  hidden?: boolean;
  children: ReactNode;
}) {
  return (
    <Combobox.Dropdown hidden={hidden}>
      <Combobox.Options>
        <ScrollArea.Autosize type='scroll' mah={200}>
          {children}
        </ScrollArea.Autosize>
      </Combobox.Options>
    </Combobox.Dropdown>
  );
}

export function ComboboxCreateOption({ value }: { value: string }) {
  return (
    <Combobox.Option value='$create'>
      Créer l'option :{" "}
      <Text span fz='inherit' style={{ textDecoration: "underline" }}>
        {value}
      </Text>
    </Combobox.Option>
  );
}
