import { useRef, useState } from 'react';

// Hook creado: useFormData
const useFormData = (initial) => {

    const form = useRef(initial);
    const [formData, setFormData] = useState({});

    const getFormData = () => {
        const fd = new FormData(form.current);
        const obj = {};
        fd.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    };

    const updateFormData = () => {
        setFormData(getFormData());
    };
    
    return { form, formData, updateFormData };
};

export default useFormData;

// formData: variable con todas las informaciones del formulario. Cada input tiene un nombre, y al grente del nombre el valor del input. 
// updateFormData: cada que el formulario cambia utilizamos esa funcion para actualizar esa variable