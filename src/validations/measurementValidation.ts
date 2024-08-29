import { z } from 'zod';
import { isBase64 } from '../utils/isBase64';

export const measureSchema = z.object({
  image: z.string().refine(isBase64, {
    message: 'A imagem fornecida não está no formato base64 válido',
  }),
  customer_code: z.string().min(1, 'Customer code é obrigatório'),
  measure_datetime: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Formatação de data inválida',
  }),
  measure_type: z.string().refine(val => ['WATER', 'GAS'].includes(val.toUpperCase()), {
    message: 'Tipo de medição inválido',
  }),
});

export const confirmMeasureSchema = z.object({
  measure_uuid: z.string().min(1, 'Measure uuid é obrigatório'),
  confirmed_value: z.number().min(0, 'Valor confirmado deve ser maior ou igual a 0'),
});