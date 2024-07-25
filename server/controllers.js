const parcelModel = require("./models/parcel.model");


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