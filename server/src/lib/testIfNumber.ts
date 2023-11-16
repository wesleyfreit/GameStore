export const testIfNumber = (str: string) => {
    if(str.length === 0){
        return false;
    }

    const firstLyric = str[0];

    return /^[0-9]/.test(firstLyric);
}