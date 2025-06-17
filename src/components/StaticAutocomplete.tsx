import {
  CloseButton,
  Combobox,
  ScrollArea,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useState } from "react";

export default function StaticAutocomplete({
  label,
  placeholder,
  options,
}: {
  label?: string;
  placeholder?: string;
  options: string[];
}) {
  const combobox = useCombobox();
  const [value, setValue] = useState("");

  const shouldFilterOptions = !options.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? options.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase().trim())
      )
    : options;

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          w='25rem'
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          rightSection={
            value !== "" && (
              <CloseButton
                size='sm'
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => setValue("")}
                aria-label='Clear value'
              />
            )
          }
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type='scroll' mah={200}>
            {filteredOptions.length === 0 ? (
              <Combobox.Empty>Aucun résultat</Combobox.Empty>
            ) : (
              filteredOptions.map((item) => (
                <Combobox.Option value={item} key={item}>
                  {item}
                </Combobox.Option>
              ))
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
