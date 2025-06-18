import { ComboboxMultipleProps, StaticComboboxProps } from "../core/Combobox";
import ComboboxMultipleOption from "./parts/ComboboxMultipleOption";
import ComboboxMultipleInput from "./parts/ComboboxMultipleInput";
import { ComboboxDropdown } from "./parts/ComboboxDropdown";
import { Combobox, useCombobox } from "@mantine/core";
import { useState } from "react";

export default function StaticMultiSelect({
  label,
  placeholder = label,
  selectedItems,
  error,
  isRequired,
  options,
  onChange,
}: ComboboxMultipleProps & StaticComboboxProps) {
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const formatedOptions = options.filter((item) =>
    item.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(optionValue) => {
        onChange(
          selectedItems.includes(optionValue)
            ? selectedItems.filter((value) => value !== optionValue)
            : [...selectedItems, optionValue]
        );
        setSearch("");
      }}
    >
      <ComboboxMultipleInput
        label={label}
        placeholder={placeholder}
        selectedItems={selectedItems}
        onChange={onChange}
        store={combobox}
        error={error}
        isRequired={isRequired}
        search={search}
        setSearch={setSearch}
      />
      <ComboboxDropdown>
        {formatedOptions.length === 0 ? (
          <Combobox.Empty>Aucun résultat</Combobox.Empty>
        ) : (
          formatedOptions.map((item) => (
            <ComboboxMultipleOption
              key={item}
              item={item}
              selectedItems={selectedItems}
            />
          ))
        )}
      </ComboboxDropdown>
    </Combobox>
  );
}
