import { Disease } from '../models/Disease';

export const MockDisease = new Map<string, Disease>([
  [
    'disease1',
    {
      id: 'disease1',
      code: {
        id: 'icd10standard',
        coding: 'ICD-10',
        text: 'X00',
      },
      name: 'Disease 1',
      description: 'This disease is not good for you :(',
      populationRecommendationId: 'populationrecommendation1',
      vaccineIds: ['vaccine1'],
    },
  ],
  [
    'cholera',
    {
      id: 'cholera',
      code: {
        id: 'icd-10',
        coding: 'ICD-10',
        text: 'A00',
      },
      name: 'Cholera',
      description:
        'An acute infectious disease caused by the gram-negative bacterium Vibrio cholerae\n' +
        'Characterized by severe diarrhea with extreme fluid and electrolyte depletion, vomiting, muscle cramps, prostration, and potential death without fluid and electrolyte replacement (1)\n' +
        'Endemic areas: India, Southeast Asia, Africa, Middle East, Southern Europe, Oceania, South and Central America (1)\n' +
        'System(s) affected: gastrointestinal\n' +
        'Synonym(s): Asiatic cholera; epidemic cholera; rice-water diarrhea; cholera gravis',
      populationRecommendationId: 'choleraRecommendation',
      vaccineIds: ['dukoral'],
    },
  ],
  [
    'covid-19',
    {
      id: 'covid-19',
      code: {
        id: 'icd-10',
        coding: 'ICD-10',
        text: 'U07.1',
      },
      name: 'Covid-19',
      description:
        'Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.\n' +
        'Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention. \n' +
        'The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. These particles range from larger respiratory droplets to smaller aerosols.\n' +
        'You can be infected by breathing in the virus if you are near someone who has COVID-19, or by touching a contaminated surface and then your eyes, nose or mouth. The virus spreads more easily indoors and in crowded settings.',
      populationRecommendationId: 'choleraRecommendation',
      vaccineIds: [
        'comirnaty',
        'jcovden',
        'nuvaxovid',
        'spikevax',
        'vaxzevria',
      ],
    },
  ],
]);
