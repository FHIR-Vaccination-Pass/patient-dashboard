export interface CodeableConcept {
    coding: Coding;
    text: string;
}

interface Coding {
    code: string;
}