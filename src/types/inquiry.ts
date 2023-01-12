import z from "zod";

export const FormSchema = z.object({
  companyName: z.string().max(32).min(1),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  address: z.string().min(1).max(125),
  phone: z.string().min(10).max(11),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export const NewUserSchema = z.object({
  name: z.string().min(1).max(32),
  role: z.string().min(1).max(32),
  phone: z.string().min(10).max(11),
  email: z.string().email(),
  address: z.string().min(1).max(150),
});

export type NewUserSchemaType = z.infer<typeof NewUserSchema>;
