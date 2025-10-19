import { advocateData } from "../../../db/seed/advocates";
import { advocates } from "../../../db/schema";

export async function GET() {
  // Uncomment this line to use a database
  // import { getDb } from "../../../db";
  // const db = getDb();
  // const data = await db.select().from(advocates);

  const data = advocateData;

  return Response.json({ data });
}
