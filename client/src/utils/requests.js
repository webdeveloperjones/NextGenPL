import axios from 'axios'

const BaseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api/daily' : '/api/daily'
// const BaseURL = config.ENV === 'DEV' ? 'http://localhost:3001/api/daily' : 
const getAllWeights = async () => {
    console.log("Getting Weights...")
    const response = await axios.get(BaseURL)
    console.log("Success")
    return response.data

}

const addRecord = async (record) => {
    console.log("Posting record: ", record)
    const response = await axios.post(BaseURL, record, {
        headers: {
            'Accept': 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
        }
    })
    console.log("Success")
    return response
}

export {
    getAllWeights,
    addRecord
}