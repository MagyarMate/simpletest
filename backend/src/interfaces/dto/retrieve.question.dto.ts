export interface RetrieveQuestionDto {
    id: number;
    number: string;
    question: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    correct: number;
    omit: boolean;
}