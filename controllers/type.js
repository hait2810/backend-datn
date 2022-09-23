import Types from "../models/type";

export const createTypes = async (req, res) => {
  try {
    const Typea = await new Types(req.body).save();
    res.json(Typea);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được bài viết",
    });
  }
};

export const listTypes = async (req, res) => {
  try {
    const Typea = await Types.find();
    res.json(Typea);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};

export const readTypes = async (req, res) => {
  try {
    const Type = await Types.findOne({ _id: req.params.id }).exec();
    res.json(Type);
  } catch (error) {
    res.status(400).json({
      message: "Không hiển thị bài viết",
    });
  }
};

export const removeTypes = async (req, res) => {
  try {
    const Type = await Types.findOneAndDelete({ _id: req.params.id }).exec();
    res.json(Type);
  } catch (error) {
    res.status(400).json({
      message: "Không xoá được",
    });
  }
};
Types;
export const updateTypes = async (req, res) => {
  try {
    const Type = await Types.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(Type);
  } catch (error) {
    res.status(400).json({
      message: "Không edit được",
    });
  }
};
