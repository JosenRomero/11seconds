
const errors = {
    "auth/user-not-found": () => "User not found",
    "auth/wrong-password": () => "Wrong password",
    "auth/too-many-requests": () => "Please try again later",
    "auth/invalid-email": () => "Invalid email",
    "auth/weak-password": () => "Password should be at least 6 characters",
    "defaultError": () => "Something went wrong."
}

const errorMessageHandler = (errorCode) => {
    const handler = errors[errorCode] || errors["defaultError"]
    const message = handler();
    return message
}

export default errorMessageHandler