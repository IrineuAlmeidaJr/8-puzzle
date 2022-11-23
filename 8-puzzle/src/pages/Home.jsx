import { useEffect, useState } from "react";

import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SendIcon from '@mui/icons-material/Send';

import { Puzzle } from "../components/Puzzle"
import { Arvore } from "../components/Arvore";
import { ModalResultado } from "../components/ModalResultado";
import { ModalResultadoFinal } from "../components/ModalResultadoFinal";


export function Home() {
    // const [listaNum, setListaNum] = useState(["1","2","3"," ","5","6","4","7","8"]);
    // const [estadoFinal, setEstadoFinal] = useState(["1","2","3","4","5","6"," ","7","8"]);
    const [listaNum, setListaNum] = useState(["1","2","3"," ","5","6","4","7","8"]);
    const [estadoFinal, setEstadoFinal] = useState(["1","2","3"," ","5","6","4","7","8"]);
    const [algoritmo, setAlgoritmo] = useState('');
    const [novoEstado, setNovoEstado] = useState('');
    const [retornoBusca, setRetornoBusca] = useState([]);

    const [retornoBackend, setRetornoBackend] = useState('');
    const [retornoBFS, setRetornoBFS] = useState('');
    const [retornoA, setRetornoA] = useState('');

    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalFinal, setEstadoModalFinal] = useState(false);

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
            listaAux[posBranco] = listaAux[posMover];
            listaAux[posMover] = ' ';
            setListaNum(listaAux.slice());

            i++; 

            // console.log(`posMover: ${posMover} | posBranco: ${posBranco}`);
            // console.log(listaNum);   
        }
        
        
    }

    function randomList() {
        for(let i = 0; i < 100; i++) {
            setTimeout(() => randomList2(), 50 * i );
            // randomList2();
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
        //[1,4,7,2,5,8,3,6,0]
    }

    function buscarSolucao() {
        // Mudar URL para local
        const url = "https://8-puzzle-back-production.up.railway.app/buscarsolucao";
        // const url = "http://localhost:8080/buscarsolucao";
        fetch(url,{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ tipoBusca: algoritmo, estados: listaNum, objetivo: estadoFinal })
        })
        .then(response => {
            response.json().then(data => {
                // Exibição teste, recebe um array já transformado
                    const retorno = [];  
                    data.verticesSolucao.forEach( valores => { 
                        retorno.push(valores.puzzle.valores); 
                    });                 
                    setRetornoBusca(retorno); 
                    const aux = data;
                    setRetornoBackend(aux);                                      
            })
        })
        .then(() => setEstadoModal(true))
        .catch(function(err) {
            console.error('Failed retrieving information', err);
        })

        // console.log(`${JSON.stringify({ busca: algoritmo, estados: listaNum })}`)
        // console.log(`Opção - ${algoritmo === 1 ? 'Busca em Profundidade' : 'A*'}`)
        // console.log(listaNum); 
    }

    async function gerarRelatorioFinal() {
        const url = "https://8-puzzle-back-production.up.railway.app/buscarsolucao";
        // const url = "http://localhost:8080/buscarsolucao";
        //  Busca em Largura (BFS)
        await fetch(url,{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ tipoBusca: 2, estados: listaNum, objetivo: estadoFinal })
        })
        .then(response => {
            response.json().then(data => {  
                const aux = data;
                setRetornoBFS(aux);                                      
            })
        })
        .catch(function(err) {
            console.error('Failed retrieving information', err);
        })
        
        // Busca A*
        await fetch(url,{
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ tipoBusca: 3, estados: listaNum, objetivo: estadoFinal })
        })
        .then(response => {
            response.json().then(data => {                  
                const retorno = [];  
                    data.verticesSolucao.forEach( valores => { 
                        retorno.push(valores.puzzle.valores); 
                    });                 
                    setRetornoBusca(retorno); 
                    const aux = data;
                    setRetornoA(aux);                                        
            })
        })
        .then(() => setEstadoModalFinal(true))
        .catch(function(err) {
            console.error('Failed retrieving information', err);
        })
    
        console.log("TESTE")
    }

    /*useEffect(() => {
        console.log('Carregou');
        // setListaNum(['2','8','3','6','5','4','7','1',' ']);

        let vetor = []
        for (let i = 0; i < 20; i++) { 
            vetor.push(listaNum)
        }
        setRetornoBusca(vetor)
        // setListaNum(['1', ' ', '3', '4', '5', '2', '6', '7', '8']);
        // setEstadoFinal(['2', ' ', '4', '3', '8', '1', '6', '7', '5']);
    }, []); */

    return (
        <div className="bg-blue-50 flex h-screen">
            <aside 
            className="
                pb-4
                w-[300px]
                min-w-[220px]                
                bg-gray-300 
                overflow-auto
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
                    "
                >
                    <Stack direction="row" spacing={2}>
                        <TextField 
                            sx={{ mt: 1 }}
                            label={'Novo Estado'} 
                            placeholder={'Ex: 123045678'}
                            id="margin-none"
                            fullWidth 
                            margin="normal"
                            size="small"
                            onChange={e => setNovoEstado(e.target.value)}
                        />

                        <IconButton 
                            size="small"
                            color="primary"  
                            component="label"
                            onClick={gerarNovoEstado}
                        >
                            <SendIcon fontSize="small"  />
                        </IconButton>
                    </Stack>

                    <Button 
                        x={{ mb: 1 }}
                        margin="normal"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={()=>{randomList()}}
                        fullWidth
                    >
                        Embaralhar
                    </Button>

                    <FormControl 
                        sx={{ mt: 2, mb: 1, minWidth: 120}} 
                        size="small" 
                        fullWidth
                    >
                        <InputLabel id="demo-select-small">Algoritmo </InputLabel>
                        <Select
                            labelId="demo-select-small"
                            value={algoritmo}
                            label="Algoritmo"
                            onChange={e => setAlgoritmo(e.target.value)}
                        >
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value={1}>Busca em Profundiade</MenuItem>
                            <MenuItem value={2}>Busca em Largura</MenuItem>
                            <MenuItem value={3}>A*</MenuItem>
                        </Select>
                    </FormControl>

                    <Button 
                        sx={{ mb: 1 }}
                        margin="normal"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={buscarSolucao}
                        fullWidth
                    >
                        Buscar Solução
                    </Button>

                    <Button 
                        sx={{ mb: 1 }}
                        margin="normal"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={gerarRelatorioFinal}
                        fullWidth
                    >
                        Relatório Geral
                    </Button>

                </div>
                
            </aside>

            <Arvore 
                lista={retornoBusca}  
            />
            
            {estadoModal && (
                <ModalResultado 
                    estado={estadoModal}
                    setEstado={setEstadoModal}
                    tipoBusca={retornoBackend.nomeMetodo}
                    qtdeVisitado={retornoBackend.qtdePassos}
                    qtdeSolucao={retornoBackend.caminhoSolucao}
                    tempo={retornoBackend.tempo}
                />
            )} 

            {estadoModalFinal && !!retornoBFS && !!retornoBFS &&  (
                <ModalResultadoFinal
                    estado={estadoModalFinal}
                    setEstado={setEstadoModalFinal}
                    tipoBusca={"Final"}
                    buscaBFS={retornoBFS}
                    setBuscaBFS={setRetornoBFS}
                    buscaA={retornoA}
                    setBuscaA={setRetornoA}
                />
            )}
            

        </div>
    )
}