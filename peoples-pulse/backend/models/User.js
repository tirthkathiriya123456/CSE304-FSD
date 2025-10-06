import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true
	},
	phone: {
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

// Hash password before saving
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next()
	
	try {
		const salt = await bcrypt.genSalt(10)
		this.password = await bcrypt.hash(this.password, salt)
		next()
	} catch (error) {
		next(error)
	}
})

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
userSchema.methods.toJSON = function() {
	const user = this.toObject()
	delete user.password
	return user
}

export default mongoose.models.User || mongoose.model('User', userSchema)
