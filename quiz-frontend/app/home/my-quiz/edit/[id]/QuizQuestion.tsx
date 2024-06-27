"use client"

import QuestionView from "@/components/View/question/QuestionListView";
import DeleteModal from "@/components/form/DeleteModal/DeleteModel";
import QuestionForm from "@/components/form/admin/question/add/Question";
import QuizDetailFrom from "@/components/form/admin/quiz/QuizDetail";
import { QuizData } from "@/type/type";
import { FetchDisplayQuiz } from "@/utils/API/quiz/FetchDisplayQuiz";
import CreateQuestionAction from "@/utils/Actions/admin/Question/CreateQuestion";
import DeleteQuestionAction from "@/utils/Actions/admin/Question/DeleteQuestion";
import EditQuestionAction from "@/utils/Actions/admin/Question/EditQuestion";
import DeleteQuizAction from "@/utils/Actions/admin/quiz/DeleteQuizAction";
import EditQuizAction from "@/utils/Actions/admin/quiz/EditQuizAction";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";



export default function QuizQuestion(props: {quizId:string, pathBack:string}) {

    const [quizData, setQuizData] = useState<QuizData | null>(null);

    async function FetchQuiz(quizId:string) {
        const data = await FetchDisplayQuiz(quizId);
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

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [questionId, setQuestionId] = useState("");

    const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);
    const [showEditQuiz, setshowEditQuiz] = useState(false);
    const [quizId, setQuizId] = useState("");

    useEffect(() => {       
        FetchQuiz(props.quizId);
    }, [showAdd, showEdit, showDeleteModal]);

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

    function handleDeleteModal(questionId:string) {
        if (showDeleteModal) {
            setShowDeleteModal(false);
            setQuestionId("");            
        }
        else {
            setShowDeleteModal(true);
            setQuestionId(questionId);
        }
    }

    function handleDeleteQuizModal(quizId:string) {
        if (showDeleteQuizModal) {
            setShowDeleteQuizModal(false);
            setQuizId("");            
        }
        else {
            setShowDeleteQuizModal(true);
            setQuizId(quizId);
        }
    }

    function handleEditQuizModal(quizId: string) {
        if (showEditQuiz) {
          setshowEditQuiz(false);
          setQuizId("");
        }
        else {
          setshowEditQuiz(true);
          setQuizId(quizId);
        }
    }

    const initialState = {
        message: ""
    };
    const [formState, formAction] = useFormState(CreateQuestionAction, initialState);
    const [EditQuestionformState, EditQuestionformAction] = useFormState(EditQuestionAction, initialState);
    const [DeleteQuestionformState, DeleteQuestionformAction] = useFormState(DeleteQuestionAction, initialState);
    const [DelteQuizFormState, DeleteQuizFormAction] = useFormState(DeleteQuizAction, initialState);
    const [EditQuizFormState, EditQuizformAction] = useFormState(EditQuizAction, initialState);
    
    return (
        <div className="max-w-screen-xl mx-auto p-2">             

            <div className="flex flex-col justify-between border-b-2 pb-4">

                <div className="flex justify-between w-full mb-3">
                    
                    <Link href={props.pathBack} className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                        <svg className="w-3 h-3 me-2 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Go back</span>
                    </Link>
                    <div className="flex gap-2">
                        <Button onClick={() => handleEditQuizModal(props.quizId)} className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http: //www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 4V3a2 2 0 1 1 4 0v1h5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4zm-3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm5 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10zm4 0a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10z"/>
                            </svg>
                            Edit&nbsp;<span className="md:inline hidden">Quiz</span>
                        </Button>

                        <Button onClick={() => handleDeleteQuizModal(props.quizId)} className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2">
                            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http: //www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 4V3a2 2 0 1 1 4 0v1h5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4zm-3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm5 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10zm4 0a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10z"/>
                            </svg>
                            Delete&nbsp;<span className="md:inline hidden">Quiz</span>
                        </Button>
                    </div>                    
                </div>

                <div className="w-full">
                    <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">{name}</p>                                            
                    <p className="lg:text-base md:text-sm my-1 text-[0.8rem] hyphens-auto font-extralight">
                        {description}
                    </p>
                </div>
                <div className="w-full flex justify-end gap-3 mt-5 text-end lg:text-sm text-xs">
                    <p>
                        Created - {((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()}                
                    </p>
                    <p>
                        Visibility - {visibility}
                    </p>
                </div>                            

            </div>
            <div className="mt-4">
                <div className="w-full flex justify-between">
                    <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">Question</p>
                    
                    <Button onClick={handleAddModal} className="text-white md:text-sm text-xs inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Question
                    </Button>
                </div>

                <QuestionView data={quizData} handleEditQuestionModal={handleEditQuestionModal} handleDeleteModal={handleDeleteModal}></QuestionView>

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

                {
                    showDeleteModal && (
                        <DeleteModal id={questionId} modalHandler={handleDeleteModal} formAction={DeleteQuestionformAction} formState={DeleteQuestionformState} pathBack={null}></DeleteModal>
                    )
                }

                {
                    showDeleteQuizModal && (
                        <DeleteModal id={quizId} modalHandler={handleDeleteQuizModal} formAction={DeleteQuizFormAction} formState={DelteQuizFormState} pathBack={null}></DeleteModal>
                    )
                }

                {
                    showEditQuiz &&
                    (
                        <QuizDetailFrom mode="EDIT" formAction={EditQuizformAction} formState={EditQuizFormState} quizId={quizId} modelHandler={handleEditQuizModal}></QuizDetailFrom>
                    )
                }
            </div>
        </div>
    )
}