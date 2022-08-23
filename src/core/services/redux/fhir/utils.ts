export type NestedCartesian<T extends string> = { ids: string[] } & {
  [Attr in T]: Record<string, NestedCartesian<Exclude<T, Attr>> | undefined>;
};

export type GetResponse<TResource, T extends string> = {
  entities: Record<string, TResource>;
} & NestedCartesian<T>;

export function storeIdRecursive(
  response: any,
  id: string,
  pairs: [string, string][],
  maxDepth: number = 4
) {
  if (maxDepth <= 0) {
    return;
  }

  for (const [key, value] of pairs) {
    const otherPairs = pairs.filter(([k, v]) => k !== key || v !== value);

    if (!(key in response)) {
      response[key] = {};
    }
    if (!(value in response[key])) {
      response[key][value] = Object.fromEntries([
        ['ids', []],
        ...otherPairs.map((pair) => [pair[0], {}]),
      ]);
    }
    response[key][value]!.ids.push(id);

    storeIdRecursive(response[key][value]!, id, otherPairs, maxDepth - 1);
  }
}
