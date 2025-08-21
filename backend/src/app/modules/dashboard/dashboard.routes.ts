import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { DashboardValidation } from './request.validation';
import { DashboardController } from './dashboard.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

// --- Shipment Routes ---
router.post("/create-parcel",
    validateRequest(DashboardValidation.parcel),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.createShipmentParcel
);

router.patch("/update-parcel/:id",
    validateRequest(DashboardValidation.parcel),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.updateShipmentParcel
);

router.post("/delete-parcel/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.deleteShipmentParcel
);

export const DashboardRoutes = router;
