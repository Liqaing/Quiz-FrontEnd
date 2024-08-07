import { member, roleMember } from '@/utils/data'
import Image from 'next/image'

const page = () => {
  return (
    <main className="mx-auto lg:w-full md:max-w-3xl overflow-y-scroll">
      <div className="text-center text-xl sm:text-2xl font-extrabold pt-10 mb-8 px-2">
        Developed By E1 Group1 RUPP G25
      </div>
      <section className="flex justify-center items-center mt-20">
        <Profile name={"Sovisal Chenda"} position={"Professor & Supervisor"} image={"/SovisalChenda.jpeg"} />
      </section>
      <section className='px-4 mt-16 flex flex-wrap justify-evenly gap-x-16 gap-y-16'>
        {
          member.map((item, index) => {
            return (
              <Profile key={index} name={item.name} position={item.position} image={item.image} />
            )
          })
        }
      </section>
      <div className="text-center text-xl sm:text-2xl font-extrabold py-4 px-2 mt-20">
        Each Role
      </div>
      <section className='px-4' >
        {
          roleMember.map((item, index) => {
            return (
              <RoleMember key={index} title={item.title} profile={item.team}/>
            )
          })
        }
      </section>
      <section className='h-8'></section>
    </main>
  )
}

export default page

const Profile = (props: {image: string, name: string, position: string}) => {
  return (
    <div className='max-w-36'>
        <div className='overflow-hidden min-w-32 mx-auto aspect-square rounded-full ring-4 ring-blue-600 '>
          <Image src={props.image} width={500} height={500} alt={props.name} />
        </div>
        <div className='mt-4 flex flex-col justify-center items-center gap-2 '>
          <div className='text-lg font-bold'>{props.name}</div>
          <div className='text-center min-w-60'>{props.position}</div>
        </div>
      </div>
  )
}

const RoleMember = (props: {title: string, profile: {name: string, position: string, image: string}[]}) => {
  return (
    <div className='mt-16 dark:bg-slate-500 bg-slate-200 px-2 py-2 sm:px-8 sm:py-4 rounded-2xl shadow-md dark:shadow-slate-400 shadow-slate-500'>
      <div className='text-lg text-center sm:text-xl underline underline-offset-4 decoration-cyan-800 decoration-2 font-bold pl-4 sm:pl-0'>{props.title}</div>
      <div className='mt-10 flex flex-wrap justify-evenly gap-x-16 gap-y-16'>
        {
          props.profile.map((item, index) => {
            return (
              <Profile key={index} name={item.name} position={item.position} image={item.image} />
            )
          })
        }
      </div>
    </div>
  )
}