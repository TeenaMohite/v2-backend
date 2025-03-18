import express from 'express';
import ReportModel from '../models/reports.js';

const router = express.Router();

// Create a new report
router.post('/create', async (req, res) => {
    const { name, survey, employeesCount } = req.body;
    
    if (!name || !survey || !employeesCount) {
        return res.status(400).json({ message: 'Please fill all fields.' });
    }
    
    try {
        const participation = `0/${employeesCount} (0%)`;
        const status = 'Pending'; // Add a default status
        
        const newReport = new ReportModel({ 
            name, 
            survey, 
            employeesCount, 
            participation,
            status 
        });
        
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get all reports
router.get('/getall', async (req, res) => {
    try {
        const reports = await ReportModel.find();
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: error.message });
    }
});

// Delete a report by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Attempting to delete report with ID: ${id}`);
        
        const deletedReport = await ReportModel.findByIdAndDelete(id);
        
        if (!deletedReport) {
            console.log(`Report with ID ${id} not found`);
            return res.status(404).json({ message: 'Report not found.' });
        }
        
        console.log(`Successfully deleted report: ${deletedReport.name}`);
        res.status(200).json({ 
            message: 'Report deleted successfully.',
            deletedReportId: id 
        });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;