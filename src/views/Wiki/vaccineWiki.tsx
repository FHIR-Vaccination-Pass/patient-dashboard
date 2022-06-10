import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  getSomeVaccinations,
  Vaccination,
} from '../../assets/models/vaccination';
import './vaccineWiki.css';
import { ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export function VaccineWiki() {
  const vaccinations: Vaccination[] = getSomeVaccinations();
  return (
      <Box style={{ marginLeft: '5px' }}>
        <Heading>Wiki</Heading>
        <Accordion defaultIndex={[]} allowMultiple>
        {vaccinations.map((vaccination) => (
            <div>
              <AccordionItem>
                <h1>
                  <AccordionButton>
                    <Box fontSize='xl' flex='1' textAlign='left'>
                      {vaccination.name}
                    </Box>
                    <AccordionIcon/>
                  </AccordionButton>
                </h1>
                <AccordionPanel pb={4}>
                  <HStack style={{ position: 'relative' }}>
                    <div className={'vaccination-description'}>
                                  <span>
                                      <span className={'accordion-content-header'}>Disease:</span>{' '}
                                    {vaccination.name}
                                    <br/>
                                  </span>
                      <span>
                                      <span className={'accordion-content-header'}>
                                          Description:
                                      </span>{' '}
                        {vaccination.description}
                                  </span>
                      <Link to={`/dashboard/wiki/${vaccination.name}`}>
                        <Button
                            rightIcon={<ArrowForwardIcon/>}
                            variant='outline'
                            colorScheme={'aviGreen'}
                            mt={'20px'}
                        >
                          Learn more
                        </Button>
                      </Link>
                    </div>
                    <HStack
                        style={{height: '70px', position: 'absolute', right: 0}}
                    >
                      <Divider orientation={'vertical'}/>
                      <Link to={`/dashboard/wiki/${vaccination.name}`}>
                        <IconButton
                            className={'extend-full-height'}
                            aria-label={'Get details'}
                            size={'lg'}
                            colorScheme='Gray'
                            variant='ghost'
                            icon={<ChevronRightIcon/>}
                        ></IconButton>
                      </Link>
                    </HStack>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
            </div>
        ))}
      </Accordion>
</Box>
  );
}
