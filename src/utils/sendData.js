export const sendFormData = (data) => {
    // build form data
    const formData = new FormData();

    Object.keys(data).forEach((key) => {

        if (key == 'audioDesc') {
            for (let i = 0; i < data[key].length; i++) {
                formData.append(key, data[key][i]);
            }
        } else {
            formData.append(key, data[key])
        }
    });

    return formData;
}