import Quizzes from "@/components/quiz/quiz";
import { FetchQuiz } from "../utils/Actions/Home/quiz-actions";

export default function home() {
  return (
    <section className="block">
        <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-max mx-auto p-4 gap-6">
        <Quizzes FetchQuiz={FetchQuiz}></Quizzes>
      </div>
    </section>
  );
}
