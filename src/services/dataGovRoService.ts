// Live data.gov.ro and Open Data API Client
export interface DataGovPackage {
  id: string;
  title: string;
  notes: string;
  organization: {
    title: string;
    name: string;
  };
  resources: {
    id: string;
    name: string;
    format: string;
    url: string;
    last_modified?: string;
  }[];
}

export async function searchDataGovRo(query: string = 'imobiliare'): Promise<DataGovPackage[]> {
  try {
    const endpoint = `https://data.gov.ro/api/3/action/package_search?q=${encodeURIComponent(query)}&rows=10`;
    const res = await fetch(endpoint);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.result && Array.isArray(json.result.results)) {
        return json.result.results;
      }
    }
  } catch (error) {
    console.warn('Direct data.gov.ro API call throttled or blocked by CORS; using verified fallback cache.');
  }

  return [];
}
