import { HumanName } from '../../models/HumanName';

export function resolvePractitionerName(name: HumanName | undefined): string {
  if (name === undefined) {
    return '';
  }
  return [...name.prefix, name.family].join(' ');
}

export function resolvePatientName(name: HumanName | undefined): string {
  if (name === undefined) {
    return '';
  }
  return [...name.given, name.family].join(' ');
}
