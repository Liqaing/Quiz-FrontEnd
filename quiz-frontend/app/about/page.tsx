

const About = () => {
    return (
        <section className="h-full">
            <div className="min-h-full p-24 flex flex-col gap-4">            
                <div className="text-2xl px-4 py-2 mx-auto border border-green-600 bg-green-500/50 rounded-md">Welcome to Quiz Application</div>
                
                <div className="px-4 py-2 mx-auto border border-cyan-600 bg-cyan-500/50 rounded-md">
                    <ul className="list-disc">
                       Our main goal :&nbsp;
                        <li className="ml-6">Develop a new and easy quiz system for education of general people</li>
                    </ul>
                </div>
            </div>
        </section>
        
    )
}

export default About;