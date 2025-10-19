import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { getDb } from "../../../db";

export async function POST() {
  const db = getDb();
  const records = await db.insert(advocates).values(advocateData).returning();

  return Response.json({ advocates: records });
}
