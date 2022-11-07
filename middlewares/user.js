import { isValidObjectId } from "mongoose";
import passwordResetToken from "../models/passwordResetToken";

export const isValidPassResetToken = async (req, res, next) => {
    const { token, userId } = req.body;

    if (!token.trim() || !isValidObjectId(userId)) return res.status(403).json({ message: "Invalid request!" });

    const resetToken = await passwordResetToken.findOne({owner: userId});
    if(!resetToken) return res.status(403).json({ message: "Unauthorized access, invalid request!" });

    const matched = await resetToken.compareToken(token);
    if(!matched) return res.status(403).json({ message: "Unauthorized access, invalid request!" });

    req.resetToken = resetToken;
    next();
}