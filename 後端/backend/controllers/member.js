import MemberModel from "../models/memberModel.js";


// get all members
export const getTargetMembers = async (req, res) =>{
  const {email} = req.query;
  
  try{
    const members = await MemberModel.findOne({'email':email});
    // Return members
    return res.status(200).json(members)
  } catch(error){
    return res.status(500).json({message: error.message})
  }

};


// get members
export const getMembers = async (req, res) => {
  const {email, password} = req.query;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email or password is not correct!" });
  }

  try {
    const members = await MemberModel.findOne({'email':email, 'password':password});
    if (!members){
      console.log("Log in fail QQ");
    }
    
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a member
export const createMember = async (req, res) => {
  const { name, email, account, password, creditCard } = req.body;

  // Check title and description
  if (!name || !email || !account || !password || !creditCard) {
    return res
      .status(400)
      .json({ message: "Information are required!" });
  }

  // Create a new member
  try {
    const newMember = await MemberModel.create({
      name, 
      email,
      account, 
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
  const { userId, bookName } = req.body;
  // console.log(userId, bookName)
  try {
    const members = await MemberModel.findOne({'email':userId});
    if (!members){
      console.log("fail QQ");
    }
    
    
    members.favorite.addToSet(bookName);
    members.save();

    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a member favorite book
export const deleteMember = async (req, res) => {

  const { userId, bookName } = req.body;
  try {
    const result = await MemberModel.updateOne(
      { 'email': userId },
      { $pull: { 'favorite': { $in: [bookName] } } }
    );

    // const members = await MemberModel.findOne({'email':userId});
    if (!result) {
      return res.status(404).json({ message: "Member not found!" });
    }

    // await MemberModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Member deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
