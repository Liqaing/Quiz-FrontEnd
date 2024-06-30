export default function ViewModeSlider(props: {toggleShowMode:Function, showAnswer:boolean, handleAddModal:any}) {
    return (
        <div className="w-full flex justify-between">
        
            <div className="relative flex w-fit">
                <div className="grid grid-cols-2 gap-2 items-center z-10">
                    <p
                        onClick={() => props.toggleShowMode(true)}
                        className="lg:w-32 md:w-16 pr-2 text-center lg:text-lg md:text-base text-xs font-semibold uppercase text-gray-900 dark:text-white cursor-pointer z-10"
                    >
                        Question
                    </p>
                    <p
                        onClick={() => props.toggleShowMode(false)}
                        className="lg:w-32 md:w-16 pl-2 text-center lg:text-lg md:text-base text-xs font-semibold uppercase text-gray-900 dark:text-white cursor-pointer z-10"
                    >
                        Player
                    </p>
                    </div>

                    <span
                        className={`bg-blue-600/50 shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-300 ease-linear absolute top-[4px] ${
                            props.showAnswer ? "translate-x-[-4%]" : "translate-x-[104%]"
                        }`}
                        style={{ zIndex: 0 }}
                    ></span>
            </div>
            
            
                <button
                    onClick={props.handleAddModal}
                    className={`${props.showAnswer ? "visible" : "invisible"} text-white md:text-sm text-xs inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                    Add&nbsp;<span className="xs:hidden sm:inline-block">Question</span>
                </button>
        
        </div>
    )
}