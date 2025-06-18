import fetchApiOptions from "../core/utils/fetchApiOptions";
import { Combobox, useCombobox } from "@mantine/core";
import ComboboxInput from "./parts/ComboboxInput";
import { useState } from "react";
import {
  ApiComboboxData,
  ApiComboboxProps,
  ComboboxSimpleProps,
} from "../core/Combobox";
import {
  ComboboxDropdown,
  ComboboxCreateOption,
} from "./parts/ComboboxDropdown";

export default function ApiAutocomplete({
  label,
  placeholder = label,
  selectedItem,
  error,
  isRequired,
  onChange,
  url,
  createItemMethod,
  normalizer = (item: any) => {
    return item.name;
  },
}: ComboboxSimpleProps & ApiComboboxProps) {
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

  const shouldFilterOptions = !data.items.some((item) => item === selectedItem);

  const filteredOptions = shouldFilterOptions
    ? data.items.filter((item) =>
        item.toLowerCase().includes(selectedItem.toLowerCase().trim())
      )
    : data.items;

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(optionValue) => {
        if (optionValue === "$create" && createItemMethod) {
          // const newItem = selectedItem
          createItemMethod(selectedItem);
        } else {
          onChange(optionValue);
        }

        combobox.closeDropdown();
      }}
    >
      <ComboboxInput
        label={label}
        placeholder={placeholder}
        selectedItem={selectedItem}
        onChange={onChange}
        store={combobox}
        loading={data.loading}
        error={error}
        isRequired={isRequired}
      />
      <ComboboxDropdown>
        {filteredOptions.length === 0 ? (
          <>
            {createItemMethod ? (
              <ComboboxCreateOption value={selectedItem} />
            ) : (
              <Combobox.Empty>Aucun résultat</Combobox.Empty>
            )}
          </>
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
