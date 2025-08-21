import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { DashboardValidation } from './request.validation';
import { DashboardController } from './dashboard.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

// --- Shipment Routes Admin---
router.post("/create-parcel",
    validateRequest(DashboardValidation.parcel),
    auth(ENUM_USER_ROLE.CUSTOMERS, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.createShipmentParcel
);

router.patch("/update-parcel/:id",
    validateRequest(DashboardValidation.parcel),
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.updateShipmentParcel
);

router.delete("/delete-parcel/:id",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.deleteShipmentParcel
);

router.get("/get-parcels",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.getAllShipmentParcels
);

router.patch("/assigned-parcel-agent",
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    DashboardController.assignedParcelAgent
);

// --- Parcel Routes Customer---
router.get("/get-my-parcels",
    auth(ENUM_USER_ROLE.CUSTOMERS),
    DashboardController.getMyParcels
);
export const DashboardRoutes = router;
