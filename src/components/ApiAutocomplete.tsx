import { useState } from "react";
import {
  CloseButton,
  Combobox,
  Loader,
  ScrollArea,
  Text,
  TextInput,
  useCombobox,
} from "@mantine/core";

export default function ApiAutocomplete({
  label,
  placeholder,
  url,
  canCreateNewOption,
  normalizer = (item: any) => {
    return item.name;
  },
}: {
  label?: string;
  placeholder?: string;
  url: string;
  canCreateNewOption?: boolean;
  normalizer?: (item: unknown) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: async () => {
      if (data.length === 0 && !loading) {
        setLoading(true);

        try {
          const response = await fetch(url).then((response) => response.json());
          const formatedResponse = response.map((response: unknown) => {
            return normalizer(response);
          });

          setData(formatedResponse);
          setLoading(false);

          combobox.resetSelectedOption();
        } catch (error) {
          console.log(error);
          setData([]);
        }
      }
    },
  });

  const [data, setData] = useState<string[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(optionValue) => {
        if (optionValue === "$create") {
          // call api création
          // add method en props
          console.log("Création d'un élément à la volée");
        } else {
          setValue(optionValue);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          w='25rem'
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          rightSection={
            loading ? (
              <Loader size={18} />
            ) : (
              value !== "" && (
                <CloseButton
                  size='sm'
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setValue("")}
                  aria-label='Clear value'
                />
              )
            )
          }
        />
      </Combobox.Target>
      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options>
          <ScrollArea.Autosize type='scroll' mah={200}>
            {data.length === 0 ? (
              <>
                {canCreateNewOption ? (
                  <Combobox.Option value='$create'>
                    Créer l'option :{" "}
                    <Text
                      span
                      fz='inherit'
                      style={{ textDecoration: "underline" }}
                    >
                      {value}
                    </Text>
                  </Combobox.Option>
                ) : (
                  <Combobox.Empty>Aucun résultat</Combobox.Empty>
                )}
              </>
            ) : (
              data.map((item) => (
                <Combobox.Option value={item} key={item}>
                  {item}
                </Combobox.Option>
              ))
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
