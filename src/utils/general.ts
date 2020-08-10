export const capitalizeFirstLetter = (word: string): string => {
    const firstLetter = word.substring(0, 1);
    return `${firstLetter.toUpperCase()}${word.substring(1)}`;
};
