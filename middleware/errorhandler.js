function errorHandler(err, req, res, next) {
    console.log(err)
    if (err.name === "ErrorNotFound") {
        res.status(404).json({message: "Error Not Found"})
    } else if (err.username === "InvalidCredential") {
        res.status(400).json({message: "Invalid email"})
    } else if (err.name === "Unauthenticated") {
        res.status(404).json({message: "User not found"})
    } else if (err.name === "ErrorAlreadyExist") {
        res.status(409).json({message: "User already exist"})
    } 
    else {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = errorHandler