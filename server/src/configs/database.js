import mongoose from 'mongoose'


const connectDB = async (ATLAS_URI) => {

  try {
    await mongoose.connect(ATLAS_URI);
    console.log(`MongoDB Connected Succesfully`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export default connectDB;