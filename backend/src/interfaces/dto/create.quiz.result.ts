interface QuestionResultDto {
    questionId: string;
    answer: number;
    isCorrect: boolean;
}

export interface CreateResultDto{
    quizId: string;
    userId: string;
    questions: QuestionResultDto[];
}