import Policy from "../models/Policy.js";

// Create a new policy
export const createPolicy = async (req, res) => {
  try {
    const { provider, policyNumber, coverage, premiumAmount } = req.body;

    if (!provider || !policyNumber || !coverage || !premiumAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPolicy = new Policy({
      provider,
      policyNumber,
      coverage,
      premiumAmount,
    });

    await newPolicy.save();
    res.status(201).json({ message: "Policy created successfully", newPolicy });
  } catch (error) {
    console.error("Error creating policy:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Get all policies
export const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.status(200).json(policies);
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Delete a policy
export const deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await Policy.findByIdAndDelete(id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};