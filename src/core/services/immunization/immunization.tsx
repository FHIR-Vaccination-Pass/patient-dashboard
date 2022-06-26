import {Immunization} from "fhir/r2";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";


// The vaccination object according to our object model, TODO: Remove, use FHIR types instead
export interface Vaccination {
    code: string,
    disease: string;
    name: string;
    vaccines: [
        {
            name: string,
            type: string,
            organization: string,
            recommendedAgeStart: number,
            recommendedAgeEnd: number,
            isFast: boolean,
            isOffLabel: boolean,
            vaccinationDoses: number
        }
    ],
    recommendation: {
        ageStart: number,
        ageEnd: number,
        riskAreas: [
            {
                country: string,
                state: string,
                administrativeDistrict: string,
            }
        ],
    },
}

/*interface ImmunizationState {
    immunizations: Immunization[];
}

const immunizationSlice = createSlice({
    name: 'immunization',
    initialState: { immunizations: [] as Immunization[] },
    reducers: {
        setVaccinations: (
            state,
            { payload: { immunizations } }: PayloadAction<{ immunizations: Immunization[] }>
        ) => {
            state.immunizations = immunizations;
        },
    },
});*/

type ImmunizationsResponse = Immunization[];

export const immunizationApi = createApi({
    reducerPath: 'immunizationsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    tagTypes: ['immunizations'],
    endpoints: (build) => ({
        getImmunizations: build.query<ImmunizationsResponse, void>({
            query: () => 'immunizations',
            /*providesTags: (result) =>
                result
                    ?
                        [
                            ...result.map(({ id }) => ({ type: 'Immunizations', id } as const)),
                            { type: 'Immunizations', id: 'LIST' },
                        ]
                    :
                        [{ type: 'Immunizations', id: 'LIST' }],*/
        }),
        getImmunization: build.query<Immunization, string>({
            query: (id) => `immunization/${id}`,
            /*providesTags: (result, error, id) => [{ type: 'Immunizations', id }],*/
        }),
    }),
});

export const {
    useGetImmunizationsQuery,
    useGetImmunizationQuery,
} = immunizationApi;