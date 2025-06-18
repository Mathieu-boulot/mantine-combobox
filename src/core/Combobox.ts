export type ComboboxProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  isRequired?: boolean;
}

export type ComboboxSimpleProps = ComboboxProps & {
  selectedItem: string;
  onChange: (item: string) => void;
} 

export type ComboboxMultipleProps = ComboboxProps & {
  selectedItems: string[];
  onChange: (item: string[]) => void;
} 

export type ApiComboboxProps = {
  url: string;
  normalizer?: (item: unknown) => void;
  createItemMethod?: (item: string) => void;
};

export type StaticComboboxProps = {
  options: string[];
};

export type ApiComboboxData = {
  items: [] | string[];
  loading: boolean;
};