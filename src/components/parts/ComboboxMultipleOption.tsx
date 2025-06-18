import { CheckIcon, Combobox, Group, Text } from "@mantine/core";

export default function ComboboxMultipleOption({
  item,
  selectedItems,
}: {
  item: string;
  selectedItems: string[];
}) {
  return (
    <Combobox.Option
      key={item}
      value={item}
      active={selectedItems.includes(item)}
    >
      <Group gap='sm'>
        {selectedItems.includes(item) && <CheckIcon size={12} />}
        <Text span fz='inherit'>
          {item}
        </Text>
      </Group>
    </Combobox.Option>
  );
}
