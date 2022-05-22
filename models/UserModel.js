import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: [true, "full Name is required"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
});

// Note:-  Unable to encrypt the password because we have no registration api we put manually into database
// But you can see commented code for example

// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) {
// 		next();
// 	}
// 	const salt = await bcrypt.genSalt(10);
// 	this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
// 	return bcrypt.compare(enteredPassword, this.password);
// };

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
