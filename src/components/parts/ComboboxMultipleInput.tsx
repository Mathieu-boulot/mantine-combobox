import { Combobox, ComboboxStore, Pill, PillsInput } from "@mantine/core";
import { ComboboxMultipleProps } from "../../core/Combobox";

type ComboboxMultipleInputProps = ComboboxMultipleProps & {
  store: ComboboxStore;
  search: string;
  setSearch: (search: string) => void;
};

export default function ComboboxMultipleInput({
  store,
  label,
  placeholder,
  error,
  isRequired,
  selectedItems,
  onChange,
  search,
  setSearch,
}: ComboboxMultipleInputProps) {
  const handleValueRemove = (item: string) => {
    onChange(selectedItems.filter((value) => value !== item));
  };

  return (
    <Combobox.DropdownTarget>
      <PillsInput
        w='25rem'
        label={label}
        error={error}
        required={isRequired}
        onClick={() => store.openDropdown()}
      >
        <Pill.Group>
          {selectedItems.map((item) => (
            <Pill
              key={item}
              withRemoveButton
              onRemove={() => handleValueRemove(item)}
            >
              {item}
            </Pill>
          ))}
          <Combobox.EventsTarget>
            <PillsInput.Field
              value={search}
              placeholder={placeholder}
              onFocus={() => store.openDropdown()}
              onBlur={() => store.closeDropdown()}
              onChange={(event) => {
                store.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && search.length === 0) {
                  event.preventDefault();
                  handleValueRemove(selectedItems[selectedItems.length - 1]);
                }
              }}
            />
          </Combobox.EventsTarget>
        </Pill.Group>
      </PillsInput>
    </Combobox.DropdownTarget>
  );
}
