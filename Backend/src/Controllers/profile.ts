import { Request, Response } from 'express';
import { Farmer } from '../Models/farmer.model';

export const getFarmerProfile = async (req: Request, res: Response) => {
    const { farmerId } = req.body; // Assuming farmerId is passed as a route parameter

    try {
        const farmer = await Farmer.findById(farmerId).populate('fields').populate('recommendations');

        if (!farmer) {
            res.status(404).json({ message: 'Farmer not found.' });
            return;
        }

        res.status(200).json({ 
            message: 'Farmer profile fetched successfully',
            farmer
        });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
        return;
    }
};




export const updateFarmerProfile = async (req: Request, res: Response) => {
    const { farmerId } = req.body; 
    const {...updateData} = req.body;

    try {
        const updatedFarmer = await Farmer.findByIdAndUpdate(farmerId, updateData, { new: true }).populate('fields').populate('recommendations');

        if (!updatedFarmer) {
            res.status(404).json({ message: 'Farmer not found.' });
            return;
        }

        res.status(200).json({ 
            message: 'Farmer profile updated successfully',
            updatedFarmer
        });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: (error as Error).message });
        return;
    }
};