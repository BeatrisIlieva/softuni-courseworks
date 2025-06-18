export const isValidString = (text: unknown): text is string => {
    return typeof text === 'string' && text.length > 0;
};
