import { ComboboxDropdown } from "./parts/ComboboxDropdown";
import { ComboboxSimpleProps, StaticComboboxProps } from "../core/Combobox";
import { Combobox, useCombobox } from "@mantine/core";
import ComboboxInput from "./parts/ComboboxInput";

export default function StaticAutocomplete({
  label,
  placeholder = label,
  selectedItem,
  error,
  isRequired,
  options,
  onChange,
}: ComboboxSimpleProps & StaticComboboxProps) {
  const combobox = useCombobox();

  const shouldFilterOptions = !options.some((item) => item === selectedItem);
  const filteredOptions = shouldFilterOptions
    ? options.filter((item) =>
        item.toLowerCase().includes(selectedItem.toLowerCase().trim())
      )
    : options;

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(optionValue) => {
        onChange(optionValue);
        combobox.closeDropdown();
      }}
    >
      <ComboboxInput
        label={label}
        placeholder={placeholder}
        selectedItem={selectedItem}
        onChange={onChange}
        store={combobox}
        error={error}
        isRequired={isRequired}
      />
      <ComboboxDropdown>
        {filteredOptions.length === 0 ? (
          <Combobox.Empty>Aucun résultat</Combobox.Empty>
        ) : (
          filteredOptions.map((item) => (
            <Combobox.Option value={item} key={item}>
              {item}
            </Combobox.Option>
          ))
        )}
      </ComboboxDropdown>
    </Combobox>
  );
}
