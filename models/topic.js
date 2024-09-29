
import mongoose ,{ Schema } from "mongoose";

const topicSchma = new Schema(
    {
        title: String,
        description: String,
    },
    {
        timestamps: true,
    }
)

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchma)

export default Topic