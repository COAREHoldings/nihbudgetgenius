// Vercel API Route: /api/grants
// Deploy this to your Vercel project to proxy Grants.gov API calls

import type { VercelRequest, VercelResponse } from '@vercel/node';

const GRANTS_API_BASE = 'https://api.simpler.grants.gov/v1';
const API_KEY = process.env.GRANTS_GOV_API_KEY || '5sPGTgN69pjqTLSPZYNUP5SyL';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { keyword, status, agency, page = 1, pageSize = 25 } = req.query;

    const params = new URLSearchParams();
    if (keyword) params.append('keyword', String(keyword));
    if (status) params.append('status', String(status));
    if (agency) params.append('agency', String(agency));
    params.append('page', String(page));
    params.append('pageSize', String(pageSize));

    const response = await fetch(`${GRANTS_API_BASE}/opportunities?${params}`, {
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Grants.gov API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch grants' });
  }
}
