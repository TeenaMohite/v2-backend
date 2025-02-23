import express from 'express';
import ReportModel from '../models/reports.js'; // Rename the import to avoid conflict

const router = express.Router();

// Create a new report
router.post('/create', async (req, res) => {
    const { name, survey, employeesCount } = req.body;
    if (!name || !survey || !employeesCount) {
        return res.status(400).json({ message: 'Please fill all fields.' });
    }
    try {
        const participation = `0/${employeesCount} (0%)`;
        const newReport = new ReportModel({ name, survey, employeesCount, participation }); // Use renamed model
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all reports
router.get('/getall', async (req, res) => {
    try {
        const reports = await ReportModel.find(); // Use renamed model
        res.status(200).json(reports); // Send the array as JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a report by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedReport = await ReportModel.findByIdAndDelete(req.params.id); // Use renamed model
        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found.' });
        }
        res.status(200).json({ message: 'Report deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 