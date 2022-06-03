import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  HStack,
  VStack,
} from '@chakra-ui/react';
import './vaccineWiki.css';

export function VaccineDetailPage() {
  const vaccination = {
    name: 'Coronavirus',
    immunizationAgainst: 'Covid-19',
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
    vaccines: [
      {
        name: 'Corminaty',
        manufacturer: 'BionTech',
        numberOfDoses: 3,
        recommendedAgeStart: 0,
        recommendedAgeEnd: 99,
      },
      {
        name: 'AstraZeneca',
        manufacturer: 'AstraZeneca',
        numberOfDoses: 3,
        recommendedAgeStart: 40,
        recommendedAgeEnd: 99,
      },
      {
        name: 'Jhonnson & Jhonsson',
        manufacturer: 'Jhonnson & Jhonsson',
        numberOfDoses: 1,
        recommendedAgeStart: 0,
        recommendedAgeEnd: 99,
      },
      {
        name: 'Moderna',
        manufacturer: 'Moderna',
        numberOfDoses: 3,
        recommendedAgeStart: 0,
        recommendedAgeEnd: 99,
      },
    ],
    relevantLocations: ['Global'],
  };
  return (
    <VStack>
      <Text fontSize={'lg'} align={'left'}>
        {vaccination.name}
      </Text>
      <HStack>
        <div className={'vaccination-description'}>
          <span>
            <span className={'accordion-content-header'}>Disease:</span>{' '}
            {vaccination.name}
            <br />
          </span>
          <span>
            <span className={'accordion-content-header'}>
              Immunization against:
            </span>{' '}
            {vaccination.immunizationAgainst}
            <br />
          </span>
          <span>
            <span className={'accordion-content-header'}>
              Relevant Locations:
            </span>{' '}
            {vaccination.relevantLocations}
            <br />
          </span>
          <span>
            <span className={'accordion-content-header'}>Description:</span>{' '}
            {vaccination.description}
            <br />
          </span>
          <span className={'accordion-content-header'}>
            Available vaccines:
          </span>
          <br />
        </div>
      </HStack>
      <div style={{ position: 'relative', width: '100%' }}>
        <Accordion
          style={{ position: 'absolute', left: 0, width: '100%' }}
          defaultIndex={[]}
          allowMultiple
        >
          {vaccination.vaccines.map((vaccine) => (
            <AccordionItem>
              <h1>
                <AccordionButton>
                  <Box fontSize='md' flex='1' textAlign='left'>
                    {vaccine.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h1>
              <AccordionPanel pb={4}>
                <HStack>
                  <div>
                    <span>
                      <span className={'accordion-content-header'}>
                        Manufacturer:
                      </span>{' '}
                      {vaccine.manufacturer}
                      <br />
                    </span>
                    <span>
                      <span className={'accordion-content-header'}>
                        Number of doses:
                      </span>{' '}
                      {vaccine.numberOfDoses}
                      <br />
                    </span>
                    <span>
                      <span className={'accordion-content-header'}>
                        Recommended age:
                      </span>{' '}
                      {vaccine.recommendedAgeStart} -{' '}
                      {vaccine.recommendedAgeEnd}
                      <br />
                    </span>
                  </div>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </VStack>
  );
}
