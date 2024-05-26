
const AllQuiz = async () => {

    const response = await fetch('http://localhost:8080/api/quiz/findAll?' +
        new URLSearchParams({
            orderBy: "DATA",
            order: "DESC",
            page: "0",
            size: "TWENTY",
        })
    );

    let quizzes = await response.json();
    console.log(quizzes)

    return (
        <div className="max-w-screen-xl">
            Hello
        </div>
    )
}
  
export default {AllQuiz};

// {quizzes.map((quiz:any) => {
//     quiz["name"]
// })}