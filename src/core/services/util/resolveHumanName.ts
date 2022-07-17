import { HumanName } from '../../models/HumanName';

export function resolvePractitionerName(name: HumanName | undefined): string {
  let output = '';
  if (name !== undefined) {
    name.prefix.forEach((prefix: string) => (output += prefix));
    output += ' ' + name.family;
  }
  console.log(output);
  return output;
}
