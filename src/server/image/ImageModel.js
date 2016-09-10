import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    title: { type: String },
    url: { type: String }
});

export default mongoose.model('Image', imageSchema);