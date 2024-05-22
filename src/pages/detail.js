import React from 'react';
import Pets from './../Pets.css';

const DetailModal = ({ onClose, pet }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content d-flex justify-content-center" onClick={(e) => e.stopPropagation()}>
                <button className="close-button btn btn-outline-danger" onClick={onClose}>X</button>
                <div className='bg-light d-flex flex-column justify-content-center align-items-center'>
                    <img className="w-100" src={pet.img} alt={pet.name} />
                    <h2>{pet.name}</h2>
                    <p>Tipo: {pet.type}</p>
                    <p>Sexo: {pet.sex}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
