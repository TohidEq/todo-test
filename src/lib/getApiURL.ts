export default function getApiURL(): string {
  return process.env.API_URL || "http://localhost:3500";
}
