import { TeacherDashboardModel } from "../models/teacher-dashboard.js";
import { ParentDashboardModel } from "../models/parent-dashboard.js";
import { StudentDashboardModel } from "../models/student-dashboard.js";

const safeParseJSON = (data, defaultValue = {}) => {
  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
};

// Controller function for teacher dashboard
export const getTeacherDashboard = async (req, res, next) => {
  try {
    const { filter = '{}', sort = '{}', limit = 100, skip = 0 } = req.query;

    const parsedFilter = safeParseJSON(filter);
    const parsedSort = safeParseJSON(sort);

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

    const parsedFilter = safeParseJSON(filter);
    const parsedSort = safeParseJSON(sort);

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

    const parsedFilter = safeParseJSON(filter);
    const parsedSort = safeParseJSON(sort);

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
