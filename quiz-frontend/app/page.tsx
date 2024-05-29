import Quizzes from "@/components/quiz/quiz";
import AllQuiz from "@/components/quiz/quiz";
import FetchQuiz from "@/lib/quiz/fetch-quiz";

export default async function home() {
      
  const quizzes:any = FetchQuiz({page:0});
  let quizList = quizzes.quizzes;
  
  console.log(quizzes, "aa");

  return (
    <section className="block">
      <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row auto-rows-max mx-auto p-4 gap-6">
        <Quizzes quizList={quizList}></Quizzes>
      </div>
    </section>
  );
}
