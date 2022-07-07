import { ImmunizationRecommendationRecommendation } from 'fhir/r4';

export interface Disease {
  name: string;
  code: string;
  description: string;
  vaccine: Vaccine;
  relevantLocations: string[];
  personalRecommendation: ImmunizationRecommendationRecommendation | undefined;
}

interface Vaccine {
  manufacturer: string;
  numberOfDoses: number;
}

// A test method to generate some vaccinations data TODO: Replace with proper data fetching
export function getSomeDiseases(): Disease[] {
  return [
    {
      name: 'Disease A',
      code: 'Z98',
      immunizationAgainst: 'string;',
      description:
        'There are several COVID-19 vaccines validated for use by WHO (given Emergency Use Listing).\n' +
        '                        The first mass vaccination programme started in early December 2020 and the number of\n' +
        '                        vaccination doses administered is updated on a daily basis on the COVID-19 dashboard.\n' +
        '                        The WHO Emergency Use Listing process determines whether a product can be recommended\n' +
        '                        for use based on all the available data on safety and efficacy and on its suitability in low-\n' +
        '                        and middle-income countries.\n' +
        '                        Vaccines are assessed to ensure they meet acceptable standards of quality, safety and efficacy\n' +
        '                        using clinical trial data,\n' +
        '                        manufacturing and quality control processes.\n' +
        '                        The assessment weighs the threat posed by the emergency as well as the benefit that would accrue\n' +
        '                        from the use of the product against any potential risks.\n' +
        '                        In line with their national regulations and legislation, countries have the autonomy to issue\n' +
        '                        emergency use authorizations for any health product.\n' +
        '                        Domestic emergency use authorizations are issued at the discretion of countries and not subject\n' +
        '                        to WHO approval.',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease B',
      code: 'Z99',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease C',
      code: 'Z18',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease D',
      code: 'Z28',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease E',
      code: 'Z38',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease F',
      code: 'Z99',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease G',
      code: 'Z18',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease H',
      code: 'Z28',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease I',
      code: 'Z38',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease J',
      code: 'Z99',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease K',
      code: 'Z18',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease L',
      code: 'Z28',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease M',
      code: 'Z38',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease N',
      code: 'Z99',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease O',
      code: 'Z18',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease P',
      code: 'Z28',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
    {
      name: 'Disease Q',
      code: 'Z38',
      immunizationAgainst: 'string;',
      description: 'string;',
      vaccine: null,
      relevantLocations: ['Asien'],
    } as unknown as Disease,
  ];
}