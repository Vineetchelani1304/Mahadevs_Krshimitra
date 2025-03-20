"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFarmerProfile = exports.getFarmerProfile = void 0;
const farmer_model_1 = require("../Models/farmer.model");
const getFarmerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmerId } = req.params; // Assuming farmerId is passed as a route parameter
    try {
        const farmer = yield farmer_model_1.Farmer.findById(farmerId).populate('fields').populate('recommendations');
        if (!farmer) {
            res.status(404).json({ message: 'Farmer not found.' });
            return;
        }
        res.status(200).json({
            message: 'Farmer profile fetched successfully',
            farmer
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        return;
    }
});
exports.getFarmerProfile = getFarmerProfile;
const updateFarmerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmerId } = req.params;
    const updateData = req.body;
    try {
        const updatedFarmer = yield farmer_model_1.Farmer.findByIdAndUpdate(farmerId, updateData, { new: true }).populate('fields').populate('recommendations');
        if (!updatedFarmer) {
            res.status(404).json({ message: 'Farmer not found.' });
            return;
        }
        res.status(200).json({
            message: 'Farmer profile updated successfully',
            updatedFarmer
        });
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        return;
    }
});
exports.updateFarmerProfile = updateFarmerProfile;
