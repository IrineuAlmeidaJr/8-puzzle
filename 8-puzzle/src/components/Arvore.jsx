import { PuzzleShow } from "../components/PuzzleShow";

export function Arvore (props) {

    let numPasso = 0;

    return ( 
        <div className="grid md:grid-cols-2 lg:grid-cols-4 overflow-auto w-full">
            {
                props.lista.map(num => {
                    numPasso++;
                    return <div 
                            key={numPasso}
                            className="flex flex-col m-1 items-center"
                            >
                                <h2 className="my-2 p-1 text-lg font-bold text-center"> 
                                    {numPasso}º Visitado
                                </h2>
                                <PuzzleShow 
                                    listaNum={num}                
                                />
                            </div>
                    
                })
            }                
        </div>
    )



}