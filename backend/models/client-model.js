const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientModel = new Schema(
    {
        client_name: { type: String, required: true },
        address: { type: String, required: true },
        project_name: { type: String, required: true },
        project_brief: { type: String },
        start_date:{type:Date, required:true},
        deadline_date:{type:Date, required:true},
        no_of_hour:{type:Number},
        per_hour:{type:Number},
        estimated_amount:{type:Number, required:true},
        status:{type:Number,required:true},
        platform:{type:Object},
        languages:{type:Array,required:true}

    },
    { timestamps: true },
)

module.exports = mongoose.model('clients', ClientModel)