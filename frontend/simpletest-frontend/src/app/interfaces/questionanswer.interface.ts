export interface IQuestionAnswer{
  questionNumber: number,
  answer: number,
}

export interface IQuestionAnswerPayload{
  answerList: IQuestionAnswer[],
}
