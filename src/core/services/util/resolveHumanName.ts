import { HumanName } from '../../models/HumanName';

export function resolvePractitionerName(name: HumanName | undefined): string {
  if (name === undefined) {
    return '';
  }
  return [...name.prefix, name.family].join(' ');
}
