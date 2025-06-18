export type ComboboxProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
  selectedOption: string;
  onChange: (option: string) => void;
}

export type ApiComboboxData = {
  items: [] | string[];
  loading: boolean;
};