# Daily-website-status-dashboard
daily-website-status-dashboard
```notmd
# Daily Website Status Dashboard

This repository contains a GitHub Actions workflow that checks a list of websites daily and stores the results in `reports/status.md`. The repository also contains a small static dashboard that reads `reports/status.md` and renders it as a neat HTML table.

How it works:
- scripts/check_sites.js performs HTTP requests for the list of URLs and writes `reports/status.md`.
- .github/workflows/website-check.yml runs daily at 05:00 AM (UTC+6) and can also be triggered manually.
- The workflow commits `reports/status.md` back to the repository (it requires `permissions: contents: write`).
- index.html + style.css renders the Markdown report for easy viewing (can be served with GitHub Pages).

Suggested repo name: `daily-website-status-dashboard`
```
````

Notes and guidance (what I did and why)
- I added a Node.js script scripts/check_sites.js because Node 18's global fetch makes safe HTTP checks easy and formatting timestamps in different timezones straightforward via Intl.DateTimeFormat.
- The workflow runs at 23:00 UTC which equals 05:00 AM in UTC+6 (Asia/Dhaka), meeting the requirement. It also supports manual `workflow_dispatch`.
- The workflow includes permissions: contents: write so it can commit/push the generated report.
- index.html fetches the repository's /reports/status.md and converts it to HTML using the marked library; style.css provides a responsive, minimal design with clear green/red coloring for OK/error rows.
- The generated Markdown includes per-record timestamps in multiple timezones (Asia/Dhaka, UK, US, Germany, China) to meet the "dynamic user origin base" requirement.
- The workflow commits only when there are changes. The git user is set to "Deboraj-roy" with email "deborajroy123@gmail.com" as you provided.

What you should do next
- Create a new repository (suggested name: daily-website-status-dashboard) and push these files to the default branch (main).
- Optionally enable GitHub Pages for the repo (source: main branch / root) so index.html is viewable at https://<owner>.github.io/<repo>.
- If you wish to parallelize checks or increase concurrency, update scripts/check_sites.js to run multiple fetches concurrently (be mindful of rate limits).
- If you want other timezones shown or fewer columns, adjust the tz list in scripts/check_sites.js.

If you want, I can:
- open a Pull Request in a repository you specify containing these files, or
- adjust the script to use concurrency, custom timeouts per domain, or add logging and JSON output as well as Markdown.