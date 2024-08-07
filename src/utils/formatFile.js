export const addSuffixToFileName = (file, suffix) => {
    const name = file.name;
    const dotIndex = name.lastIndexOf('.');
    const baseName = name.substring(0, dotIndex);
    const extension = name.substring(dotIndex);
    const newName = `${baseName}-${suffix}${extension}`;
    return new File([file], newName, { type: file.type });
};
