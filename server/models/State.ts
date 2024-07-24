import mongoose, { Document, Schema } from 'mongoose';

export interface IState extends Document {
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
}

const StateSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
});

StateSchema.statics.summarizeByPeriod = async function(period: 'hour' | 'day' | 'month') {
    const groupBy = {
        hour: { $hour: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
        month: { $month: "$createdAt" }
    }[period];

    return this.aggregate([
        { $group: {
            _id: groupBy,
            count: { $sum: 1 },
            statuses: { $push: "$status" }
        }},
        { $sort: { _id: 1 } }
    ]);
};

export default mongoose.model<IState>('State', StateSchema);
