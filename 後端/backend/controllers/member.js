import MemberModel from "../models/memberModel.js";
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    req.userId = decoded.userId;
    next();
  });
};

// get all members
export const getTargetMembers = async (req, res) =>{
  const {account} = req.query;
  
  try{
    const members = await MemberModel.findOne({'account':account});
    // Return members
    return res.status(200).json(members)
  } catch(error){
    return res.status(500).json({message: error.message})
  }

};


// get members
export const getMembers = async (req, res) => {
  const {account, password} = req.query;
  if (!account || !password) {
    return res
      .status(400)
      .json({ message: "Account or password is not correct!" });
  }

  try {
    const members = await MemberModel.findOne({'account':account, 'password':password});
    if (!members){
      console.log("Log in fail QQ");
      return res.status(200).json(members);;
    }
    
    //  Generate JWT token
     const token = jwt.sign({ 'account':account }, 'your_secret_key');
    //  console.log(token);
    
    return res.status(200).json(token);
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

// Update a member fav book
export const updateMember = async (req, res) => {
  const { userId, bookName } = req.body;
  // console.log(userId, bookName)
  try {
    const members = await MemberModel.findOne({'account':userId});
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
      { 'account': userId },
      { $pull: { 'favorite': { $in: [bookName] } } }
    );

    
    if (!result) {
      return res.status(404).json({ message: "Member not found!" });
    }

    // await MemberModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Member deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a member favorite book
export const getFavorite = async (req, res) => {

  // get 要用 req.query
  const {account, bookName} = req.query;
  try{
    const members = await MemberModel.findOne({"account":account});
    
    // 檢查是否在favorite，並回傳true or false
    const isBookInFavorites = members.favorite.includes(bookName);

    return res.status(200).json(isBookInFavorites)
  } catch(error){
    return res.status(500).json({message: error.message})
  }

};

// jwt test get
export const getjwt = async (req, res) => {
  // jwt 解碼 test
  const {account} = req.query;
  console.log(account);
  // const token = req.headers['authorization'];
  // console.log(token);
  // console.log(token);
  jwt.verify(account, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }
    console.log("decode：", decoded.account);
    // req.userId = decoded.a;
    return res.status(200).json(decoded.account)
  });

}

// Get a member data
export const getMemberdata = async (req, res) => {
  console.log('Request received:', req.url);
  console.log('Query parameters:', req.query);
  // get 要用 req.query
  const {account} = req.query;
  try{
    const members = await MemberModel.findOne({"account":account});
    console.log(members);
    return res.status(200).json(members)
  } catch(error){
    return res.status(500).json({message: error.message})
  }

};


// Delete a member 
export const deleteMemberdata = async (req, res) => {
  const { userId } = req.body;
  console.log('Request Body:', req.body);
  console.log('Deleting member with userId:', userId);
  try {
    const result = await MemberModel.deleteOne({ 'account': userId });

    if (!result.deletedCount) {
      return res.status(404).json({ message: "Member not found!" });
    }

    return res.status(200).json({ message: "Member deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// change mamber data
export const updateMemberData = async (req, res) => {
  console.log(req.body);
  const { account, name, email, password,  creditCard } = req.body;
  console.log(account, name, email, password,  creditCard );
  try {
    // 更新 MemberModel，使用 $set 操作符设置新的值
    const result = await MemberModel.updateOne(
      { 'account': account },
      {
        $set: {
          'name': name,
          'email': email,
          'password': password,
          'creditCard': creditCard
        }
      }
    );

    // 检查是否找到了成员并成功更新
    if (!result || result.nModified === 0) {
      return res.status(404).json({ message: "成员未找到或未进行任何更改！" });
    }

    // 返回成功消息
    return res.status(200).json({ message: "成员数据已成功更新！" });
  } catch (error) {
    // 处理更新过程中发生的任何错误
    return res.status(500).json({ message: error.message });
  }
};