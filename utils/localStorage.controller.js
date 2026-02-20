// Obtener datos del localStorage
export const getData = (key) => {
    const res = JSON.parse(localStorage.getItem(key));
    return res ? res : [];
};

// Guardar datos en localStorage
export const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Eliminar un dato específico del localStorage
export const removeData = (key) => {
    localStorage.removeItem(key);
};
