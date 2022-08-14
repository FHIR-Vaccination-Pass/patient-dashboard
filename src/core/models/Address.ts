export interface Address {
  country: string;
  countryCode: string;
  state: string;
  stateCode: string;
  district?: string;
  postalCode?: string;
  city?: string;
  line?: string[];
}
