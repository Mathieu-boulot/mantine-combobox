import { ComboboxDropdown } from "./parts/ComboboxDropdown";
import { Combobox, useCombobox } from "@mantine/core";
import ComboboxInput from "./parts/ComboboxInput";
import { ComboboxProps } from "../core/Combobox";

type StaticAutocompleteProps = ComboboxProps & { options: string[] };

export default function StaticAutocomplete({
  label,
  placeholder = label,
  selectedOption,
  error,
  isRequired,
  options,
  onChange,
}: StaticAutocompleteProps) {
  const combobox = useCombobox();

  const shouldFilterOptions = !options.some((item) => item === selectedOption);
  const filteredOptions = shouldFilterOptions
    ? options.filter((item) =>
        item.toLowerCase().includes(selectedOption.toLowerCase().trim())
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
        selectedOption={selectedOption}
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
