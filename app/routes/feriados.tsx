import { json } from "@remix-run/node";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetcher = createZodFetcher()

const schema = z.array(z.object(
  {
  name: z.string().min(1),
  type: z.string().min(1),
  date: z.string().min(1).transform((date) => new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }))}).transform(({name, date})=> ({name, date})))

  export const loader = async () => {
    const feriados = await fetcher(schema, 'https://brasilapi.com.br/api/feriados/v1/2023')

    return json(feriados)
  }