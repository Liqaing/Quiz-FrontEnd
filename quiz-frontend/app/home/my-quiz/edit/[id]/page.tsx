import Link from "next/link";
import QuizQuestion from "./QuizQuestion";


export default function EditQuiz({ params }: { params: { id: string, name: string, visibility:string, createdAt:string, description:string } }) {

    
    return (
        <section className="px-4">   
            <div className="max-w-screen-xl mx-auto mt-5">
                <QuizQuestion quizId={params.id} pathBack="/home/my-quiz"></QuizQuestion>               
            </div>            
        </section>
    )
}