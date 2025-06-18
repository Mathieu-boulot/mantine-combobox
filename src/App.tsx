import "@mantine/core/styles.css";
import StaticAutocomplete from "./components/StaticAutocomplete";
import ApiAutocomplete from "./components/ApiAutocomplete";
import { MantineProvider } from "@mantine/core";
import Column from "./components/layout/Column";
import { useState } from "react";
import { theme } from "./theme";

export default function App() {
  const [staticValue, setStaticValue] = useState<string>("");
  const [apiValue, setApiValue] = useState<string>("");

  return (
    <MantineProvider theme={theme}>
      <Column>
        {/* <StaticAutocomplete /> & <ApiAutocomplete /> */}
        {/* Add those props : filter, sort, limit, renderOptions */}

        <StaticAutocomplete
          isRequired
          label='Autocomplete with static option list'
          selectedOption={staticValue}
          onChange={(option: string) => setStaticValue(option)}
          options={[
            "🍎 Apples",
            "🍌 Bananas",
            "🥦 Broccoli",
            "🥕 Carrots",
            "🍫 Chocolate",
          ]}
        />

        {/* To do : CreateNewItem */}
        <ApiAutocomplete
          isRequired
          label='Autocomplete with option list from api'
          url='https://jsonplaceholder.typicode.com/users'
          onChange={(option: string) => setApiValue(option)}
          selectedOption={apiValue}
          createItemMethod={(optionValue) => {
            console.log("OPTIONVALUE :", optionValue);
          }}
        />
      </Column>
    </MantineProvider>
  );
}
