import mongoose from 'mongoose';

const flowerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  category: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    default: "" 
  },
  image: { 
    type: String, 
    default: "" 
  }
}, { 
  timestamps: true 
});

const Flower = mongoose.model('Flower', flowerSchema);

export default Flower;
