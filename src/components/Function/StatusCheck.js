export const statusControl = (condition, statusArr, setStatusArr) => {
    condition.map((el, i) => {
        console.log(el);
        if (el === true) {
            const arr = statusArr.map((obj, idx) => {
                if (obj.id === i) {
                    obj['status'] = 'error';
                }
                return obj;
            });
            console.log(arr);
            setStatusArr(arr);
        }
        if (el === false) {
            const arr = statusArr.map((obj, idx) => {
                if (obj.id === i) {
                    obj['status'] = 'default';
                }
                return obj;
            });
            setStatusArr(arr);
        }
    });
};
