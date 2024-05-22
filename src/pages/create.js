import './../Pets.css';

import { Field, reduxForm } from 'redux-form';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const validate = values => {
    const errors = {};
    console.log("validate values", values);
    // if (!values.name) {
    //     errors.name = 'Required';
    // } else if (values.name.length > 15) {
    //     errors.name = 'Must be 15 characters or less';
    // }
    // if (!values.email) {
    //     errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }
    return errors;
};

function Create() {
    const [form, setForm] = useState({
        type: 'Perro',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        const pets = JSON.parse(localStorage.getItem('pets')) || [];
        pets.push({...form, fav: false,
            id: (pets.length > 0) ?
            pets[pets.length - 1].id + 1 : 1
        });
        localStorage.setItem('pets', JSON.stringify(pets))
        console.log(pets)
        navigate('/pets/list');
    }
    const inputOnchange = (e) => {
        console.log('input', e, e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    useEffect(()=>{
        if (form.name && form.type && form.sex && form.img) setIsFormValid(true);
        else setIsFormValid(false);
    }, [form]);
    return (
        <div className="w-100 d-flex justify-content-end">
            <div className="createFormContainer bg-light rounded-4 p-4 mt-5 me-5">
                <div>Registro de mascota desaparecida</div>

                <form onSubmit={handleSubmit} className="d-flex flex-column p-3 align-items-start gap-3">
                    <div className='d-flex flex-column align-items-start'>
                        <label for="name" class="form-label">Nombre mascota</label>
                        <Field name="name" component="input" type="text" label="Nombre mascota" className='form-control' onChange={inputOnchange} />
                    </div>
                    <div className='d-flex flex-column align-items-start w-100'>
                        <label for="name" class="form-label">Nombre mascota</label>
                        <Field name="type" component="select" label="Tipo mascota" className='form-control w-100' onChange={inputOnchange}>
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                            <option value="Conejo">Conejo</option>
                            <option value="Caballo">Caballo</option>
                            <option value="Tortuga">Tortuga</option>
                        </Field>
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                        <label>
                            <Field name="sex" component="input" type="radio" value="M" onChange={inputOnchange} /> Masculino
                        </label>
                        <label>
                            <Field name="sex" component="input" type="radio" value="F" onChange={inputOnchange} /> Femenino
                        </label>
                    </div>
                    <div className='d-flex flex-column align-items-start'>
                        <label for="name" class="form-label">Foto mascota</label>
                        <Field name="img" component="input" type="text" label="Foto" className='form-control' onChange={inputOnchange} />
                    </div>
                    <button type="submit" disabled={!isFormValid} className='btn btn-primary px-3 py-2 w-100'>Guardar</button>
                </form>
            </div>
        </div>
    );
}

Create = reduxForm({
    form: 'create',
    validate,
})(Create);


export default Create;
