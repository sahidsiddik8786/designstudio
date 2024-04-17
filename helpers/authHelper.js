import crypto from 'crypto';

export const hashPassword = async(password) => {
    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    const inputHash = crypto.createHash('sha256').update(password).digest('hex');
    return inputHash === hashedPassword;
}
