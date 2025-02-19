const mongoose= require('mongoose');


exports.connectDB=async()=>{
    try{
        const conn= await mongoose.connect(
            'mongodb+srv://teena:teena123@cluster0.wwvms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' );
        console.log('MongoDB Connected');
     } catch(error){
            console.error(error);
            process.exit(1);
        }
    
};