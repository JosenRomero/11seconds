
const validationEmailAndPassword = (email, password) => {
    console.log("en utils")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    let emailError = (email === "") 
        ? "Email address is a required field." : !emailRegex.test(email) ? "Invalid email" : ""

    let passwordError = (password === "") 
        ? "Password is a required field." : (password.length <= 5) ? "Password should be at least 6 characters" : ""

    return { emailError, passwordError }

}

export default validationEmailAndPassword