import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
};

export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    const cars = await Car.find({ location, isAvaliable: true });

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = checkAvailability(car, pickupDate, returnDate);
      return {
        ...car._doc,
        isAvailable: isAvailable,
      };
    });

    let availableCars = await Promise.all(availableCarsPromises);
    availableCars = availableCars.filter((car) => car.isAvailable === true);

    res.json({ success: true, availableCars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    // 驗證日期
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    // 檢查取車日期不能晚於還車日期
    if (picked >= returned) {
      return res.json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    // 檢查日期不能是過去的日期
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (picked < today) {
      return res.json({
        success: false,
        message: "Pickup date cannot be in the past",
      });
    }

    // 檢查車輛可用性 - 查找所有與此車輛相關的有效預約
    const existingBookings = await Booking.find({
      car,
      status: { $in: ["pending", "confirmed"] }, // 只檢查有效的預約
    });

    // 檢查日期衝突
    const hasConflict = existingBookings.some((booking) => {
      const existingPickup = new Date(booking.pickupDate);
      const existingReturn = new Date(booking.returnDate);

      // 日期重疊的邏輯:
      // 新預約的取車日期在現有預約期間內 OR
      // 新預約的還車日期在現有預約期間內 OR
      // 新預約完全包含現有預約期間
      return (
        (picked >= existingPickup && picked < existingReturn) || // 新取車日在現有預約期間
        (returned > existingPickup && returned <= existingReturn) || // 新還車日在現有預約期間
        (picked <= existingPickup && returned >= existingReturn) // 新預約包含現有預約
      );
    });

    if (hasConflict) {
      return res.json({
        success: false,
        message:
          "This car is not available for the selected dates. Please choose different dates.",
      });
    }

    // 計算價格
    const carData = await Car.findById(car);
    if (!carData) {
      return res.json({ success: false, message: "Car not found" });
    }

    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = noOfDays * carData.pricePerDay;

    // 創建預約
    await Booking.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
      status: "pending", // 確保有狀態欄位
    });

    res.json({ success: true, message: "Booking created successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { _id } = req.user;

    const Bookings = await Booking.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    res.json({ success: true, Bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getOwnerBookings = async (req, res) => {
  try {
    const { _id } = req.user;
    const bookings = await Booking.find({ owner: _id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
