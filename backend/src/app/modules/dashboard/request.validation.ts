const { z } = require("zod");

// --- PARCEL VALIDATION ---
const parcel = z.object({
    body: z.object({
        customerId: z.string().optional(),
        pickupAddress: z
            .string({ required_error: "Pickup address is required" })
            .min(5, "Pickup address must be at least 5 characters"),
        deliveryAddress: z
            .string({ required_error: "Delivery address is required" })
            .min(5, "Delivery address must be at least 5 characters"),
        parcelType: z.enum(["SMALL", "MEDIUM", "LARGE"], {
            required_error: "Parcel type is required",
        }),
        package_weight: z
            .number({ required_error: "Package weight is required" })
            .default(1),
        deliveryAmount: z.union([
            z.literal("FREE"),
            z.number(),
        ]).optional(),
        paymentMethod: z.enum(["COD", "PREPAID"], {
        }).optional(),
        coordinates: z
            .object({
                pickup: z
                    .object({
                        lat: z.number(),
                        lng: z.number(),
                    })
                    .optional(),
                delivery: z
                    .object({
                        lat: z.number(),
                        lng: z.number(),
                    })
                    .optional(),
            })
            .optional(),
        status: z
            .enum(["PENDING", "PICKED_UP", "IN_TRANSIT", "DELIVERED", "FAILED"])
            .optional(),
    }),
});


export const DashboardValidation = {
    parcel,
};

