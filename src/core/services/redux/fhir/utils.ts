export type NestedCartesian<T> = {
  [Attr in keyof T]: Attr extends 'ids'
    ? T[Attr]
    : {
        [RecordKey in string]: NestedCartesian<Omit<T, Attr>>;
      };
};

export function storeIdRecursive<T>(
  response: any,
  id: string,
  pairs: [Exclude<keyof T, 'ids' | 'entities'>, string][]
) {
  for (const [key, value] of pairs) {
    const otherPairs = pairs.filter(([k, v]) => k !== key || v !== value);

    if (!(value in response[key]))
      response[key][value] = Object.fromEntries([
        ['ids', []],
        ...otherPairs.map((pair) => [pair[0], {}]),
      ]);
    response[key][value].ids.push(id);

    storeIdRecursive(response[key][value], id, otherPairs);
  }
}
