import { ApiError } from "@/lib/api/types";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function asRecord(value: unknown, context: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new ApiError("parse", `${context} was not an object.`);
  }
  return value;
}

export function asArray(value: unknown, context: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new ApiError("parse", `${context} was not an array.`);
  }
  return value;
}

export function requiredString(
  record: Record<string, unknown>,
  key: string,
  context: string,
): string {
  const value = record[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new ApiError("parse", `${context}.${key} was missing.`);
  }
  return value;
}

export function optionalString(
  record: Record<string, unknown>,
  key: string,
): string | null {
  const value = record[key];
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function requiredNumber(
  record: Record<string, unknown>,
  key: string,
  context: string,
): number {
  const value = record[key];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new ApiError("parse", `${context}.${key} was missing.`);
  }
  return value;
}

export function optionalNumber(
  record: Record<string, unknown>,
  key: string,
  fallback = 0,
): number {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function optionalBoolean(
  record: Record<string, unknown>,
  key: string,
  fallback = false,
): boolean {
  const value = record[key];
  return typeof value === "boolean" ? value : fallback;
}

export function optionalStringArray(
  record: Record<string, unknown>,
  key: string,
): string[] {
  const value = record[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}
