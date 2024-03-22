const useLocalStorage = (key:string, values?:any) => {
    const setItem = () => localStorage.setItem(key,JSON.stringify(values));
    const getItem = () => localStorage.getItem(key);
    const removeItem = () =>  localStorage.removeItem(key);

    return {
        setItem,
        getItem,
        removeItem
    }
}

export default useLocalStorage