// controllers/dashboardController.js
const TeacherDashboardModel = require('../models/TeacherDashboardModel');
const ParentDashboardModel = require('../models/ParentDashboardModel');
const StudentDashboardModel = require('../models/StudentDashboardModel');

// Controller function for teacher dashboard
export const getTeacherDashboard = async (req, res, next) => {
  try {
    const { filter = '{}', sort = '{}', limit = 100, skip = 0 } = req.query;

    // Fetch and parse filter/sort data from query parameters
    const parsedFilter = JSON.parse(filter);
    const parsedSort = JSON.parse(sort);

    // Fetch data specific to teachers from the model
    const dashboardData = await TeacherDashboardModel
      .find(parsedFilter)
      .sort(parsedSort)
      .limit(Number(limit))
      .skip(Number(skip));

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};

// Controller function for parent dashboard
export const getParentDashboard = async (req, res, next) => {
  try {
    const { filter = '{}', sort = '{}', limit = 100, skip = 0 } = req.query;

    const parsedFilter = JSON.parse(filter);
    const parsedSort = JSON.parse(sort);

    const dashboardData = await ParentDashboardModel
      .find(parsedFilter)
      .sort(parsedSort)
      .limit(Number(limit))
      .skip(Number(skip));

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};

// Controller function for student dashboard
export const getStudentDashboard = async (req, res, next) => {
  try {
    const { filter = '{}', sort = '{}', limit = 100, skip = 0 } = req.query;

    const parsedFilter = JSON.parse(filter);
    const parsedSort = JSON.parse(sort);

    const dashboardData = await StudentDashboardModel
      .find(parsedFilter)
      .sort(parsedSort)
      .limit(Number(limit))
      .skip(Number(skip));

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};
