
"use client";

import PlayQuiz from "@/components/form/Play/PlayQuiz";
import { QuizData } from "@/type/type";
import FetchPlayQuiz from "@/utils/API/play/fetchAllPlayQuiz";
import CreateQuizAction from "@/utils/Actions/admin/quiz/CreateAction";
import submitAnswer from "@/utils/Actions/Home/play/submitAnswer";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function PlayPage( { params }: { params: {id: string} }) {

    const [quizData, setQuizData] = useState<QuizData | null>(null);


    async function fetchPlay() {
        if (params.id) {
            const data = await FetchPlayQuiz(params.id);
            if (data) {            
                setQuizData(data);
            }
        }                
    }

    useEffect(() => {       
        fetchPlay();
    }, []);

    const initialState = {
        message: "",
        result: null
    };
    const [formState, formAction] = useFormState(submitAnswer, initialState);

    return (
        <section className="block">
            <div className="max-w-screen-xl mx-auto p-2">
            <div className="flex justify-between border-b-2 pb-4">
                <div className="w-10/12">
                    <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">{quizData?.name}</p>
                    <p className="lg:text-md md:text-sm my-1 text-[0.8rem] hyphens-auto font-extralight">
                        {quizData?.description}
                    </p>
                </div>               
            </div>
                <PlayQuiz quiz={quizData} formAction={formAction} formState={formState}></PlayQuiz>
            </div>
        </section>
    )
} 