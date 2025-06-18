import ComboboxMultipleOption from "./parts/ComboboxMultipleOption";
import ComboboxMultipleInput from "./parts/ComboboxMultipleInput";
import fetchApiOptions from "../core/utils/fetchApiOptions";
import { Combobox, useCombobox } from "@mantine/core";
import { useState } from "react";
import {
  ApiComboboxData,
  ApiComboboxProps,
  ComboboxMultipleProps,
} from "../core/Combobox";
import {
  ComboboxCreateOption,
  ComboboxDropdown,
} from "./parts/ComboboxDropdown";

export default function ApiMultiSelect({
  label,
  placeholder = label,
  selectedItems,
  error,
  isRequired,
  onChange,
  url,
  createItemMethod,
  normalizer = (item: any) => {
    return item.name;
  },
}: ComboboxMultipleProps & ApiComboboxProps) {
  const [search, setSearch] = useState("");

  const [data, setData] = useState<ApiComboboxData>({
    items: [],
    loading: false,
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: async () => {
      await fetchApiOptions(url, combobox, data, setData, normalizer);
    },
  });

  const formatedOptions = data.items.filter((item) =>
    item.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(optionValue) => {
        if (optionValue === "$create" && createItemMethod) {
          createItemMethod(search);
        } else {
          onChange(
            selectedItems.includes(optionValue)
              ? selectedItems.filter((value) => value !== optionValue)
              : [...selectedItems, optionValue]
          );
        }
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
          <>
            {createItemMethod ? (
              <ComboboxCreateOption value={search} />
            ) : (
              <Combobox.Empty>Aucun résultat</Combobox.Empty>
            )}
          </>
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
