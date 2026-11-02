# POLISH 925 — Deployment & Hosting Guide

Your website is now completely configured so that:
1. **Public visitors only see the clean, luxury jewelry store & booking portal**. All Admin buttons, links, and portals are completely hidden.
2. **Only YOU can open the Admin portal** using your secret URL or clicking the footer signature.

---

## 🔒 How YOU Access the Secret Admin Portal

Because the admin button is hidden from regular visitors, you access the login screen using either:

### Method 1: The Secret URL (Easiest)
Append `/#admin` to your domain or local address:
- Locally: **`http://localhost:5000/#admin`**
- When Hosted: **`https://your-domain.com/#admin`**

### Method 2: The Secret Footer Click
Scroll down to the footer and click on the copyright notice:
👉 **`© 2026 POLISH 925. All rights reserved.`**
This will immediately open your secure Admin Login dialog.

*(Default credentials: Username: `admin`, Password: `polish925admin` — you can change this anytime with `python3 create_admin.py`)*

---

## ☁️ How to Host It Online (Step-by-Step)

The project includes `requirements.txt` and `Procfile`, making it ready for 1-click cloud hosting.

### 🌟 Option 1: Render.com (Recommended — 100% Free)
1. Push this folder to a GitHub repository:
   ```bash
   cd /home/alphakipkorir/Desktop/Polish925
   git init
   git add .
   git commit -m "Initial Polish925 deploy"
   # Create a repo on github.com and push to it
   ```
2. Go to **[render.com](https://render.com)** and create a free account.
3. Click **"New +"** $\to$ **"Web Service"**.
4. Connect your GitHub repository.
5. Set:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn backend.app:app`
6. Click **Deploy Web Service**!
   Render will give you a free live URL like `https://polish925.onrender.com`.

---

### 🌟 Option 2: Railway.app (Very Fast)
1. Go to **[railway.app](https://railway.app)**.
2. Click **New Project** $\to$ **Deploy from GitHub Repo**.
3. Railway automatically detects `requirements.txt` and `Procfile` and launches your website in under 2 minutes.

---

### 🌟 Option 3: VPS / Ubuntu Cloud Server (DigitalOcean, Linode, AWS)
If you are hosting on your own Linux VPS with a custom domain (e.g. `polish925.co.ke`):
1. Copy the project to your server: `/var/www/Polish925`.
2. Install requirements:
   ```bash
   pip3 install -r requirements.txt
   ```
3. Run as a systemd service or with Gunicorn:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
   ```
4. Point Nginx to `http://127.0.0.1:5000` with an SSL certificate from Let's Encrypt (`certbot`).

---

## 🌩️ Hosting with Cloudflare (Free & Fast)

You have `cloudflared` already installed on your Linux system.

### Method A: Instant Public Link (Cloudflare Quick Tunnel)
Run this single command from your project directory:
```bash
./start_cloudflare_tunnel.sh
```
Cloudflare will immediately provide a free, secure public HTTPS URL (like `https://random-name.trycloudflare.com`). Anyone worldwide can visit your site, while only you can access the admin dashboard via `/#admin`.

### Method B: Your Own Custom Domain via Cloudflare Zero Trust (Permanent)
If you own a domain like `polish925.co.ke` on Cloudflare:
1. Go to the [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/) -> **Networks** -> **Tunnels**.
2. Click **Create a Tunnel** (name it `polish925`).
3. Select **Debian/Ubuntu** and paste the provided `cloudflared service install <token>` command.
4. Under **Public Hostname**:
   - Subdomain: `@` or `www` (or `store`)
   - Domain: `polish925.co.ke`
   - Service: `HTTP` -> `127.0.0.1:5000`
5. Save! Your website and backend are now permanently live worldwide with Cloudflare's DDoS protection and global SSL.
