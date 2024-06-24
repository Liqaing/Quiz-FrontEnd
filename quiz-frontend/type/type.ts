export type QuizData = {
    id: string,
    name: string,
    description: string,
    visibility: string,
    questions: Array<Question> | null,
    createdAt: string,
    updatedAt: string
}

export type Question = {
    id: string,
    question: string,
    type: string, 
    answers: Array<Answer>,
    createdAt: string,
    updatedAt: string
}

export type Answer = {
    id: string,
    answer: string,
    createdAt: string,
    updatedAt: string,
    correct: boolean
}

export type PlayHistory = {
    id: string,
    score: number,
    answered:Array<PlayQuestion>,
    quizId:string,
    quizName:string,
    quizDescription: string,
    createdAt:string,
    updatedAt:string
}

export type PlayQuestion = {
    question:string,
    type:string,
    answers:Array<PlayAnswer>
}

export type PlayAnswer = {
    answer: string,
    correct: boolean,
    pick: boolean
}