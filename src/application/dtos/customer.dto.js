class CustomerDTO {
    constructor({ customerId, firstName, lastName, email, phone, address, password, role }) {
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.role = role;
    }
}

module.exports = CustomerDTO;