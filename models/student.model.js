
/*student {
    _id ,
    
department:object id  
    name:string 
age: number ,
gender : "Male" Or "female" }
*/

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female'] },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    password: { type: String, require: true }
})

module.exports = mongoose.model("Student", studentSchema);