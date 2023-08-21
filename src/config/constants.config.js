const MESSAGES = {
    DATABASE: {
        CONNECTED: "MongoDB is connected :)",
        ERROR: "An error occured while connecting to database "
    },

    CUSTOMER: {
        CREATED: "Customer account created successfully",
        CUSTOMER_FOUND: "Customers found successfully",
        CUSTOMER_NOT_FOUND: "Customer not found",
        ERROR: "An error occured",
        DUPLICATE_EMAIL: "Email already exists",
        DUPLICATE_USERNAME: "Username already exists",
        REGISTERED: "Registration successful",
        EMAIL_NOTFOUND: 'Email not found',
        LOGGEDIN: 'Logged in successfully',
        W_PASSWORD: 'Wrong password',
        INCORRECT_DETAILS: 'Invalid credentials',
        ACCOUNT_NOT_REGISTERED: 'Account not registered',
        LOGGEDOUT: 'successfully loggedout',
        ACCOUNT_DELETED: 'Account deleted successfully',
        NOT_ACCOUNT_DELETED: 'Unable to delete user account',
        ACCOUNT_UPDATED: 'Account updated successfully',
        NOT_UPDATED: 'Account updated unsuccessful',
        UNAUTHORIZED: 'Unauthorized access',
    }
}
module.exports = { MESSAGES }