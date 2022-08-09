import { Disease } from '../models/Disease';

export const MockDisease = new Map<string, Disease>([
  [
    'cholera',
    {
      id: 'cholera',
      code: {
        id: 'icd-10',
        coding: {
          code: 'A00',
          system: 'https://localhost:3000/url/to/typings',
        },
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
        coding: {
          code: 'U07.1',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      name: 'Covid-19',
      description:
        'Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.\n' +
        'Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention. \n' +
        'The virus can spread from an infected person’s mouth or nose in small liquid particles when they cough, sneeze, speak, sing or breathe. These particles range from larger respiratory droplets to smaller aerosols.\n' +
        'You can be infected by breathing in the virus if you are near someone who has COVID-19, or by touching a contaminated surface and then your eyes, nose or mouth. The virus spreads more easily indoors and in crowded settings.',
      populationRecommendationId: 'covidRecommendation',
      vaccineIds: [
        'comirnaty',
        'jcovden',
        'nuvaxovid',
        'spikevax',
        'vaxzevria',
        'covid-valneva',
      ],
    },
  ],
  [
    'diphtheria',
    {
      id: 'diphtheria',
      code: {
        id: 'icd-10',
        coding: {
          code: 'A36',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      name: 'Diphtheria',
      description:
        'Diphtheria is a serious infection caused by strains of bacteria called Corynebacterium diphtheriae that make toxin (poison). It can lead to difficulty breathing, heart failure, paralysis, and even death. CDC recommends vaccines for infants, children, teens, and adults to prevent diphtheria.',
      populationRecommendationId: 'diphtheriaRecommendation',
      vaccineIds: ['td-pur', 'td-rix'],
    },
  ],
  [
    'tetanus',
    {
      id: 'tetanus',
      code: {
        id: 'icd-10',
        coding: {
          code: 'A34',
          system: 'https://localhost:3000/url/to/typings',
        },
      },
      name: 'Tetanus',
      description:
        'Tetanus is an infection caused by bacteria called Clostridium tetani. When the bacteria invade the body, they produce a poison (toxin) that causes painful muscle contractions. Another name for tetanus is “lockjaw”. It often causes a person’s neck and jaw muscles to lock, making it hard to open the mouth or swallow. CDC recommends vaccines for infants, children, teens, and adults to prevent tetanus.',
      populationRecommendationId: 'tetanusRecommendation',
      vaccineIds: ['td-pur', 'td-rix', 'tetagam-p', 'tetanol-pur'],
    },
  ],
]);
