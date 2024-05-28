import AllQuiz from "@/components/quiz/quiz";
import { cookies } from "next/headers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Quiz {
  name: string;
}

export default async function home() {
    
  const reqHeaders = new Headers();
  const userCookies = cookies().get("quiz-session");

  reqHeaders.append("Content-Type", "application/json");
  if (userCookies != null) {
    reqHeaders.append("Authorization", "Bearer " + String(userCookies));    
  }

  // console.log(reqHeaders.get("Authorization"))

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
  // console.log(url)
  const response = await fetch(
    // url.href,
    "https://quiz-uy6f.onrender.com/api/quiz/findAll?orderBy=NAME&order=ASC&page=0&size=TEN",
    {
      method: "GET",
      headers: reqHeaders
    }
  )

  let quizzes:any =  response.json(); 

  console.log("Qui Rithy")
  console.log(quizzes)
  let quizList = quizzes["quizzes"];
  console.log("Rithy1")
  
  return (
    <section className="block">
      <div className="max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row auto-rows-max mx-auto p-4 gap-6">            
          {
            quizList.map((quiz: any) => (          
              <div key={quiz.id} className="sm:w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <Link href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{quiz["name"]}</h5>
                  </Link>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{quiz["description"]}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <small >Create: {new Date(quiz["createdAt"]).toDateString()}</small>                    
                  </p>
                  <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Play
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </Link>
              </div>
            ))
          } 
      </div>
    </section>
    
  );
  // return (
  //   <div>main</div>
  // )
}