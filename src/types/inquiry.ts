import z from "zod";

export const FormSchema = z.object({
  companyName: z.string().max(32).min(1),
  fname: z.string().min(1).max(32),
  lname: z.string().min(1).max(32),
  email: z.string().email(),
  country: z.string().refine((val) => ["United State", "Canada"].includes(val)),
  address: z.string().min(1).max(125),
  phone: z.string().min(10).max(11),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
