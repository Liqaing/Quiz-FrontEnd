import AllQuiz from "@/components/quiz/quiz";
import { cookies } from "next/headers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Quiz {
  id: string,
  name: string,
  description: string,
  visibility: string,
  createdAt: Date,
  updatedAt: Date,
}

export default async function home() {
    
  const reqHeaders = new Headers();
  reqHeaders.append("Content-Type", "application/json");

  // Retreive jwt bearer from cookie
  const userCookies = cookies().get("quiz-session");  
  
  if (userCookies != null) {
    reqHeaders.append("Authorization", "Bearer " + String(userCookies.value));    
  }

  const url = new URL(`${process.env.BASE_API_URL}api/quiz/findAll` as string);
  const searchParams = new URLSearchParams(
    {
      orderBy: "DATE",
      order: "DESC",
      page: "0",
      size: "TWENTY"
    }
  );

  url.search = searchParams.toString();  

  try {
      const response = await fetch(url.href, {
        method: "GET",
        headers: reqHeaders
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const quizzes: { quizzes: Quiz[] } = await response.json();
      let quizList = quizzes.quizzes;

      return (
        <section className="block">
          <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row auto-rows-max mx-auto p-4 gap-6">
            {quizList.map((quiz: Quiz) => (
              <div key={quiz.id} className="sm:w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quiz.name}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{quiz.description}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <small>Create: {new Date(quiz.createdAt).toDateString()}</small>
                </p>
                <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Play
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>
      );
    } catch (error) {
      console.error('An error occurred:', error);      
    }
}