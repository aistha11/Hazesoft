import { Router } from 'express';

import authenticate from '../middlewares/authenticate';
import {
  getAllEmployees,
  createEmployee,
  getEmployeeByID,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller';

const EmployeeRouter = Router();

EmployeeRouter.get('/', getAllEmployees);
EmployeeRouter.get('/:id',  getEmployeeByID);
EmployeeRouter.post('/',  createEmployee);
EmployeeRouter.patch('/:id',  updateEmployee);
EmployeeRouter.delete('/:id',  deleteEmployee);

export default EmployeeRouter;
