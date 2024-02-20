import Database from "better-sqlite3";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";

import type { NewDevice } from "~/db/schema-sqlite/device";
import { devices } from "~/db/schema-sqlite/device";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export function generateVerificationCode() {
  return generateSecurityStamp();
}

export async function createDevice(device: NewDevice) {
  return await db.insert(devices).values(device);
}

export async function getDevicesWithUserId(userId: number) {
  const result = await db
    .select()
    .from(devices)
    .where(eq(devices.userId, userId));

  if (!result) {
    throw new ErrorNotFound(`User with id ${userId} not found`);
  }
  return result;
}

export async function updateDevice(device: NewDevice) {
  const updatedDevice = await db
    .update(devices)
    .set(device)
    .where(
      and(
        eq(devices.userId, device.userId),
        eq(devices.verificationCode, device.verificationCode),
      ),
    );

  if (!updatedDevice) {
    throw new ErrorNotFound(
      `Device with userId ${device.userId} and verification code ${device.verificationCode} not found`,
    );
  }
  return updatedDevice;
}

export async function deleteDevice(id: number) {
  const deletedLogins = await db.delete(devices).where(eq(devices.id, id));
  return deletedLogins;
}
