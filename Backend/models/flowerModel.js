import mongoose from 'mongoose';

const flowerSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String
});

const Flower = mongoose.model('Flower', flowerSchema);

export default Flower;
