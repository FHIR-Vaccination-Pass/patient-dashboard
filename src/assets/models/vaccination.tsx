export interface Vaccination {
    name: string;
    immunizationAgainst: string;
    description: string;
    vaccine: Vaccine;
    relevantLocations: string[];
}

interface Vaccine {
    manufacturer: string;
    numberOfDoses: number;
}

// A test method to generate some vaccinations data TODO: Replace with proper data fetching
export function getSomeVaccinations(): Vaccination[] {
    return [
        {
            name: 'Coronavirus',
            immunizationAgainst: 'string;',
            description: 'There are several COVID-19 vaccines validated for use by WHO (given Emergency Use Listing).\n' +
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
            relevantLocations: ['Asien']
        } as unknown as Vaccination,
        {
            name: 'Tetanus',
            immunizationAgainst: 'string;',
            description: 'string;',
            vaccine: null,
            relevantLocations: ['Asien']
        } as unknown as Vaccination,
        {
            name: 'Malaria',
            immunizationAgainst: 'string;',
            description: 'string;',
            vaccine: null,
            relevantLocations: ['Asien']
        } as unknown as Vaccination,
        {
            name: 'Streptokokken',
            immunizationAgainst: 'string;',
            description: 'string;',
            vaccine: null,
            relevantLocations: ['Asien']
        } as unknown as Vaccination,
        {
            name: 'Mumps',
            immunizationAgainst: 'string;',
            description: 'string;',
            vaccine: null,
            relevantLocations: ['Asien']
        } as unknown as Vaccination,
    ];
}