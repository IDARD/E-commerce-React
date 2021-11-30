const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  age: Number,
  email: { type: String, unique: true },
  password: String,
  photoProfile: String,
  annonces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produit",
      default: [],
    },
  ],
  panier: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produit",
      default: [],
    },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    let passwordHashed = await bcrypt.hash(this.password, 10);
    this.password = passwordHashed;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
