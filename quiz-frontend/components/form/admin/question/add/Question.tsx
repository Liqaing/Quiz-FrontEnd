import Link from "next/link";
import FormSubmit from "./FormSubmit";
import { useEffect, useState } from "react";
import { Button, RadioGroup } from "@headlessui/react";
import { FetchOneQuestion } from "@/utils/API/question/fetchOneQuestion";
import { Answer } from "@/type/type";

export default function QuestionForm(props: {quizId:string | null, formAction:any, formState:any, handleModal:any, questionId:string | null, mode:string}) {

    const [question, setQuestion] = useState("");
    const [type, setType] = useState("MULTIPLE CHOICE");
    const [answers, setAnswers] = useState([{answer: "", answerId: "", isCorrect: false}, {answer: "", answerId: "",isCorrect:false}, {answer: "", answerId: "",isCorrect:false}, {answer: "", answerId: "",isCorrect:false}]);
    const [correctAnswer, setCorrectAnswer] = useState("");

    async function getQuestion() {
        if (props.questionId) {
            const data = await FetchOneQuestion(props.questionId);
            if (data) {
                setQuestion(data.question);
                setType(data.type);
                const newAnswers = data.answers.map((answer: Answer) => ({
                    answer: answer.answer,
                    answerId: answer.id,
                    isCorrect: answer.correct,
                }));
                setAnswers(newAnswers);
                setCorrectAnswer(newAnswers.find((a: { answer: string, isCorrect: boolean }) => a.isCorrect)?.answer || "");
            }
        }
    }
        
    useEffect(() => {
        if(props.formState) {
            if (props.formState.message == "success") {
                props.handleModal();
                props.formState.message = ""
            }
        } 
    }, [props.formState])

    useEffect(() => {
        if(props.formState) {
            props.formState.message = ""
        } 
    }, [])

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index].answer = value;
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index: number) => {
        const newAnswers = answers.map((ans, i) => ({
            ...ans,
            isCorrect: i === index,
        }));
        setAnswers(newAnswers);
        setCorrectAnswer(newAnswers[index].answer);
    };

    useEffect(() => {
        getQuestion();
    }, []);

    return (
        <div tabIndex={-1} aria-hidden="true" className="bg-neutral-950/55 flex h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-[#1a2d47]">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {props.mode === "ADD" ? "Create New Question" : "Edit Question"}
                        </h3>
                        <Button onClick={props.handleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close add question</span>
                        </Button>
                    </div>

                    <form className="p-4 md:p-5" action={props.formAction}>
                        <input type="text" hidden name="id" id="id" value={props.quizId ? props.quizId : ""} readOnly />
                        <input type="text" hidden name="question-id" id="question-id" value={props.questionId ? props.questionId : ""} readOnly />
                        <input type="number" hidden name="answer-count" id="answer-count" value={answers.length} readOnly />

                        <div className="grid gap-4 mb-4 grid-cols-4">
                            <div className="col-span-4">
                                <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quiz Question</label>
                                <input type="text" name="question" id="question" value={question} onChange={e => setQuestion(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter question" required />
                            </div>
                            <div className="col-span-4">
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question Type</label>
                                <select id="type" name="type" value={type} onChange={e => setType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="MULTIPLE CHOICE">Multiple Choice</option>
                                </select>
                            </div>

                            <div className="col-span-4">
                                <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Answer</span>
                                <div className="grid grid-cols-4 gap-4">
                                    {answers.map((ans, index) => (
                                        <div className="col-span-2" key={index}>
                                            <label htmlFor={`answer${index}`} className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Answer {index + 1}</label>
                                            <div id="answer-input" className="relative">
                                                <input type="text" hidden name={`answerId${index}`} id={`answerId${index}`} value={ans.answerId} readOnly />
                                                <input type="text" id={`answer${index}`} name={`answer${index}`} value={ans.answer} onChange={e => handleAnswerChange(index, e.target.value)} className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`Enter answer ${index + 1}`} required />                                                
                                                <input type="radio" name="correctAnswer" id={`correctAnswer${index}`} value={index} checked={ans.isCorrect} onChange={() => handleCorrectAnswerChange(index)} className="absolute end-2.5 bottom-4 text-gray-600 text-xl scale-125" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {props.formState?.message && (
                            <div className="flex items-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mb-4" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Error</span>
                                <p>{props.formState?.message}</p>
                            </div>
                        )}
                        <div className="flex justify-end items-center space-x-4 mt-10" role="group">
                            <FormSubmit handleModal={props.handleModal}></FormSubmit>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
