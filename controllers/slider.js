import Sliders from "../models/slider";

export const createSliders = async (req, res) => {
  try {
    const Slider = await new Sliders(req.body).save();
    res.json(Slider);
  } catch (error) {
    res.status(400).json({
      message: "Không thêm được",
    });
  }
};
