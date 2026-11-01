import { exportMeta, exportRows } from '../../utils/data-hub-export';

export function GET() {
  const body = JSON.stringify(
    { ...exportMeta(), indicators: exportRows() },
    null,
    2,
  );
  return new Response(body, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
