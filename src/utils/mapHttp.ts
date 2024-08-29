export default function mapHttp(code: string): number {
  const mapHttpStatusCode: Record<string, number> = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  };
  return mapHttpStatusCode[code] ?? 500;
}