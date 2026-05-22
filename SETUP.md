# Landlite Philippines — New Website Setup Guide

Complete step-by-step instructions for deploying your new site from scratch.

---

## OVERVIEW

You'll create:
1. **GitHub** — stores your code (free)
2. **Supabase** — database for products (free tier)
3. **Vercel** — hosts the website (free tier)

Total cost: **₱0** to start.

---

## STEP 1 — GITHUB (Code Repository)

### 1.1 Create your GitHub account
1. Go to https://github.com
2. Click **Sign up**
3. Use your email (e.g. your Landlite email)
4. Verify your email

### 1.2 Create a new repository
1. Click the **+** icon (top right) → **New repository**
2. Repository name: `landlite-ph`
3. Set to **Private** (recommended)
4. ✅ Check "Add a README file"
5. Click **Create repository**

### 1.3 Upload your code
**Option A — GitHub Desktop (easiest, no terminal needed):**
1. Download GitHub Desktop: https://desktop.github.com
2. Sign in with your GitHub account
3. File → **Clone repository** → choose `landlite-ph`
4. Copy all the project files into the cloned folder
5. Write a commit message: "Initial Landlite website"
6. Click **Commit to main** → then **Push origin**

**Option B — Terminal:**
```bash
cd /path/to/landlite-ph
git init
git add .
git commit -m "Initial Landlite website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/landlite-ph.git
git push -u origin main
```

---

## STEP 2 — SUPABASE (Database)

### 2.1 Create Supabase account
1. Go to https://supabase.com
2. Click **Start your project**
3. Sign up with GitHub (easiest — links to your new account)

### 2.2 Create a new project
1. Click **New project**
2. Organization: your personal org (or create "Landlite Philippines")
3. Project name: `landlite-ph`
4. Database password: create a **strong password** and SAVE it somewhere safe
5. Region: **Southeast Asia (Singapore)** — closest to Philippines
6. Click **Create new project** (takes ~2 minutes to set up)

### 2.3 Get your API keys
1. In your project, go to **Settings** (gear icon, left sidebar)
2. Click **API**
3. Copy these two values — you'll need them later:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon / public key** (long string starting with `eyJ...`)

### 2.4 Create the products table (optional, for future product management)
1. Go to **Table Editor** → **New table**
2. Table name: `products`
3. Add these columns:

| Column Name   | Type        | Default         | Notes            |
|---------------|-------------|-----------------|------------------|
| id            | uuid        | gen_random_uuid()| Primary key ✅  |
| name          | text        | —               | Not null         |
| category      | text        | —               | Not null         |
| subcategory   | text        | —               |                  |
| description   | text        | —               |                  |
| price         | numeric     | —               |                  |
| image_url     | text        | —               |                  |
| is_featured   | bool        | false           |                  |
| created_at    | timestamptz | now()           |                  |

4. Click **Save**

### 2.5 Set up Storage (for product images)
1. Go to **Storage** → **New bucket**
2. Name: `product-images`
3. ✅ Make it **Public**
4. Click **Create bucket**

---

## STEP 3 — VERCEL (Hosting)

### 3.1 Create Vercel account
1. Go to https://vercel.com
2. Click **Sign Up**
3. Choose **Continue with GitHub** — log in with your GitHub account
4. Authorize Vercel to access your repositories

### 3.2 Import your project
1. On the Vercel dashboard, click **Add New** → **Project**
2. You'll see your GitHub repos — find `landlite-ph`
3. Click **Import**

### 3.3 Configure build settings
Vercel usually auto-detects Next.js. Confirm these settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave blank)
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.4 Add environment variables
Before clicking Deploy, scroll down to **Environment Variables**:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

Click **Add** after each one.

### 3.5 Deploy!
1. Click **Deploy**
2. Wait ~2 minutes for the build
3. You'll get a live URL like: `https://landlite-ph.vercel.app` 🎉

---

## STEP 4 — ADD YOUR CUSTOM DOMAIN (Optional)

If you want `landlitephilcorp.com` (or a new domain) to point to your new site:

### 4.1 In Vercel
1. Go to your project → **Settings** → **Domains**
2. Type your domain (e.g. `landlite-ph.com`) → **Add**
3. Vercel will show you DNS records to add

### 4.2 In your domain registrar (GoDaddy, Namecheap, etc.)
1. Log in to where you bought your domain
2. Go to DNS settings
3. Add the records Vercel gave you:
   - **A record**: `@` → Vercel IP
   - **CNAME record**: `www` → `cname.vercel-dns.com`
4. Wait 10–60 minutes for DNS to propagate

---

## STEP 5 — ADD YOUR LOGO

1. Put your logo file as `public/logo.png` in the project
   - Recommended: PNG with transparent background
   - Size: ~400×150px works best in the navbar
2. Commit and push to GitHub — Vercel auto-deploys

---

## STEP 6 — FUTURE UPDATES

Every time you change code:

**With GitHub Desktop:**
1. Make your changes in the project folder
2. Open GitHub Desktop → write a commit message
3. Click **Commit** → **Push origin**
4. Vercel automatically rebuilds and deploys in ~2 minutes

**With terminal:**
```bash
git add .
git commit -m "Describe your change"
git push
```

---

## FILE STRUCTURE REFERENCE

```
landlite-ph/
├── app/
│   ├── globals.css          ← Colors, fonts, animations
│   ├── layout.tsx           ← HTML wrapper, metadata
│   ├── page.tsx             ← HOMEPAGE (4 pillars)
│   ├── about/
│   │   └── page.tsx         ← About Us page
│   ├── products/
│   │   └── page.tsx         ← Products with 4 categories
│   ├── contact/
│   │   └── page.tsx         ← Contact page
│   └── outlets/
│       └── page.tsx         ← Outlets page
├── components/
│   └── Navbar.tsx           ← Navigation bar
├── lib/
│   └── supabase.ts          ← Database client
├── public/
│   └── logo.png             ← PUT YOUR LOGO HERE
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── .env.local.example       ← Copy to .env.local, fill in keys
```

---

## COLOR REFERENCE (Brand Guide)

| Color Variable    | Hex Code  | Usage                    |
|-------------------|-----------|--------------------------|
| `--azure`         | `#0EBBF0` | Primary accent, links    |
| `--azure-light`   | `#4DD9FF` | Headings, highlights     |
| `--azure-pale`    | `#B3EEFF` | Subtle text              |
| `--azure-deep`    | `#0880B8` | Buttons, dark accents    |
| `--navy`          | `#050D1A` | Main background          |
| `--dark-mid`      | `#0D1828` | Section backgrounds      |
| `--dark-card`     | `#0A1422` | Card backgrounds         |

To change any color, edit `app/globals.css` → `:root { }` block.

---

## SUPPORT

- **Next.js docs**: https://nextjs.org/docs
- **Supabase docs**: https://supabase.com/docs
- **Vercel docs**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
