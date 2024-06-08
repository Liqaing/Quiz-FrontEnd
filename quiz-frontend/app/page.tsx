import Quizzes from "@/components/quiz/quiz";
import AllQuiz from "@/components/quiz/quiz";
import { FetchQuiz } from "../utils/Actions/Home/quiz-actions";
import CheckLogin from "@/utils/Actions/Auth/CheckLogin";
import { redirect } from "next/navigation";

export default async function home() {
      
  const quizResult:any = await FetchQuiz({page:0});
    const isUserLogin = CheckLogin();
    if (!isUserLogin) {
      redirect("/account/login");
    }
  return (
    <section className="block">
        <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row auto-rows-max mx-auto p-4 gap-6">
        <Quizzes quizList={quizResult.quizList} isEnd={quizResult.isEnd}></Quizzes>
      </div>
      
    </section>
  );
}
