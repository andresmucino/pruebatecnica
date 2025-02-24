import mongoose from "mongoose"

const connetDB = async () => {
    const uri = process.env.MONGO_URI
    try {
        await mongoose.connect(`${uri}`, { serverSelectionTimeoutMS: 10000, })
        console.log('Success conection to database')
    } catch (error) {
        console.log('Conection error to database', error)
    }
}

export default connetDB