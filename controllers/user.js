import User from "../models/user";
import nodemailer from "nodemailer";

const sendVerifyEmail = async (name, email, userID) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
   });

   const mailOptions = {
    from: `The Man Shop ${process.env.USER}`,
    to: email,
    subject: "Xác thực tài khoản The Man Shop",
    html: `<p> Xin chào ${name} vui lòng nhấp vào <a href="${process.env.BASE_URL}users/verify/${userID}"> Xác thực </a> để kích hoạt tài khoản ! </p>`

};
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Email not sent !");
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });
    await User.updateOne({_id: user._id}, { $set: { verified: true }});
    console.log("Email verified successfully !");
  } catch (error) {
    console.log("Email not verified", error);
  }
}
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    let exitsUser = await User.findOne({ email }).exec();
    if (exitsUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const user = await User({ fullname, email, password }).save();
    res.json({
      status: 200,
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });

    if (user) {
      sendVerifyEmail(fullname, email, user._id);
    }
  } catch (error) {
    res.status(400).json({ message: "Lỗi" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại !" });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({ message: "Sai password !" });
    }
    if (user.verified === false) {
      return res.status(400).json({ message: "Vui lòng kiểm tra email xác thực tài khoản !", verified: false });
    }
    res.json({
      status: 200,
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: "Lỗi" });
  }
};

export const listUser = async (req, res) => {
  try {
    const body = req.body;
    const count = await User.find({}).count();
    const skip = body.limit * (body.page - 1);
    const users = await User.find(
      {},
      {
        fullname: 1,
        email: 1,
        id_: 1,
        status: 1,
        role: 1,
        createdAt: 1,
        updatedAt: 1,
      }
    )
      .skip(skip)
      .limit(body.limit);

    res.json({
      users,
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Không hiển thị ",
    });
  }
};

export const updateUsers = async (req, res) => {
  console.log(req);
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { status: req.body.status, fullname: req.body.fullname },
      { new: true }
    ).exec();
    res.json({
      status: user.status,
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};

export const readUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    res.json({
      status: user.status,
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị người dùng ",
    });
  }
};
