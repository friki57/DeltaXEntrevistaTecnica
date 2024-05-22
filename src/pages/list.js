import React, { useState, useEffect } from "react";
import DetailModal from "./detail";

function List() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        setPets(JSON.parse(localStorage.getItem("pets")) || []);
    }, []);
    const seeDetail = (pet) => {
        setSelectedPet(pet);
        setOpenModal(true);
    }
    const closeModal = () => {
        setOpenModal(false);
    };
    const favPet = (id) => {
        let petsStorage = JSON.parse(localStorage.getItem("pets")) || [];
        petsStorage = petsStorage.map((pet) => ({
            ...pet,
            fav: pet.id === id ? !pet.fav : pet.fav,
        }));
        localStorage.setItem("pets", JSON.stringify(petsStorage));
        setPets(petsStorage);
    };

    const toggleTab = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="w-100 d-flex justify-content-end">
            <div className="createFormContainer bg-light rounded-4 p-4 mt-5 me-5">
                <div className="">
                    <div className="d-flex w-100 justify-content-between">
                        <div
                            className={`${activeTab === 0 ? "btn btn-secondary" : "btn btn-outline-secondary"}`}
                            onClick={() => toggleTab(0)}
                        >
                            Todas
                        </div>
                        <div
                            className={`${activeTab === 1 ? "btn btn-secondary" : "btn btn-outline-secondary"}`}
                            onClick={() => toggleTab(1)}
                        >
                            En seguimiento
                        </div>
                    </div>
                </div>

                        <div className="d-flex flex-column gap-2">
                        {(activeTab === 0 ? pets : pets.filter(pet=>pet.fav) ).map((pet) => (
                                <div className="d-flex gap-2" key={pet.id} onClick={()=>{seeDetail(pet);}}>
                                    <img className="" width={"200px"} src={pet.img} alt={pet.name} />
                                    {
                                        activeTab === 0 &&
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <div className="">{pet.name}</div>
                                            <input type="checkbox" className="btn-check" id={`btn-check-${pet.id}`} autoComplete="off" checked={pet.fav}
                                                onChange={() => { favPet(pet.id); }} />
                                            <label className="btn btn-outline-danger" htmlFor={`btn-check-${pet.id}`}>
                                                {"<3"}
                                            </label>
                                        </div>
                        }
                                </div>
                            ))}
                        </div>
            </div>
            {openModal && <DetailModal onClose={closeModal} pet={selectedPet} />}
        </div>
    );
}

export default List;
