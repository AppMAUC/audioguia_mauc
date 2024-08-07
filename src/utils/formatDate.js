
export const formatDate = (date) => {

    try {
        if (date) {
            let newDate = date.toString();
            return newDate.slice(0, 10);
        }

    } catch (error) {
        console.log(error)
    }
};

export const showDate = (date) => {

    try {
        if (date) {
            const newDate = formatDate(date);
            return newDate.split('-').reverse().join('/');
        }

    } catch (error) {
        console.log(error)
    }
};