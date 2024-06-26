"use client";

import QuizContent from "@/components/Table/quiz/QuizContent";
import DeleteModal from "@/components/form/DeleteModal/DeleteModel";
import QuizDetailFrom from "@/components/form/admin/quiz/QuizDetail";
import { QuizData } from "@/type/type";
import FetchMyQuiz from "@/utils/API/quiz/FetchMyQuiz";
import CreateQuizAction from "@/utils/Actions/admin/quiz/CreateAction";
import DeleteQuizAction from "@/utils/Actions/admin/quiz/DeleteQuizAction";
import EditQuizAction from "@/utils/Actions/admin/quiz/EditQuizAction";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react"
import { useFormState } from "react-dom";

export default function MyQuiz() {

    const [quiz, setQuiz] = useState<QuizData|null>();

    async function FetchQuiz() {
        try {
            const res: QuizData|null = await FetchMyQuiz();
            if (res) {
                setQuiz(res);
            }
        }
        catch(err) {}
    }

    const [quizId, setQuizId] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEditQuiz, setshowEditQuiz] = useState(false);

    function handleDeleteModal(id: string) {
        if (showDelete) {
            setShowDelete(false);
            setQuizId("");
        }
        else {
            setShowDelete(true);
            setQuizId(id);
        }
    }

    function handleEditModal(id: string) {
        if (showEditQuiz) {
          setshowEditQuiz(false);
          setQuizId("");
        }
        else {
          setshowEditQuiz(true);
          setQuizId(id);
        }
    }

    function handleAddModal() {
    if (showAdd) {
        setShowAdd(false);
    }  
    else {
        setShowAdd(true);
    }
    }

    useEffect(() => {
        FetchQuiz()
    }, [showDelete, showEditQuiz]);

    const initialState = {
        message: ""
    };
    const [formState, formAction] = useFormState(CreateQuizAction, initialState);
    const [DelteFormState, DeleteFormAction] = useFormState(DeleteQuizAction, initialState);
    const [EditFormState, EditformAction] = useFormState(EditQuizAction, initialState);

    return (
        <section className="block">
            <div className="max-w-screen-xl mx-auto p-2">
                <div className="h-full w-full flex flex-col justify-between items-center gap-2">

                    <div className="w-full flex justify-start py-2 px-1 gap-2 sm:gap-4">
                        <Button onClick={handleAddModal} className="xs:w-21 md:w-26 inline-flex items-center text-black dark:text-white px-2 py-2 w-17 text-center h-8 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 xs:text-xs md:text-md sm:leading-6 dark:bg-slate-700">
                            <svg className="w-5 h-5 sm:me-1 xs:m-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H5a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"/>
                            </svg>
                            <span className="sm:block xs:hidden">
                                ADD
                            </span>
                        </Button>
                    </div>

                    <div className="w-full overflow-y-scroll overflow-x-hidden rounded-lg h-[80vh]">  
                        <QuizContent path="/home/my-quiz" data={quiz} handleDeleteModal={handleDeleteModal} handleEditForm={handleEditModal}/>
                    </div>

                    {
                        showAdd &&
                        (
                            <QuizDetailFrom mode="ADD" formAction={formAction} formState={formState} quizId={quizId} modelHandler={handleAddModal}></QuizDetailFrom>
                        )
                    }

                    {
                        showEditQuiz &&
                        (
                            <QuizDetailFrom mode="EDIT" formAction={EditformAction} formState={EditFormState} quizId={quizId} modelHandler={handleEditModal}></QuizDetailFrom>
                        )
                    }

                    {
                        showDelete &&
                        (
                            <DeleteModal modalHandler={handleDeleteModal} formAction={DeleteFormAction} formState={DelteFormState} id={quizId}></DeleteModal>
                        )
                    }
                </div>
            </div>
        </section>
    )
} 