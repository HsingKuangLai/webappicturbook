import MemberModel from "../models/memberModel.js";


export const getMembers = async (req, res) => {
  const {email, password} = req.query;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email or password is not correct!" });
  }

  try {
    const members = await MemberModel.find({'email':email, 'password':password});
    if (!members || members.length === 0){
      console.log("Log in fail QQ");
    }
    
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a member
export const createMember = async (req, res) => {
  const { name, email, password, creditCard } = req.body;

  // Check title and description
  if (!name || !email || !password || !creditCard) {
    return res
      .status(400)
      .json({ message: "Information are required!" });
  }

  // Create a new member
  try {
    const newMember = await MemberModel.create({
      name, 
      email, 
      password, 
      creditCard
    });
    return res.status(201).json(newMember);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a member
export const updateMember = async (req, res) => {
  const { id } = req.params;
  
  // This is empty
  console.log("This is sooooooo empty");

  try {
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a member
export const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {

    const existedMember = await MemberModelModel.findById(id);
    if (!existedMember) {
      return res.status(404).json({ message: "Member not found!" });
    }

    await MemberModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Member deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
