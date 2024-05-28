
import Link from "next/link";
import SignUpForm from "./form";

const SignUp = () => {   
    
    return (
        <section className="h-full bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto h-full">                
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                
                        <SignUpForm></SignUpForm>
                
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link href="/account/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp;