export const validatePassword = (password) => {
    return String(password).match( /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}$/ );            
};
