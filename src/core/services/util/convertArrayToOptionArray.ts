// Convert to option array for Select component

export type OptionType = {
  value: string;
  label: string;
};

export function convertArrayToOptionArray(list: string[]): OptionType[] {
  const result: OptionType[] = [];
  list.forEach((listElement) => {
    result.push({
      value: listElement.toLowerCase(),
      label: listElement,
    });
  });
  return result;
}
