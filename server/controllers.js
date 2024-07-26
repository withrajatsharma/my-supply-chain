const parcelModel = require("./models/parcel.model");
const userModel = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.registerParcel = async (req, res) => {
    // Implement the logic for registerParcel
        try {

            const {  name,
                description,
                 location,
                 service,
                 numCheckpoints,
                 locations } = req.body;

                 const parcel = await parcelModel.create({
                    name,
                    description,
                     location,
                     service,
                     numCheckpoints,
                     locations
                 })

                 res.status(200).json({
                    success: true,
                    message:" parcel registered successfully",
                    parcel: parcel      
                 });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message:" error occured while registering parcel",
                error:error.message
            });
        }



    
};

exports.transferParcel = async (req, res) => {
    // Implement the logic for transferParcel
};

exports.reportParcelLost = async (req, res) => {
    // Implement the logic for reportParcelLost
};

exports.verifyCheckpoint = async (req, res) => {
    // Implement the logic for verifyCheckpoint
};

exports.getParcelHistory = async (req, res) => {
    // Implement the logic for getParcelHistory
};

exports.getParcelDetails = async (req, res) => {
    // Implement the logic for getParcelDetails
};

exports.getNextLocation = async (req, res) => {
    // Implement the logic for getNextLocation
};


exports.getParcelCount = async (req, res) => {
    try {

        const count = await parcelModel.countDocuments({});

        res.status(200).json({
            success: true,
            message:" parcel count got successfully ",
            count: count
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:" error in getting parcel count",
            error:error.message
        });
        
    }
};


exports.signUp = async (req, res) => {
    try {
      const { name, email, password,role } = req.body;
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({
          success: false,
          message: "one of the mandotary field is empty",
        });
      }
  
      if (await userModel.findOne({ email })) {
        return res.json({
          success: false,
          message: "user already exists",
        });
      }
  
      let securedPassword;
  
      try {
        securedPassword = await bcrypt.hash(password, 10);
      } catch (error) {
        return res.json({
          success: false,
          message: "hasing was unsuccesfull",
        });
      }
  
      const user = await userModel.create({
        name,
        email,
        password: securedPassword,
        role
      });
  
      user.password = undefined;
  
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
      });
  
      return res
        .cookie("token", accessToken, {
          expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .status(200)
        .json({
          success: true,
          user: user,
          token: accessToken,
          message: "user created successfully",
        });
    } catch (error) {
      res.json({
        message: "error occured",
        error: error.message,
      });
    }
  };
  
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.json({
          success: false,
          message: "enter email and password",
        });
      }
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(200).json({
          success: false,
          message: "user does not exist",
        });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        user.password = undefined;
        const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "24h",
        });
  
        return res
          .cookie("token", accessToken, {
            expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .json({
            success: true,
            user: user,
            token: accessToken,
            message: "user logged in successfully",
          });
      } else {
        return res.status(200).json({
          success: false,
          message: "password incorrect",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: " error occured while logging in the user ",
        error: error.message,
      });
    }
  };
  
  exports.getUser = async (req, res) => {
    try {
      const userId = req.user.user._id;
  
      const user = await userModel.findOne({ _id: userId });
  
      if (!user) {
        return res.status(500).json({
          success: false,
          message: " no such user found",
          // error:error.message
        });
      }
  
      user.password = undefined;
  
      return res.status(200).json({
        success: true,
        user,
        message: " user found successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: " error occured while getting user",
        error: error.message,
      });
    }
  };
  
  exports.logout = async (req, res) => {
    try {
      res
        .status(201)
        .cookie("token","", {
          httpOnly: true,
          expires: new Date(Date.now()),
          sameSite: "None",
          secure: true,
        })
        .json({
          success: true,
          message: "user logged out successfully",
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: " error occured logging out the user ",
        error: error.message,
      });
    }
  };
  