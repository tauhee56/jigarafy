import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

// Get all users for admin panel
export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get user details by ID
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update user by ID (admin only)
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Don't allow updating password through this route
    if (updates.password) {
      delete updates.password;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    ).select("-password");
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete user by ID (admin only)
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    
    // Delete user
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Delete all friend requests associated with this user
    await FriendRequest.deleteMany({
      $or: [{ sender: id }, { recipient: id }]
    });
    
    // Remove this user from friends arrays of other users
    await User.updateMany(
      { friends: id },
      { $pull: { friends: id } }
    );
    
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get admin dashboard stats
export async function getDashboardStats(req, res) {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalRegularUsers = await User.countDocuments({ role: "user" });
    const totalFriendRequests = await FriendRequest.countDocuments();
    const pendingFriendRequests = await FriendRequest.countDocuments({ status: "pending" });
    const acceptedFriendRequests = await FriendRequest.countDocuments({ status: "accepted" });
    
    // Get recent users (last 5 registered)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("fullName email profilePic role createdAt");
    
    res.status(200).json({
      totalUsers,
      totalAdmins,
      totalRegularUsers,
      totalFriendRequests,
      pendingFriendRequests,
      acceptedFriendRequests,
      recentUsers
    });
  } catch (error) {
    console.error("Error in getDashboardStats controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
