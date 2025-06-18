import { ApiComboboxData, ComboboxProps } from "../core/Combobox";
import { Combobox, useCombobox } from "@mantine/core";
import ComboboxInput from "./parts/ComboboxInput";
import { useState } from "react";
import {
  ComboboxDropdown,
  ComboboxCreateOption,
} from "./parts/ComboboxDropdown";

type ApiAutocomplete = ComboboxProps & {
  url: string;
  normalizer?: (item: unknown) => void;
  createItemMethod?: (item: string) => void;
};

export default function ApiAutocomplete({
  label,
  placeholder = label,
  selectedOption,
  error,
  isRequired,
  onChange,
  url,
  createItemMethod,
  normalizer = (item: any) => {
    return item.name;
  },
}: ApiAutocomplete) {
  const [newItem, setNewItem] = useState("");

  const [data, setData] = useState<ApiComboboxData>({
    items: [],
    loading: false,
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: async () => {
      if (data.items.length === 0 && !data.loading) {
        setData({
          items: data.items,
          loading: true,
        });

        try {
          const response = await fetch(url).then((response) => response.json());
          const formatedResponse = response.map((response: unknown) => {
            return normalizer(response);
          });

          setData({
            items: formatedResponse,
            loading: false,
          });

          combobox.resetSelectedOption();
        } catch (error) {
          console.log(error);
          setData({
            items: [],
            loading: false,
          });
        }
      }
    },
  });

  const shouldFilterOptions = !data.items.some(
    (item) => item === selectedOption
  );

  const filteredOptions = shouldFilterOptions
    ? data.items.filter((item) =>
        item.toLowerCase().includes(selectedOption.toLowerCase().trim())
      )
    : data.items;

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(optionValue) => {
        if (optionValue === "$create" && createItemMethod) {
          createItemMethod(optionValue);
        } else {
          onChange(optionValue);
        }
        combobox.closeDropdown();
      }}
    >
      <ComboboxInput
        label={label}
        placeholder={placeholder}
        selectedOption={selectedOption}
        onChange={onChange}
        store={combobox}
        loading={data.loading}
        error={error}
        isRequired={isRequired}
      />
      <ComboboxDropdown hidden={data === null}>
        {filteredOptions.length === 0 ? (
          <>
            {createItemMethod ? (
              <ComboboxCreateOption value={selectedOption} />
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
