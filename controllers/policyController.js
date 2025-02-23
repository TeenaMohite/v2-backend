import Policy from "../models/Policy.js";
import { sendEmail } from "../utils/emailService.js";

// Create a new policy request
export const createPolicy = async (req, res) => {
  try {
    console.log("Received Policy Request Body:", req.body); // Debugging

    const { policyType, coverageAmount, premium, duration, policyNumber } = req.body;

    // if (!policyNumber) {
    //   return res.status(400).json({ message: "Policy Number is required" });
    // }
    if (!policyType || !coverageAmount || !premium || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPolicy = new Policy({
      // policyNumber,
      policyType,
      coverageAmount,
      premium,
      duration,
    });

    await newPolicy.save();

    res.status(201).json({ message: "Policy created successfully", policy: newPolicy });
  } catch (error) {
    console.error("Create Policy Error:", error);
    res.status(500).json({ message: "Error creating policy", error });
  }
};


// Get all policies (Admin only)
export const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().populate("userId", "name email");
    res.json(policies);
  } catch (error) {
    console.error("Get All Policies Error:", error);
    res.status(500).json({ message: "Error fetching policies" });
  }
};

// Get policy by ID
export const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id).populate("userId", "name email");
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.json(policy);
  } catch (error) {
    console.error("Get Policy by ID Error:", error);
    res.status(500).json({ message: "Error fetching policy" });
  }
};

// Get policies for a specific user
export const getUserPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ userId: req.user.id });

    if (!policies.length) {
      return res.status(404).json({ message: "No policies found" });
    }

    res.json(policies);
  } catch (error) {
    console.error("Get User Policies Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Approve/Reject Policy (Admin)
export const updatePolicyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    policy.status = status;
    await policy.save();

    if (status === "Approved") {
      sendEmail(policy.userId.email, "Policy Approved", "Your policy has been approved.");
    }

    res.json({ message: `Policy ${status.toLowerCase()} successfully`, policy });
  } catch (error) {
    console.error("Update Policy Status Error:", error);
    res.status(500).json({ message: "Error updating policy status" });
  }
};

// Update policy details
export const updatePolicy = async (req, res) => {
  try {
    const { policyType, coverageAmount, premium, duration } = req.body;

    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    policy.policyType = policyType || policy.policyType;
    policy.coverageAmount = coverageAmount || policy.coverageAmount;
    policy.premium = premium || policy.premium;
    policy.duration = duration || policy.duration;

    const updatedPolicy = await policy.save();
    res.json({ message: "Policy updated successfully", policy: updatedPolicy });
  } catch (error) {
    console.error("Update Policy Error:", error);
    res.status(500).json({ message: "Error updating policy" });
  }
};

// Delete a policy (Admin only)
export const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    await policy.deleteOne();
    res.json({ message: "Policy deleted successfully" });
  } catch (error) {
    console.error("Delete Policy Error:", error);
    res.status(500).json({ message: "Error deleting policy" });
  }
};
