import Image from 'next/image'

const page = () => {
  return (
    <main className="mx-auto lg:w-full md:max-w-3xl h-[90vh]">
      <div className="text-center text-xl sm:text-2xl font-extrabold py-4 px-2">
        Develop By E1 Group1 RUPP G25
      </div>
      <section className='mt-20 flex flex-wrap justify-evenly gap-x-16 gap-y-16'>
        <Profile name="Hor KimHouy" position="Team Leader" image="/HorKimHouy.jpg"/>
        <Profile name="Hout Rithy" position="Backup Leader" image="/defaultProfile.bmp"/>
        <Profile name="Vorn Navatra" position="Team Member" image="/defaultProfile.bmp"/>
        <Profile name="Oem YongSinh" position="Team Member" image="/defaultProfile.bmp"/>
        <Profile name="Heng KeaHak" position="Team Member" image="/defaultProfile.bmp"/>
        <Profile name="Um Sethey" position="Team Member" image="/defaultProfile.bmp"/>
        <Profile name="Ol Eevin" position="Team Member" image="/defaultProfile.bmp"/>
      </section>
      <div className="text-center text-xl sm:text-2xl font-extrabold py-4 px-2 mt-20">
        Each Role
      </div>
      <section className='px-4' >
        <div className='mt-16 bg-slate-400 px-8 py-4 rounded-2xl'>
          <div className='text-lg sm:text-xl font-bold'>Backend Development</div>
          <div className='mt-10 flex flex-wrap justify-start gap-x-16 gap-y-16'>
            <Profile name="Hor KimHouy" position="Backend Developer" image="/HorKimHouy.jpg"/>
            <Profile name="Hout Rithy" position="Backend Support" image="/defaultProfile.bmp"/>
          </div>
        </div>

        <div className='mt-16 bg-slate-400 px-4 py-2 rounded-2xl'>
          <div className='text-lg sm:text-xl font-bold p-4'>Frontend Development</div>
          <div className='mt-10 flex flex-wrap justify-start gap-x-16 gap-y-16'>
            <Profile name="Hout Rithy" position="Frontend Developer" image="/defaultProfile.bmp"/>
            <Profile name="Hor KimHouy" position="Frontend Support" image="/HorKimHouy.jpg"/>
          </div>
        </div>

        <div className='mt-16 bg-slate-400 px-4 py-2 rounded-2xl'>
          <div className='text-lg sm:text-xl font-bold p-4'>Tester</div>
          <div className='mt-10 flex flex-wrap justify-start gap-x-16 gap-y-16'>
            <Profile name="Vorn Navatra" position="API Tester" image="/defaultProfile.bmp"/>
            <Profile name="Oem YongSinh" position="Documentation Specialist" image="/defaultProfile.bmp"/>
          </div>
        </div>

        <div className='mt-16 bg-slate-400 px-4 py-2 rounded-2xl'>
          <div className='text-lg sm:text-xl font-bold p-4'>Presentaion</div>
          <div className='mt-10 flex flex-wrap justify-start gap-x-16 gap-y-16'>
        <Profile name="Heng KeaHak" position="PowerPoint Designer" image="/defaultProfile.bmp"/>
          </div>
        </div>
      </section>
      <section className='h-8'></section>
    </main>
  )
}

export default page

const Profile = (props: {image: string, name: string, position: string}) => {
  return (
    <div className='w-36'>
        <div className='overflow-hidden w-32 mx-auto aspect-square rounded-full ring-4 ring-blue-600 '>
          <Image src={props.image} width={500} height={500} alt={props.name} />
        </div>
        <div className='mt-4 flex flex-col justify-center items-center gap-2 '>
          <div className='text-lg font-bold'>{props.name}</div>
          <div className='text-center'>{props.position}</div>
        </div>
      </div>
  )
}