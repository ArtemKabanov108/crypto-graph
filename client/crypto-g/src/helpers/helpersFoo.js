export const getLocalStorage = (necessary) => {
    let itemFromLocalStorage = localStorage.getItem(necessary);
    return JSON.parse(itemFromLocalStorage)
}

export const setLocalStorage = (payloadForLocalStorage, nameForItemLocalStorage) => {
    const dataToStringRegister = JSON.stringify(payloadForLocalStorage)
    localStorage.setItem(nameForItemLocalStorage, dataToStringRegister);
}