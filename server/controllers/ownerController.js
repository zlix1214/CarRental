import User from "../models/User.js";

export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id, { role: "owner" });
    return res.json({ success: false, message: "Now you can list a car" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const addCar = async (req, res) => {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
