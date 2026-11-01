import { exportCsv } from '../../utils/data-hub-export';

export function GET() {
  return new Response(exportCsv(), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
}
