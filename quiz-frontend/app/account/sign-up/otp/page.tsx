"use client";

import Loading from '@/components/loading';
import otp from '@/utils/Actions/Auth/Otp-action';
import { reSendOtp } from '@/utils/Actions/Auth/ResendEmail-action';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { toast } from 'sonner';

const queryClient = new QueryClient();

const page = () => {

  const searchParams = useSearchParams()
  const search = searchParams.get('email')

  return (
    <QueryClientProvider client={queryClient}>
      <Form email={search ? search : ""}/>
    </QueryClientProvider>
  )
}

export default page

const Form = ({email} : {email: string}) => {

  const [passCode, setPassCode] = useState<string>("");

  const{mutate: server_otp, isPending} = useMutation({
    mutationFn: otp,
    onSuccess: () => {
      toast("Success");
    },
    onError: (e: any) => {
      toast(e.message);
    }
  })


  const{mutate: server_resend, isPending: isPendingResend} = useMutation({
    mutationFn: reSendOtp,
    onSuccess: (data) => {
      toast(data);
    },
    onError: (e: any) => {
      toast(e.message);
    }
  })


  return (
    <>
      
      <div className="flex min-h-[80%] flex-1 flex-col justify-center px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight" >
            Register Your Email
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action={(formdata: FormData) => server_otp(formdata)}>

            <div>
                <div className="w-full text-center font-medium text-md leading-6">
                  We've send an Email to <strong className='text-amber-300'>{email}</strong>, Please check your email!
                </div>
                <div className="mt-2 text-slate-400">
                  <input
                    id="email"
                    name="email"
                    type="hidden"
                    autoComplete="email"
                    value={email}
                    required
                    placeholder='Example@gmail.com'
                    className="block w-full h-10 rounded-md border-0 dark:bg-slate-600 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
              <div className="flex items-center justify-between">
                  <div className="block text-sm font-medium leading-6 ">
                    Email One Time Password
                  </div>
                </div>
              </div>
              <OTPInput
                value={passCode}
                onChange={setPassCode}
                numInputs={6}
                renderSeparator={<span></span>}
                containerStyle={"mt-2 grid grid-cols-6 gap-1 sm:gap-2"}
                skipDefaultStyles={true}
                renderInput={(props) => 
                  <input 
                    {...props}
                    type="text"
                    
                    name="otp"
                    className="block text-center w-full aspect-square rounded-md border-0 dark:bg-slate-600 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                }
              />
              <div>
              <div className='h-6'></div>
              <div className='flex gap-2 '>
                <button
                  type="button"
                  onClick={() => server_resend({email})}
                  className="flex w-full justify-center rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                >
                  Resend
                </button>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}