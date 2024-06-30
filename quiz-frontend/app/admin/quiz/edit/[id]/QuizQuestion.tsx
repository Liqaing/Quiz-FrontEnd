"use client"

import Loading from "@/app/loading";
import DataTable from "@/components/Table/player/DataTable";
import ViewModeSlider from "@/components/View/Quiz/ViewModeSlider";
import ViewQuizHeader from "@/components/View/Quiz/ViewQiuzHeader";
import QuestionView from "@/components/View/question/QuestionListView";
import DeleteModal from "@/components/form/DeleteModal/DeleteModel";
import QuestionForm from "@/components/form/admin/question/add/Question";
import QuizDetailFrom from "@/components/form/admin/quiz/QuizDetail";
import { QuizData } from "@/type/type";
import { fetchTable } from "@/utils/API/Player/table/fetch-player";
import { FetchDisplayQuiz } from "@/utils/API/quiz/FetchDisplayQuiz";
import CreateQuestionAction from "@/utils/Actions/admin/Question/CreateQuestion";
import DeleteQuestionAction from "@/utils/Actions/admin/Question/DeleteQuestion";
import EditQuestionAction from "@/utils/Actions/admin/Question/EditQuestion";
import DeleteQuizAction from "@/utils/Actions/admin/quiz/DeleteQuizAction";
import EditQuizAction from "@/utils/Actions/admin/quiz/EditQuizAction";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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

    // const baseUrl = usePathname();    
    // const currentUrl:string = `${baseUrl}?name=${name}&visibility=${visibility}&createdAt${createDate}&description=${description}`;

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteQuizModal, setShowDeleteQuizModal] = useState(false);
    const [questionId, setQuestionId] = useState("");
    const [quizId, setQuizId] = useState("");

    const [showEditQuiz, setshowEditQuiz] = useState(false);

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

    const [showAnswer, setShowAnswer] = useState(true);

    const toggleShowMode = (isShowAnser:boolean) => {
        setShowAnswer(isShowAnser);
    };

    useEffect(() => {       
        FetchQuiz(props.quizId);
    }, [DelteQuizFormState, EditQuizFormState, DeleteQuestionformState, EditQuestionformState, formState]);

    return (
        <div className="max-w-screen-xl mx-auto p-2">             
            <ViewQuizHeader
                handleEditQuizModal={handleEditQuizModal}
                handleDeleteQuizModal={handleDeleteQuizModal}
                pathBack={props.pathBack}
                quizId={props.quizId}
                name={name}
                description={description}
                date={date}
                visibility={visibility}
            ></ViewQuizHeader>

            <div className="mt-4">

                <ViewModeSlider
                    toggleShowMode={toggleShowMode}
                    showAnswer={showAnswer}
                    handleAddModal={handleAddModal}
                />

{
                showAnswer && (
                  <Suspense fallback={<Loading/>}>
                        <QuestionView
                            data={quizData}
                            handleEditQuestionModal={handleEditQuestionModal}
                            handleDeleteModal={handleDeleteModal}
                        ></QuestionView>
                    </Suspense>
                    )
                }

                {
                    !showAnswer && (
                        <Suspense fallback={<Loading/>}>
                        <DataTable fetchTable={fetchTable} quizId={props.quizId}/>
                        </Suspense>
                    )
                }
            
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