
const errors = {
    "auth/user-not-found": () => "User not found",
    "defaultError": () => "Something went wrong."
}

const errorMessageHandler = (errorCode) => {
    const handler = errors[errorCode] || errors["defaultError"]
    const message = handler();
    return message
}

export default errorMessageHandler