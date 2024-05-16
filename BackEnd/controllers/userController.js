import bcrypt from 'bcryptjs/dist/bcrypt.js';
import User from '../models/userModel.js';

const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        // Check if a user with the provided email or username already exists
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: "User already exists. Please use another email or username." });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        });

        
        await newUser.save();
        
        
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email
        });

    } catch (err) {
       
        console.error("Error in signupUser:", err.message);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export { signupUser };
