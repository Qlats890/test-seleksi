import express from 'express';
import type { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import { routers } from './routers';

const app:Express = express();
const PORT = Bun.env.PORT || 3000;

export const prisma = new PrismaClient({
  log:['query']
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use("/",routers)

app.listen(PORT, async () => {
  console.log('Server is running on port '+PORT);
});