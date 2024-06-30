
import Link from "next/link";

export default function ViewQuizHeader(props: {handleEditQuizModal:Function, handleDeleteQuizModal:Function, pathBack:string, quizId:string, name:string | null, description:string | null, date:Date, visibility:string | null}) {
    return (
        <div className="flex flex-col justify-between border-b-2 pb-4">
        <div className="flex justify-between w-full mb-3">
          <Link
            href={props.pathBack}
            className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-blue-800 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2"
          >
            <svg
              className="w-3 h-3 me-2 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>Go back</span>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => props.handleEditQuizModal(props.quizId)}
              className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-blue-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2"
            >
              <svg
                className="w-3 h-3 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.414 2.586a2 2 0 0 1 0 2.828l-10 10a2 2 0 0 1-1.272.586H4a1 1 0 0 1-1-1v-2.142a2 2 0 0 1 .586-1.272l10-10a2 2 0 0 1 2.828 0zm-2.828 2.828l-10 10H4v-1.586l10-10 1.586 1.586zm-1.414-1.414L14 4.172 15.828 6 17 4.828 14.828 2.586z" />
              </svg>
              Edit&nbsp;<span className="md:inline hidden">Quiz</span>
            </button>

            <button
              onClick={() => props.handleDeleteQuizModal(props.quizId)}
              className="inline-flex justify-center items-center sm:px-4 sm:py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-red-400 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white xs:py-1 xs:px-2"
            >
              <svg
                className="w-3 h-3 me-2"
                aria-hidden="true"
                xmlns="http: //www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 4V3a2 2 0 1 1 4 0v1h5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h4zm-3 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9zm5 1a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10zm4 0a1 1 0 1 0-2 0v6a1 1 0 0 0 2 0V10z" />
              </svg>
              Delete&nbsp;<span className="md:inline hidden">Quiz</span>
            </button>
          </div>
        </div>

        <div className="w-full">
          <p className="lg:text-lg md:text-base font-semibold uppercase text-gray-900 dark:text-white">{props.name}</p>
          <p className="lg:text-base md:text-sm my-1 text-[0.8rem] hyphens-auto font-extralight">{props.description}</p>
        </div>
        <div className="w-full flex justify-end gap-3 mt-5 text-end lg:text-sm text-xs">
          <p>
            Created -{" "}
            {((props.date.getMonth() > 8 ? props.date.getMonth() + 1 : "0" + (props.date.getMonth() + 1)) +
              "/" +
              (props.date.getDate() > 9 ? props.date.getDate() : "0" + props.date.getDate()) +
              "/" +
              props.date.getFullYear())}
          </p>
          <p>Visibility - {props.visibility}</p>
        </div>
      </div>
    )
}