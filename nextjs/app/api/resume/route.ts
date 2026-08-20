import { NextResponse } from 'next/server';
import { AppConstants } from '@/app/constants/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  const res = await fetch(AppConstants.CONTACT_RESUME);
  if (!res.ok) {
    return new NextResponse('Failed to fetch resume', { status: res.status });
  }
  const body = await res.arrayBuffer();
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
