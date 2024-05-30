import Quizzes from "@/components/quiz/quiz";
import AllQuiz from "@/components/quiz/quiz";
import { FetchQuiz } from "./actions";

export default async function home() {
      
  const quizResult:any = await FetchQuiz({page:0});

  return (
    <section className="block">
      <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-max mx-auto p-4 gap-6">
        <Quizzes quizList={quizResult.quizList} isEnd={quizResult.isEnd}></Quizzes>
      </div>
      
    </section>
  );
}
