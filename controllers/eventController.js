const { Event, User } = require("../models");
const { Op } = require("sequelize");
const dayjs = require("dayjs");

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, datetime, location, capacity } = req.body;

    if (!title || !datetime || !location || !capacity) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (capacity <= 0 || capacity > 1000) {
      return res.status(400).json({ error: "Capacity must be between 1 and 1000." });
    }

    const event = await Event.create({ title, datetime, location, capacity });
    return res.status(201).json({ eventId: event.id });
  } catch (err) {
    console.error("Create Event Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get Event Details + Registered Users
exports.getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id, {
      include: [{ model: User, through: { attributes: [] } }],
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.json(event);
  } catch (err) {
    console.error("Get Event Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Register for Event
exports.registerUser = async (req, res) => {
  try {
    const { id } = req.params; // eventId
    const { userId } = req.body;

    const event = await Event.findByPk(id, {
      include: [{ model: User }],
    });
    const user = await User.findByPk(userId);

    if (!event || !user) {
      return res.status(404).json({ error: "Event or User not found." });
    }

    if (dayjs(event.datetime).isBefore(dayjs())) {
      return res.status(400).json({ error: "Cannot register for a past event." });
    }

    const alreadyRegistered = await event.hasUser(user);
    if (alreadyRegistered) {
      return res.status(409).json({ error: "User already registered for this event." });
    }

    const currentCount = await event.countUsers();
    if (currentCount >= event.capacity) {
      return res.status(400).json({ error: "Event is full." });
    }

    await event.addUser(user);
    res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Cancel Registration
exports.cancelRegistration = async (req, res) => {
  try {
    const { id, userId } = req.params; // eventId, userId

    const event = await Event.findByPk(id);
    const user = await User.findByPk(userId);

    if (!event || !user) {
      return res.status(404).json({ error: "Event or User not found." });
    }

    const isRegistered = await event.hasUser(user);
    if (!isRegistered) {
      return res.status(400).json({ error: "User is not registered for this event." });
    }

    await event.removeUser(user);
    res.status(200).json({ message: "Registration cancelled." });
  } catch (err) {
    console.error("Cancel Registration Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// List Upcoming Events (sorted by date then location)

exports.listUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.findAll({
      where: {
        datetime: {
          [Op.gt]: now
        }
      },
      order: [
        ["datetime", "ASC"],
        ["location", "ASC"]
      ]
    });

    res.json(events);
  } catch (err) {
    console.error("List Upcoming Events Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};


// Event Stats
exports.getEventStats = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id, {
      include: [{ model: User }],
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    const totalRegistrations = await event.countUsers();
    const remainingCapacity = event.capacity - totalRegistrations;
    const percentageUsed = ((totalRegistrations / event.capacity) * 100).toFixed(2);

    res.json({
      totalRegistrations,
      remainingCapacity,
      percentageUsed: `${percentageUsed}%`,
    });
  } catch (err) {
    console.error("Event Stats Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
