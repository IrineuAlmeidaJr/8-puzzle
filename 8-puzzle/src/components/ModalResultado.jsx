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

export function ModalResultado(props) {
    
    const handleClose = () => props.setEstado(false);


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
                    Quantidade de passos (nós) visitados para obter a solução <span className='font-bold'>{props.qtdeVisitado}</span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Tamanho do caminho da solução encontrada <span className='font-bold'>{props.qtdeSolucao}</span>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Tempo gasto <span className='font-bold'>{props.tempo}ms</span>
                </Typography>
                </Box>
            </Modal>
        </div>
    );
}
