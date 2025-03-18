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
    console.log("Policy created successfully:", newPolicy);
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
    console.log(`Retrieved ${policies.length} policies`);
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
    console.log(`Attempting to delete policy with ID: ${id}`);
    
    const policy = await Policy.findByIdAndDelete(id);
    
    if (!policy) {
      console.log(`Policy with ID ${id} not found`);
      return res.status(404).json({ message: "Policy not found" });
    }
    
    console.log(`Successfully deleted policy: ${policy.policyNumber}`);
    res.status(200).json({ 
      message: "Policy deleted successfully",
      deletedPolicyId: id 
    });
  } catch (error) {
    console.error("Error deleting policy:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Get a single policy by ID
export const getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching policy with ID: ${id}`);
    
    // Find the policy by ID
    const policy = await Policy.findById(id);
    
    if (!policy) {
      console.log(`Policy with ID ${id} not found`);
      return res.status(404).json({ message: "Policy not found" });
    }
    
    console.log(`Successfully retrieved policy: ${policy.policyNumber}`);
    // Return the policy data
    res.status(200).json(policy);
  } catch (error) {
    console.error("Error fetching policy:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};