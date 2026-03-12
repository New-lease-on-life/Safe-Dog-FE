import { z } from "zod";

export const petRegistrationSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  weight: z.number(),
  division: z.enum(["cat", "dog"]),
  species: z.string(),
  registrationNumber: z.number(),
  gender: z.enum(["male", "female"]),
  isNeutered: z.boolean(),
  profileImageUrl: z.string(),
  allergy: z.array(z.string()),
  diseases: z.array(z.string()),
});

export type PetRegistrationFormValues = z.infer<typeof petRegistrationSchema>;
