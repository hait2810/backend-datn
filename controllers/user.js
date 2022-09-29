import User from "../models/user";


export const signup = async (req,res) => {
    const {fullname, email, password} = req.body;
    try {
        const exitsUser = await User.findOne({email}).exec()
        if(exitsUser) {
            return res.status(400).json({message: "Email đã tồn tại"});
        }
        const user = await User({fullname, email, password}).save()
        res.json({
            status: 200,
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(400).json({message: "Lỗi"})
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email}).exec()
        if(!user) {
            return res.status(400).json({message: "Email không tồn tại"})
        }
        if(!user.authenticate(password)) {
            return res.status(400).json({message: "Sai password"})
        }
        res.json({
            status:200,
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        res.status(400).json({message: "Lỗi"});
    }
}