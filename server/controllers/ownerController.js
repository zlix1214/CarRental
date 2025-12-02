import imagekit from "../configs/imageKit.js";
import User from "../models/User.js";
import fs from "fs";
import Car from "../models/Car.js";
import Booking from "../models/Booking.js";

export const changeRoleToOwner = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
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

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;
    await Car.create({
      ...car,
      owner: _id,
      image,
    });

    res.json({ success: true, message: "Car added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;
    const cars = await Car.find({ owner: _id });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "not authorized" });
    }

    car.isAvaliable = !car.isAvaliable;
    await car.save();

    res.json({ success: true, message: "Availability toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "not authorized" });
    }

    car.owner = null;
    car.isAvaliable = false;
    await car.save();

    res.json({ success: true, message: "car removed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    // if (role !== "owner") {
    //   return res.json({ success: false, message: "unauthorized" });
    // }

    const cars = await Car.find({ owner: _id });
    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    });
    const completedBookings = await Booking.find({
      owner: _id,
      status: "confirmed",
    });

    const allBookings = await Booking.find({ owner: _id }).sort({
      createdAt: -1,
    });

    const monthlyRevenue = allBookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: allBookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: allBookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const updateUserImage = async (req, res) => {
  try {
    const { _id } = req.user;

    const imageFile = req.file;

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const image = optimizedImageUrl;

    await User.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Image Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
