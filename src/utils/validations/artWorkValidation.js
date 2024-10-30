import { z } from "zod";
import { addSuffixToFileName } from "../formatFile";

export const artWorkEditValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  dimension: z.string().optional(),
  author: z.string().optional(),
  archived: z.boolean().optional(),
  year: z.string().optional(),
  suport: z.string().optional(),
  image: z
    .union([
      z.object({
        name: z.string(),
        url: z.string(),
        size: z.number(),
        key: z.string(),
      }),
      z.instanceof(FileList).transform((list) => list[0]),
    ])
    .optional(),
  audioDesc: z
    .array(
      z.union([
        z.object({
          name: z.string(),
          url: z.string(),
          size: z.number(),
          key: z.string(),
          lang: z.string(),
        }),
        z.instanceof(FileList).transform((list, ctx) => {
          const file = list[0];
          const lang = ctx.path[1] === 0 ? "br" : "en"; // Determina o idioma baseado no índice
          return file ? addSuffixToFileName(file, lang) : "";
        }),
      ])
    )
    .optional(),
  audioGuia: z
    .array(
      z.union([
        z.object({
          name: z.string(),
          url: z.string(),
          size: z.number(),
          key: z.string(),
          lang: z.string(),
        }),
        z.instanceof(FileList).transform((list, ctx) => {
          const file = list[0];
          const lang = ctx.path[1] === 0 ? "br" : "en"; // Determina o idioma baseado no índice
          return file ? addSuffixToFileName(file, lang) : "";
        }),
      ])
    )
    .optional(),
});
