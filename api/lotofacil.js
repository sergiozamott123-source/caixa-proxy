export default async function handler(req, res) {
  try {
    const concurso = req.query.concurso;
    const url = concurso
      ? `https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/${concurso}`
      : `https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      res.status(response.status).json({ error: `Caixa retornou status ${response.status}` });
      return;
    }

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
