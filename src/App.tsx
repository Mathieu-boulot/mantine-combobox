import "@mantine/core/styles.css";
import { Column, Container, Row } from "./components/layout/Layout";
import StaticAutocomplete from "./components/StaticAutocomplete";
import StaticMultiSelect from "./components/StaticMultiSelect";
import ApiAutocomplete from "./components/ApiAutocomplete";
import ApiMultiSelect from "./components/ApiMultiSelect";
import { MantineProvider, Title } from "@mantine/core";
import { useState } from "react";
import { theme } from "./theme";

export default function App() {
  const [staticValue, setStaticValue] = useState<string>("");
  const [staticMultipleValue, setStaticMultipleValue] = useState<string[]>([]);
  const [apiMultipleValue, setApiMultipleValue] = useState<string[]>([]);
  const [apiValue, setApiValue] = useState<string>("");

  const options = [
    "🍎 Apples",
    "🍌 Bananas",
    "🥦 Broccoli",
    "🥕 Carrots",
    "🍫 Chocolate",
  ];

  return (
    <MantineProvider theme={theme}>
      <Container>
        <Row>
          <Column>
            <Title>🪄 Autocomplete</Title>
            <StaticAutocomplete
              isRequired
              label='Autocomplete with static option list'
              selectedItem={staticValue}
              onChange={(item: string) => setStaticValue(item)}
              options={options}
            />
            <ApiAutocomplete
              isRequired
              label='Autocomplete with option list from api'
              url='https://jsonplaceholder.typicode.com/users'
              selectedItem={apiValue}
              onChange={(item: string) => setApiValue(item)}
              createItemMethod={(newItem) => setApiValue(newItem)}
            />
          </Column>

          <Column>
            <Title>🗃️ MultiSelect</Title>
            <StaticMultiSelect
              isRequired
              label='MultiSelect with static option list'
              selectedItems={staticMultipleValue}
              onChange={(item: string[]) => setStaticMultipleValue(item)}
              options={options}
            />
            <ApiMultiSelect
              isRequired
              label='Autocomplete with option list from api'
              url='https://jsonplaceholder.typicode.com/users'
              selectedItems={apiMultipleValue}
              onChange={(item: string[]) => setApiMultipleValue(item)}
              normalizer={(item: any) => {
                return item.email;
              }}
              createItemMethod={(search) => {
                // New item is simply added to the selectedItem list
                // For real implementations, send to the api to refresh
                // the data option list with the new value
                setApiMultipleValue(
                  apiMultipleValue.includes(search)
                    ? apiMultipleValue.filter((value) => value !== search)
                    : [...apiMultipleValue, search]
                );
              }}
            />
          </Column>
        </Row>
      </Container>
    </MantineProvider>
  );
}
