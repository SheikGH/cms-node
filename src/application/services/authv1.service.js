exports.login = async ({ email, password }) => {
    // Fake logic: normally you'd fetch from DB and hash compare
    console.log('login:', email, password);
    if (email === "john@gmail.com" && password === "John@123") {
        return { token: 'valid-token', customer: { id: 1, firsName: 'John', lastName: 'Doe', email, phone: '1234567890', } };
    }
    throw new Error('Invalid credentials');
}

exports.register = async ({ email, password }) => {
    // Simulate saving to DB 
    return { id: 1, firsName: 'John', lastName: 'Doe', email, phone: '1234567890' };
}