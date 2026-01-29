// Update your NIHBudgetManager grant discovery service to use this:

// Replace your existing API call with:
const VERCEL_API_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/api/grants';

export async function searchGrants(params: {
  keyword?: string;
  status?: string;
  agency?: string;
  page?: number;
  pageSize?: number;
}) {
  const searchParams = new URLSearchParams();
  
  if (params.keyword) searchParams.append('keyword', params.keyword);
  if (params.status) searchParams.append('status', params.status);
  if (params.agency) searchParams.append('agency', params.agency);
  if (params.page) searchParams.append('page', String(params.page));
  if (params.pageSize) searchParams.append('pageSize', String(params.pageSize));

  const response = await fetch(`${VERCEL_API_URL}?${searchParams}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch grants');
  }
  
  return response.json();
}

// Usage example:
// const grants = await searchGrants({ keyword: 'cancer research', status: 'posted' });
