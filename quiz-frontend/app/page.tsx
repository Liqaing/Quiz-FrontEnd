import Quizzes from "@/components/quiz/quiz";
import { FetchQuiz } from "../utils/Actions/Home/quiz-actions";

export default function home() {
  return (
    <section className="block">        
      <Quizzes FetchQuiz={FetchQuiz}></Quizzes>        
    </section>
  );
}
