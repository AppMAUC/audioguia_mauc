interface FormDataType {
  audioDesc?: File[];
  audioGuia?: File[];
  [key: string]: any;
}

export const sendFormData = <T extends FormDataType>(data: T) => {
  // build form data
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key == "audioDesc" || key == "audioGuia" || key == "artWorks") {
      for (let i = 0; data[key] && i < data[key].length; i++) {
        formData.append(key, data[key][i]);
      }
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData;
};
