import { CodeableConcept } from './CodeableConcept';

export interface Substance {
    identifier: string;
    category: CodeableConcept
    code: CodeableConcept;
    description: string;

}
