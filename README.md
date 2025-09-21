# Daily-website-status-dashboard
Daily-website-status-dashboard
```notmd
# Daily Website Status Dashboard

This repository contains a GitHub Actions workflow that checks a list of websites and stores the results in `reports/status.md`. It provides two workflows:

- .github/workflows/website-check-auto.yml — runs automatically daily at 05:00 AM (UTC+6).
- .github/workflows/website-check-manual.yml — can be run on demand with "Run workflow" in the Actions UI.

How it works:
- scripts/check_sites.js performs HTTP requests and writes `reports/status.md` with timestamps in multiple timezones (Asia/Dhaka, UK, US, Germany, China).
- The scheduled workflow uses `permissions: contents: write` so it can commit and push the generated report back to the repo using the provided GITHUB_TOKEN.
- index.html + style.css renders the Markdown report for easy viewing (works on GitHub Pages).

Suggested repository name: `daily-website-status-dashboard`

Notes:
- Requires Node 18+ on the runner (workflow uses setup-node to install Node 18).
- If you enable GitHub Pages (branch: main, folder: root) the dashboard will be viewable at https://<owner>.github.io/<repo>.
- The script runs sequentially to be polite to remote servers. To speed up, you can parallelize checks but be mindful of rate limits.
```
 - Check Updated: [Report](https://github.com/GitGalleons/Daily-website-status-dashboard/blob/main/reports/status.md)

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
