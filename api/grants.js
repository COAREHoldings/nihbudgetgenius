export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { keyword, status, agency, page = 1, pageSize = 25 } = req.query;
    const API_KEY = process.env.GRANTS_GOV_API_KEY || '5sPGTgN69pjqTLSPZYNUP5SyL';

    const params = new URLSearchParams();
    if (keyword) params.append('keyword', String(keyword));
    if (status) params.append('status', String(status));
    if (agency) params.append('agency', String(agency));
    params.append('page', String(page));
    params.append('pageSize', String(pageSize));

    const response = await fetch(`https://api.simpler.grants.gov/v1/opportunities?${params}`, {
      headers: { 'X-Api-Key': API_KEY }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch grants' });
  }
}
