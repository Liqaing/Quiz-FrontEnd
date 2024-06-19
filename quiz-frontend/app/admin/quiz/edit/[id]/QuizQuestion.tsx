"use client"

import QuestionView from "@/components/View/question/QuestionListView";
import QuestionForm from "@/components/form/admin/question/add/Question";
import { QuizData } from "@/type/type";
import { FetchOneQuiz } from "@/utils/API/quiz/FetchOneQuiz";
import CreateQuestionAction from "@/utils/Actions/admin/Question/CreateQuestion";
import EditQuestionAction from "@/utils/Actions/admin/Question/EditQuestion";
import { Button } from "@headlessui/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";



export default function QuizQuestion(props: {quizId:string}) {

    const [quizData, setQuizData] = useState<QuizData | null>(null);

    async function FetchQuiz(quizId:string) {
        const data = await FetchOneQuiz(quizId);
        if (data) {
            setQuizData(data);
        }
    }

    // get search query
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const visibility = searchParams.get("visibility");
    const createDate = searchParams.get("createdAt") as string;
    const description = searchParams.get("description");
    const date = new Date(createDate);

    // const baseUrl = usePathname();    
    // const currentUrl:string = `${baseUrl}?name=${name}&visibility=${visibility}&createdAt${createDate}&description=${description}`;

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [questionId, setQuestionId] = useState("");


    useEffect(() => {       
        FetchQuiz(props.quizId);
    }, [showAdd, showEdit]);

    function handleAddModal() {
        if (showAdd) {
            setShowAdd(false);
        }
        else {
            setShowAdd(true);
        }
    }

    function handleEditQuestionModal(questionId:string) {
        if (showEdit) {
            setShowEdit(false);
            setQuestionId("");            
        }
        else {
            setShowEdit(true);
            setQuestionId(questionId);
        }
    }

    const initialState = {
        message: ""
    };
    const [formState, formAction] = useFormState(CreateQuestionAction, initialState);
    const [EditQuestionformState, EditQuestionformAction] = useFormState(EditQuestionAction, initialState);

    return (
        <div className="max-w-screen-xl mx-auto p-2">             

            <div className="flex justify-between border-b-2 pb-4">
                <div className="w-10/12">
                    <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">{name}</p>
                    <p className="lg:text-md md:text-sm my-1 text-[0.8rem] hyphens-auto font-extralight">
                        {description}
                    </p>
                </div>
                <div className="w-2/12">
                    <p className="text-end lg:text-md md:text-sm">
                        Created - {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}                
                    </p>
                    <p className="text-end lg:text-md md:text-sm mt-2">
                        Visibility - {visibility}
                    </p>
                </div>
            </div>
            <div className="mt-4">
                <div className="w-full flex justify-between">
                    <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">Question</p>

                    <Button onClick={handleAddModal} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Question
                    </Button>
                </div>

                <QuestionView data={quizData} handleEditQuestionModal={handleEditQuestionModal}></QuestionView>

                {
                    showAdd && (
                        <QuestionForm mode="ADD" quizId={props.quizId} questionId={null} formAction={formAction} formState={formState} handleModal={handleAddModal}></QuestionForm>                    
                    )
                }

                {
                    showEdit && (
                        <QuestionForm mode="EDIT" quizId={props.quizId} questionId={questionId} formAction={EditQuestionformAction} formState={EditQuestionformState} handleModal={handleEditQuestionModal}></QuestionForm>                    
                    )
                }
            </div>
        </div>
    )
}