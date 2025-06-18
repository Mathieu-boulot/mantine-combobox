import { ComboboxSimpleProps } from "../../core/Combobox";
import {
  CloseButton,
  Combobox,
  ComboboxStore,
  Loader,
  TextInput,
} from "@mantine/core";

type ComboboxInputProps = ComboboxSimpleProps & {
  store: ComboboxStore;
  loading?: boolean;
};

export default function ComboboxInput({
  label,
  placeholder,
  selectedItem,
  error,
  isRequired,
  onChange,
  store,
  loading,
}: ComboboxInputProps) {
  return (
    <Combobox.Target>
      <TextInput
        w='25rem'
        label={label}
        placeholder={placeholder}
        value={selectedItem}
        error={error}
        required={isRequired}
        onChange={(event) => {
          onChange(event.currentTarget.value);
          store.resetSelectedOption();
          store.openDropdown();
        }}
        onClick={() => store.openDropdown()}
        onFocus={() => store.openDropdown()}
        onBlur={() => store.closeDropdown()}
        rightSection={
          loading ? (
            <Loader size={18} />
          ) : (
            selectedItem !== "" && (
              <CloseButton
                size='sm'
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onChange("")}
                aria-label='Clear value'
              />
            )
          )
        }
      />
    </Combobox.Target>
  );
}
