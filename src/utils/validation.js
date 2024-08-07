export const isJson = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

export const arraysisEquals = (array1 = [], array2 = []) => {
    if (array1.length !== array2.length) {
        return false; // Os arrays têm tamanhos diferentes
    }

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false; // Os itens não são iguais
        }
    }

    return true; // Todos os itens são iguais
}
