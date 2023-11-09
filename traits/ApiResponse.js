const responseNotFound = () => {
    responseNotFound.status(404).json({
        succes: false,
        message: 'Not Found'
    })
}

const responseSucces = (res,result,message) => {
    res.status(200).json({
        succes: true,
        message: message,
        data: result
    })
}

module.exports = {
    responseNotFound,
    responseSucces
}