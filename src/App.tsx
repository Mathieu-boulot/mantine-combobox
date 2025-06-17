import "@mantine/core/styles.css";
import StaticAutocomplete from "./components/StaticAutocomplete";
import ApiAutocomplete from "./components/ApiAutocomplete";
import { Flex, MantineProvider } from "@mantine/core";
import { theme } from "./theme";

const options = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
];

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Flex
        direction='column'
        justify='center'
        align='center'
        gap='xl'
        h='100vh'
        w='100vw'
      >
        {/* To do : */}
        {/* StaticAutocomplete : optGroups */}
        {/* Global : filter, sort, limit, onChange, renderOptions, error, createItemMethod */}

        <StaticAutocomplete
          label='Autocomplete with static option list'
          placeholder='Autocomplete with static option list'
          options={options}
        />
        <ApiAutocomplete
          label='Autocomplete with option list from api'
          placeholder='Autocomplete with option list from api'
          url='https://jsonplaceholder.typicode.com/users'
          canCreateNewOption
        />
      </Flex>
    </MantineProvider>
  );
}
