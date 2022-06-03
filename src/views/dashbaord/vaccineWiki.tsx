import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Divider, HStack, IconButton
} from '@chakra-ui/react';
import {getSomeVaccinations, Vaccination} from "../../assets/models/vaccination";
import './vaccineWiki.css';
import {ChevronRightIcon} from "@chakra-ui/icons";
import {Link} from 'react-router-dom';

export function VaccineWiki() {
    const vaccinations: Vaccination[] = getSomeVaccinations();
    return (
        <Accordion defaultIndex={[]} allowMultiple>
            {vaccinations.map( vaccination => (
                <><AccordionItem>
                    <h1>
                        <AccordionButton>
                            <Box fontSize='xl' flex='1' textAlign='left'>
                                { vaccination.name }
                            </Box>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4}>
                        <HStack style={{position: 'relative'}}>
                            <div className={'vaccination-description'}>
                                <span><span className={'accordion-content-header'}>Disease:</span> { vaccination.name }<br/></span>
                                <span><span className={'accordion-content-header'}>Description:</span> { vaccination.description }</span>
                            </div>
                            <HStack style={{height: '70px', position: 'absolute', right: 0}}>
                                <Divider orientation={'vertical'}/>
                                <Link to={`/dashboard/wiki/${vaccination.name}`}><IconButton className={'extend-full-height'} aria-label={'Get details'} size={'lg'} colorScheme='Gray' variant='ghost' icon={<ChevronRightIcon/>}></IconButton></Link>
                            </HStack>
                        </HStack>
                    </AccordionPanel>
                </AccordionItem></>
            ))}
        </Accordion>
    );
}