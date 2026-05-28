import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const AGENCY_EMAIL = process.env.KEKELI_EMAIL ?? "kekelicreativeagency@gmail.com";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kekeli.agency";
