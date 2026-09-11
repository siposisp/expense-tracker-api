import { Resend } from "resend";

console.log("Resend API Key cargada:", process.env.RESEND_API_KEY ? "Sí (existe)" : "NO existe");

export const resend = new Resend(process.env.RESEND_API_KEY);