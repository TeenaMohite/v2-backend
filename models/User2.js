import mongoose from "mongoose";

const userSchema2 = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  creditCard: String,
  cardHolder: String,
  country: String,
  autoPayout: Boolean,
  notifyPayments: Boolean,
  notifications: {
    reports: Boolean,
    sound: Boolean,
    vibrations: Boolean,
  },
  security: {
    google2FA: Boolean,
    sms2FA: Boolean,
  },
});

const User2 = mongoose.model("User2", userSchema2);
export default User2;
