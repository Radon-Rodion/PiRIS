const firstLetterToUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const objectPropsStateSplitter = (object, setObject) => {
    if(object== null || object?.length) return;
    
    const result = {};
    Object.keys(object).map(ke => {
        result[ke] = object[ke];
        const setter = (newVal) => {
            const newObj = {...object};
            newObj[ke] = newVal;
            setObject(newObj);
        };
        result["set"+firstLetterToUppercase(ke)] = setter;
    });
    return result;
}

export const arrOfObjectsPropsStateSplitter = (objectsArr, setObjectsArr) => {
    if(typeof(objectsArr) != typeof([])) return;
    const setObjInArrCreator = (index) => (newObj) => {
        const newObjectsArr = [...objectsArr];
        newObjectsArr[index] = newObj;
        setObjectsArr(newObjectsArr);
    }
    return objectsArr.map((obj, index) => objectPropsStateSplitter(obj, setObjInArrCreator(index)));
}

export function serialize(obj, serializedName) {
    localStorage.setItem(serializedName, JSON.stringify(obj));
  }