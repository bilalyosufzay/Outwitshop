
import { z } from "zod";

export const verificationSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  ownerFullName: z.string().min(1, "Full name is required"),
  idNumber: z.string().min(1, "ID number is required"),
  businessRegistrationNumber: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  bankAccountName: z.string().min(1, "Bank account name is required"),
  bankAccountNumber: z.string().min(1, "Bank account number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  taxNumber: z.string().optional(),
});

export type VerificationFormValues = z.infer<typeof verificationSchema>;
