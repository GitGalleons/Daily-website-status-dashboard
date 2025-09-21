// Node script: checks a list of URLs and writes reports/status.md
// Requires Node 18+ (global fetch available)
const fs = require('fs');
const path = require('path');

const urls = [
  "https://orange-cherry-fa56.mrouf7353.workers.dev/",
  "https://deboraj-roy.github.io/Library-Management-System-SinglePage/login",
  "https://bookstoredeb.runasp.net/",
  "http://eticket.runasp.net/",
  "http://movie-store.runasp.net/",
  "http://movie-store.runasp.net/Home/Index",
  "https://deboraj-roy.github.io/Resume/",
  "https://plumwillyt.bsite.net/",
  "https://deboraj-roy.github.io/Library-Management-System-SinglePage/",
  "https://librarydeb.netlify.app/",
  "https://librarydeb7.netlify.app/",
  "http://deblmsapi.runasp.net/",
  "https://green-breeze-a7aa.mrouf7353.workers.dev/",
  "https://www.p13839740.somee.com/",
  "https://lazynoja.bsite.net/",
  "http://mangoweb.runasp.net/",
  "https://aubreeazure.bsite.net/swagger/index.html",
  "http://crudnet.runasp.net/Employee",
  "https://github.com/Deboraj-roy/ASP.NET-Core-Microservices-NET-8",
  "https://github.com/Deboraj-roy/CRUD-ASP.NET",
  "http://mangoproduct.runasp.net/index.html",
  "http://mangoorder.runasp.net/index.html",
  "http://mangoemail.runasp.net/index.html",
  "http://mangocoupon.runasp.net/index.html",
  "http://debmangoauth.runasp.net/index.html",
  "http://deblmsapi.runasp.net/index.html",
  "http://mangogatewaysolution.runasp.net/",
  "http://mangoshoppingcart.runasp.net/index.html",
  "http://mangoreward.runasp.net",
  "https://console.cron-job.org/jobs",
  "https://dash.cloudflare.com/",
  "https://orange-cherry-fa56.mrouf7353.workers.dev/",
  "https://bookstoredeb.runasp.net/",
  "http://eticket.runasp.net/",
  "http://movie-store.runasp.net/",
  "http://movie-store.runasp.net/Home/Index",
  "https://deboraj-roy.github.io/Resume/",
  "https://plumwillyt.bsite.net/",
  "https://deboraj-roy.github.io/Library-Management-System-SinglePage/",
  "https://deboraj-roy.github.io/Library-Management-System-SinglePage/login",
  "http://deblmsapi.runasp.net/api/Library/Login?email=ovishak03%40gmail.com&password=admin1999",
  "https://librarydeb.netlify.app/",
  "https://librarydeb7.netlify.app/",
  "http://deblmsapi.runasp.net/",
  "http://deblmsapi.runasp.net/index.html",
  "https://green-breeze-a7aa.mrouf7353.workers.dev/",
  "https://www.p13839740.somee.com/",
  "https://lazynoja.bsite.net/",
  "http://mangoweb.runasp.net/",
  "https://aubreeazure.bsite.net/swagger/index.html",
  "http://crudnet.runasp.net/Employee",
  "http://mangoproduct.runasp.net/index.html",
  "http://mangoorder.runasp.net/index.html",
  "http://mangoemail.runasp.net/index.html",
  "http://mangocoupon.runasp.net/index.html",
  "http://debmangoauth.runasp.net/index.html",
  "http://mangogatewaysolution.runasp.net/",
  "http://mangoshoppingcart.runasp.net/index.html",
  "http://mangoreward.runasp.net",
  "http://mangoreward.runasp.net/index.htm"
];

const TIMEOUT = 20000; // ms

function formatDateForTZ(date, tz, options = {}) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    ...options
  });
  const parts = dtf.formatToParts(date);
  const datePart = `${parts.find(p=>p.type==='month').value} ${parts.find(p=>p.type==='day').value}, ${parts.find(p=>p.type==='year').value}`;
  const timePart = `${parts.find(p=>p.type==='hour').value}:${parts.find(p=>p.type==='minute').value}:${parts.find(p=>p.type==='second').value} ${parts.find(p=>p.type==='dayPeriod').value}`;
  return `${datePart} at ${timePart} (${tz})`;
}

async function checkUrl(url) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);
  const started = new Date();
  try {
    const resp = await fetch(url, { method: 'GET', signal: controller.signal, redirect: 'follow' });
    clearTimeout(id);
    return {
      url,
      status: resp.status,
      statusText: resp.statusText || (resp.status === 200 ? 'OK' : ''),
      timestamp: new Date(),
      durationMs: new Date() - started
    };
  } catch (err) {
    clearTimeout(id);
    return {
      url,
      status: 'ERR',
      statusText: err.name === 'AbortError' ? 'Timeout' : String(err.message),
      timestamp: new Date(),
      durationMs: new Date() - started
    };
  }
}

(async function main(){
  console.log(`Starting checks for ${urls.length} URLs...`);
  const results = [];
  for (const u of urls) {
    process.stdout.write(`Checking: ${u} ... `);
    const res = await checkUrl(u);
    console.log(`${res.status} (${res.statusText})`);
    results.push(res);
    await new Promise(r => setTimeout(r, 250));
  }

  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  const now = new Date();
  const lastUpdatedUTC = formatDateForTZ(now, 'UTC');
  const lastUpdatedDhaka = formatDateForTZ(now, 'Asia/Dhaka');
  const lastUpdatedLondon = formatDateForTZ(now, 'Europe/London');
  const lastUpdatedNewYork = formatDateForTZ(now, 'America/New_York');
  const lastUpdatedBerlin = formatDateForTZ(now, 'Europe/Berlin');
  const lastUpdatedShanghai = formatDateForTZ(now, 'Asia/Shanghai');

  let md = `# Daily Website Status Report

Last updated: ${lastUpdatedUTC}
- Asia/Dhaka: ${lastUpdatedDhaka}
- Europe/London (UK): ${lastUpdatedLondon}
- America/New_York (US): ${lastUpdatedNewYork}
- Europe/Berlin (Germany): ${lastUpdatedBerlin}
- Asia/Shanghai (China): ${lastUpdatedShanghai}

> Generated by scripts/check_sites.js on the GitHub Actions runner. Timestamps above help users in different regions see the update time.

| URL | Status | HTTP Code | Last Checked (UTC) | Asia/Dhaka | Europe/London | America/New_York | Europe/Berlin | Asia/Shanghai |
| --- | ------ | ---------:| ------------------:| ---------- | ------------- | ----------------:| -------------:| -------------:|
`;

  for (const r of results) {
    const utc = formatDateForTZ(r.timestamp, 'UTC');
    const dhaka = formatDateForTZ(r.timestamp, 'Asia/Dhaka');
    const london = formatDateForTZ(r.timestamp, 'Europe/London');
    const ny = formatDateForTZ(r.timestamp, 'America/New_York');
    const berlin = formatDateForTZ(r.timestamp, 'Europe/Berlin');
    const shanghai = formatDateForTZ(r.timestamp, 'Asia/Shanghai');
    const code = typeof r.status === 'number' ? r.status : r.status;
    const statusText = r.status === 'ERR' ? `Error: ${r.statusText}` : (r.statusText || '');
    const markdownUrl = r.url.replace(/\|/g, '%7C');
    md += `| ${markdownUrl} | ${statusText ? statusText.replace(/\|/g, '/') : (code)} | ${code} | ${utc} | ${dhaka} | ${london} | ${ny} | ${berlin} | ${shanghai} |\n`;
  }

  md += `\n\n_This file is auto-generated. If you want different timezones or formatting, edit scripts/check_sites.js._\n`;

  const outPath = path.join(reportsDir, 'status.md');
  fs.writeFileSync(outPath, md, { encoding: 'utf8' });
  console.log(`Wrote ${outPath}`);
})();