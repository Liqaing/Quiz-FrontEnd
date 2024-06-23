import { Answer, Question, QuizData } from "@/type/type";
import { Button } from "@headlessui/react";
import FormSubmit from "./FormSubmit";
import SucessModal from "@/components/modal/SubmitAnswerSuccess";

export default function PlayQuiz(props: {quiz: QuizData | null | undefined, formAction:any, formState:any}) {    
    

    return (
        <form action={props.formAction} className="w-full">
            <input type="hidden" name="quizId" defaultValue={props.quiz?.id} readOnly/>
            <input type="hidden" name="question-count" defaultValue={props.quiz?.questions?.length} readOnly/> 
            
            {
                props.quiz?.questions?.map((d: Question, questionIndex: number) => {
                    return (
                        <div key={d.id} className="md:h-auto py-2 px-4 my-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="w-4/5">
                                <p className="lg:text-lg md:text-base font-medium tracking-tight text-gray-900 dark:text-white">{`${questionIndex + 1}. ${d.question}`}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 my-3">
                                {
                                    d.answers.map((answer: Answer, answerIndex: number) => {
                                        return (
                                            <label key={answer.id} className="inline-flex justify-start items-center text-sm font-medium focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                                <input
                                                    type="radio"
                                                    name={`answer-${questionIndex}`}
                                                    value={answer.id}
                                                    className="mr-2"
                                                    required
                                                />
                                                {answer.answer}
                                            </label>
                                        )
                                    })
                                }
                            </div>
                            <input type="hidden" name={`question-${questionIndex}`} defaultValue={d.id} />
                        </div>
                    )
                })
            }
            <FormSubmit></FormSubmit>

            {
                props.formState.message == "success" && (
                    <SucessModal result={props.formState.result} totalScore={String(props.quiz?.questions?.length)}></SucessModal>       
                )
            }
        </form>
    )
    
}