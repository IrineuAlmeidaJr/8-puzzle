import { useEffect, useState } from "react";

import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import SendIcon from '@mui/icons-material/Send';

import { Puzzle } from "../components/Puzzle"


export function Home() {
    const [listaNum, setListaNum] = useState(['2','8','3','6','5','4','7','1',' ']);
    const [estadoFinal, setEstadoFinal] = useState(['2','8','3','6','5','4','7','1',' ']);
    const [novoEstado, setNovoEstado] = useState('');
    const [gambiara, setGambiara] = useState([]);

    function procuraBranco() {
        let pos = 0;
        while (pos < listaNum.length && listaNum[pos] !== ' ') {
            pos++;
        }

        return pos; 
    }

    function randomList2() {
        let i = 0;
        let listaAux = [];
        let posMover = 0;
        let posBranco = 0;
        let sinal = 0;
        let posRandom = 0;

        // while(i < 100)  {          
            posBranco =  procuraBranco();
            listaAux = listaNum;
            // Pode: -3, -1, 1, 3            
            sinal = Math.floor(Math.random() * 2); // 0 = negativo | 1 = positivo
            posRandom = Math.floor(Math.random() * 2) * 2 + 1; // 1 ou 3
            if(sinal) { // negativo 
                posRandom *= -1;              
            }
            
            posMover = posBranco + posRandom;         
            if(posMover >= 0 && posMover < 9 && 
                !(posMover == 2 && posBranco == 3) &&
                !(posBranco == 2 && posMover == 3) &&
                !(posMover == 5 && posBranco == 6) &&
                !(posBranco == 6 && posMover == 5)) {
                console.log(`posMover: ${posMover} | posBranco: ${posBranco}`)
                listaAux[posBranco] = listaAux[posMover];
                listaAux[posMover] = ' ';
                setListaNum(listaAux);
                
                i++;               
            }
        // }
        
    }

    function randomList() {
        for(let i = 0; i < 20; i++) {
            setTimeout(() => randomList2(), 350 * i );
        }
        
    }

    function gerarNovoEstado() {
        let aux = [];
        if(novoEstado.length == 9) {
            for(let i = 0; i < novoEstado.length; i++) {
                if(novoEstado[i] === '0') {
                    aux.push(' ');
                } else {
                    aux.push(novoEstado[i]);
                }                
            }
            setEstadoFinal(aux);
            setListaNum(aux.slice());
        }
    }

    useEffect(() => {
        console.log('Carregou')
        setGambiara(['1', ' ', '3', '4', '5', '2', '6', '7', '8']);
        // setListaNum(['1', ' ', '3', '4', '5', '2', '6', '7', '8']);
        // setEstadoFinal(['2', ' ', '4', '3', '8', '1', '6', '7', '5']);
    }, [gambiara]);

    return (
        <div className="bg-blue-50 h-screen">
            <aside 
            className="
                w-[250px]
                h-screen 
                bg-gray-300 
                flex 
                flex-col"
            >

                <h1 className="my-2 p-1 text-3xl font-bold text-center text-white bg-[#1876d2]">
                    8 Puzzle 
                </h1>

                <div className="flex flex-col items-center">
                    {/* Numeros Escolhidos E depos Randomico - que Irão modificar */}
                    <Puzzle 
                        listaNum={listaNum} 
                                      
                    />
                    <p className="
                        w-[100%] 
                        mb-2 
                        p-1 
                        border-b-4 
                        border-[#1876d2] 
                        font-bold 
                        text-center 
                        text-[#1876d2]"
                    >
                        Embaralhada
                    </p>
                    
                    {/* Numeros Escolhido para Estado Final */}                    
                    <Puzzle 
                        listaNum={estadoFinal}                
                    />
                    <p 
                    className="
                        w-[100%]
                        mb-2 
                        p-1 
                        border-b-4 
                        border-[#1876d2] 
                        font-bold 
                        text-center 
                        text-[#1876d2]"
                    >
                        Objetivo
                    </p>
                </div>

                <div 
                className="
                    flex 
                    flex-col 
                    items-center
                    mx-[25px]
                    mt-3
                    "
                >
                    <Button 
                    variant="contained"
                    color="primary"
                    onClick={randomList}
                    fullWidth
                    >
                        Embaralhar
                    </Button>

                    <Stack direction="row" spacing={2}>
                        <TextField 
                        label={'Ex: 123045678'} 
                        id="margin-none"
                        fullWidth 
                        margin="normal"
                        size="small"
                        onChange={e => setNovoEstado(e.target.value)}
                        />

                        <IconButton 
                        color="primary"  
                        component="label"
                        onClick={gerarNovoEstado}
                        >
                            <SendIcon />
                        </IconButton>
                    </Stack>
                </div>
                
            </aside>
            
        </div>
    )
}