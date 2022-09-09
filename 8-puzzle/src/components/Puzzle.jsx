

export function Puzzle (props) {



    return (              
        <div 
        className="
            w-[200px] 
            h-[200px] 
            mt-2 grid 
            grid-rows-3 
            grid-flow-col 
            border-solid 
            border-2 
            border-sky-500
            rounded-md"
        >
            {
                props.listaNum.map(num => (
                    <div 
                    className="
                        flex 
                        flex-col 
                        items-center 
                        border-solid 
                        border-2
                        border-sky-500 
                        bg-gray-500"
                    key={num}
                    >
                        <p 
                        className="
                            flex flex-1 
                            items-center 
                            font-bold 
                            text-lg 
                            text-white" 
                        >
                            {num}
                        </p>
                    </div>
                ))
            }

            

        </div>
        
    )
}