import type { VercelRequest, VercelResponse } from '@vercel/node';

// Vercel Serverless Function for Live Real-Time Scraping of OLX.ro, Imobiliare.ro, Storia.ro, and HomeZZ.ro
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
    const allowedDomains = ['olx.ro', 'imobiliare.ro', 'storia.ro', 'homezz.ro'];
    const isAllowed = allowedDomains.some(d => parsedUrl.hostname.includes(d));

    if (!isAllowed) {
      return res.status(400).json({ 
        error: 'Only OLX.ro, Imobiliare.ro, Storia.ro, and HomeZZ.ro URLs are supported for real-time verification.' 
      });
    }

    // Realistic browser headers to bypass simple bot filters
    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7',
      'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
    };

    const response = await fetch(targetUrl, {
      headers,
      redirect: 'follow',
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Remote listing server returned HTTP status: ${response.status}` 
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
