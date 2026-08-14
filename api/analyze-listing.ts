import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel Serverless Function for Live Real-Time Scraping of OLX.ro & Imobiliare.ro
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid URL parameter' });
  }

  try {
    const targetUrl = decodeURIComponent(url);

    // Validate hostname
    const parsedUrl = new URL(targetUrl);
    const allowedHosts = ['olx.ro', 'www.olx.ro', 'imobiliare.ro', 'www.imobiliare.ro', 'storia.ro', 'www.storia.ro'];
    const isAllowed = allowedHosts.some(h => parsedUrl.hostname.endsWith(h));

    if (!isAllowed) {
      return res.status(400).json({ error: 'Only OLX.ro, Imobiliare.ro, and Storia.ro URLs are supported for real-time verification.' });
    }

    // Fetch live HTML with realistic browser headers
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Failed to fetch listing from source. HTTP status: ${response.status}` 
      });
    }

    const html = await response.text();

    return res.status(200).json({
      success: true,
      url: targetUrl,
      htmlLength: html.length,
      html,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'Error performing live scraping',
      message: error.message || String(error),
    });
  }
}
