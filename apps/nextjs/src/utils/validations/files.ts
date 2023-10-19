import { z } from "zod";

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  extension: z.string(),
  size: z.string(),
});

export type File = z.infer<typeof fileSchema>;
