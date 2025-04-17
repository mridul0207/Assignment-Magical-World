const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  dueDate: { type: Date },
  category: { type: String, enum: ['Urgent', 'Non-Urgent'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);

