# Wake Up John - Band Website

A modern, static single-page website for Wake Up John band.

## Features

- Modern, responsive single-page design
- Clean animations and smooth scrolling
- Social media integration
- Music streaming platform links
- Shows/Events section
- Contact section
- Mobile-friendly navigation

## Project Structure

```
.
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── main.js         # JavaScript for interactions
├── images/             # Place your images here
├── .github/
│   └── workflows/      # GitHub Actions for deployment
│       ├── deploy-github-pages.yml
│       └── deploy-lightsail.yml
└── README.md
```

## Customization

### Update Content

1. **Hero Section**: Edit the band name and tagline in [index.html](index.html) (lines 32-36)
2. **About Section**: Add your band's story (lines 45-49)
3. **Music Links**: Update streaming platform URLs (lines 57-95)
4. **Shows**: Add upcoming tour dates (lines 120-135)
5. **Contact**: Update social media links and email (lines 144-180)

### Add Logo/Images

1. Place your logo in the `images/` folder
2. Update the hero section or navigation in [index.html](index.html)

### Color Scheme

Edit CSS variables in [css/style.css](css/style.css) (lines 1-11):

```css
:root {
    --primary-color: #FFD700;        /* Yellow - change to your brand color */
    --primary-dark: #F0C000;
    --secondary-color: #1a1a1a;
    --text-color: #333;
    /* ... */
}
```

## Deployment Options

### Option 1: GitHub Pages (Recommended for Static Sites)

**Pros**: Free, simple, automatic deployment
**Best for**: Static band websites

#### Setup Steps:

1. **Create GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wake-up-john.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Source: Select "GitHub Actions"
   - The workflow will deploy automatically on every push to `main`

3. **Your site will be live at**:
   ```
   https://YOUR_USERNAME.github.io/wake-up-john/
   ```

4. **Custom Domain** (optional):
   - In repository Settings → Pages → Custom domain
   - Add your domain (e.g., `wakeupjohn.com`)
   - Update DNS records with your domain provider:
     ```
     A records:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

### Option 2: AWS Lightsail

**Pros**: More control, good for scaling, cheap
**Cost**: ~$3.50-5/month for basic instance

#### Setup Steps:

1. **Create Lightsail Instance**:
   - Go to [AWS Lightsail](https://lightsail.aws.amazon.com/)
   - Create instance → OS Only → Ubuntu 22.04 LTS
   - Choose instance plan ($3.50/month is fine for a band site)
   - Name it (e.g., "wakeupjohn-website")

2. **Configure Lightsail Instance**:

   SSH into your instance and run:
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Nginx (lighter than Apache for static sites)
   sudo apt install nginx -y

   # Start and enable Nginx
   sudo systemctl start nginx
   sudo systemctl enable nginx

   # Create website directory
   sudo mkdir -p /var/www/html
   sudo chown -R ubuntu:ubuntu /var/www/html
   ```

3. **Configure GitHub Secrets**:

   In your GitHub repository: Settings → Secrets and variables → Actions

   Add these secrets:
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
   - `AWS_REGION`: Your region (e.g., `us-east-1`)
   - `LIGHTSAIL_IP`: Your instance's static IP
   - `SSH_PRIVATE_KEY`: Your SSH private key for the instance

4. **Set up Static IP**:
   - In Lightsail console → Networking
   - Create static IP and attach to your instance

5. **Configure Domain** (optional):
   - In Lightsail → Networking → DNS zones
   - Create DNS zone for your domain
   - Add A record pointing to your static IP

6. **Enable HTTPS with Let's Encrypt**:
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx -y

   # Get certificate (replace with your domain)
   sudo certbot --nginx -d wakeupjohn.com -d www.wakeupjohn.com
   ```

7. **Update Nginx Configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   Update the root directory:
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

8. **Enable Deployment**:
   - Uncomment the rsync section in [.github/workflows/deploy-lightsail.yml](.github/workflows/deploy-lightsail.yml)
   - Push to GitHub - automatic deployment will trigger

### Deployment Comparison

| Feature | GitHub Pages | Lightsail |
|---------|--------------|-----------|
| Cost | Free | ~$3.50-5/month |
| Setup Complexity | Easy | Moderate |
| Custom Domain | Yes (free) | Yes |
| HTTPS | Automatic | Manual (free with Let's Encrypt) |
| Server Control | No | Yes |
| Best For | Simple static sites | Need server control/backend later |

**Recommendation**: Start with **GitHub Pages** for simplicity. Switch to Lightsail only if you need server-side features later.

## Local Development

To test locally:

1. **Simple HTTP Server** (Python):
   ```bash
   cd "New WUJ Site"
   python -m http.server 8000
   ```
   Visit: http://localhost:8000

2. **Or use VS Code Live Server**:
   - Install "Live Server" extension
   - Right-click [index.html](index.html) → "Open with Live Server"

## Next Steps

1. Add your band's logo to the `images/` folder
2. Update all placeholder text with real content
3. Add actual tour dates and ticket links
4. Embed Spotify/YouTube player in the music section
5. Take high-quality photos for backgrounds
6. Set up analytics (Google Analytics) if desired
7. Initialize Git and push to GitHub
8. Enable GitHub Pages or set up Lightsail

## Support

For issues or questions about the website, check:
- [GitHub Issues](https://github.com/YOUR_USERNAME/wake-up-john/issues)

---

Built with vanilla HTML, CSS, and JavaScript. No frameworks needed!
