import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: 'none solid',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px'
};

export function ModalResultadoFinal(props) {
    
    const handleClose = () => {
        props.setBuscaBFS('');
        props.setBuscaA('');
        props.setEstado(false);
    }

    return (
        <div>
            <Modal
                open={props.estado}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Relatório {props.tipoBusca}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <span className='font-bold'> BFS </span> <br/>
                    Quantidade de passos (nós) visitados para obter a solução <span className='font-bold'>{props.buscaBFS.qtdePassos}</span> <br/>
                    Tamanho do caminho da solução encontrada <span className='font-bold'>{props.buscaBFS.caminhoSolucao}</span> <br/>
                    Tempo gasto <span className='font-bold'>{props.buscaBFS.tempo}ms</span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <span className='font-bold'> A* </span> <br/>
                    Quantidade de passos (nós) visitados para obter a solução <span className='font-bold'>{props.buscaA.qtdePassos}</span> <br/>
                    Tamanho do caminho da solução encontrada <span className='font-bold'>{props.buscaA.caminhoSolucao}</span> <br/>
                    Tempo gasto <span className='font-bold'>{props.buscaA.tempo}ms</span>
                </Typography>
                </Box>
            </Modal>
        </div>
    );
}
