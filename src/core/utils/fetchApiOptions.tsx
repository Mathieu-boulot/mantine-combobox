import { ComboboxStore } from "@mantine/core";
import { ApiComboboxData } from "../Combobox";

export default async function fetchApiOptions(
  url: string,
  store: ComboboxStore,
  data: ApiComboboxData,
  setData: (data: ApiComboboxData) => void,
  normalizer: (item: unknown) => void
) {
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

      store.resetSelectedOption();
    } catch (error) {
      console.log(error);
      setData({
        items: [],
        loading: false,
      });
    }
  }
}
