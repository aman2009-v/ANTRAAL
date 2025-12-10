# ANTRAAL MUN Website - Quick Deployment Guide

## 🚀 Easy Deployment (Just Open index.html!)

The website is **fully static** and requires **NO server setup**. Simply:

1. **Double-click `index.html`** in the project folder
2. The website opens in your browser
3. That's it! You're done!

## 🌐 Publishing Online

### Option 1: GitHub Pages (Free, Easy)

1. Create a GitHub account at https://github.com
2. Create a new repository (e.g., "antraal-mun-website")
3. Upload all files to the repository
4. Go to: Settings → Pages
5. Select: "Deploy from a branch" → "main" branch → "/ (root)"
6. Click: Save
7. Wait 1-2 minutes
8. Your site is live at: `https://yourusername.github.io/antraal-mun-website/`

### Option 2: Netlify (Free, Instant)

1. Go to https://www.netlify.com
2. Drag and drop the entire project folder onto the Netlify page
3. Your site is live instantly!
4. Customize your URL in site settings

### Option 3: Vercel (Free, Fast)

1. Install Vercel CLI: `npm i -g vercel`
2. Open terminal in project folder
3. Run: `vercel`
4. Follow prompts
5. Your site is live!

## 📧 Form Setup

The forms use **FormSubmit** service:

1. Forms will send to: `yadavamanjeet317@gmail.com`
2. After first form submission, check email for verification
3. Verify the email to start receiving submissions
4. No backend code needed!

## ✏️ Things to Customize Before Launch

### 1. Payment Information (in registration.html)
- Line ~220: Add your QR code image
- Line ~225: Add payment amount
- Line ~226: Add bank account details

### 2. Contact Information (in contact.html)
- Add phone number
- Add event location

### 3. Committee Details (in matrix.html)
- Update chair information when available
- Update agendas if changed

### 4. Team Photos (Optional)
- Replace placeholder divs with actual team photos
- Update in `team.html`

## 📱 Testing Checklist

- [ ] Open `index.html` and navigate all pages
- [ ] Test mobile menu on small screen
- [ ] Test countdown timer
- [ ] Test registration form (all 3 steps)
- [ ] Test committee card flips
- [ ] Test team member card flips
- [ ] Test all links
- [ ] Test Instagram redirect

## 🎨 Customization

**Changing Colors:**
Edit `styles.css` line 3-4:
```css
--major-color: rgba(125, 15, 54);
--minor-color: #d387a4;
```

**Changing Event Date:**
Edit `script.js` line 15:
```javascript
const eventDate = new Date('2025-08-31').getTime();
```

**Changing Email:**
Edit `registration.html` and `contact.html`:
Replace: `yadavamanjeet317@gmail.com` with your email

## 🔧 Troubleshooting

**Q: Countdown shows 00:00:00**
A: Check JavaScript is enabled. Open browser console (F12) for errors.

**Q: Forms don't submit**
A: Check internet connection. FormSubmit requires internet.

**Q: Images don't show**
A: Ensure you've added images to the project folder.

**Q: Mobile menu doesn't work**
A: Ensure JavaScript is enabled in your browser.

## 💡 Tips

- **Fastest deployment**: Just upload to Netlify
- **Best for updates**: GitHub Pages with continuous deployment
- **Professional**: Custom domain pointing to your hosting

## 📞 Need Help?

Email: yadavamanjeet317@gmail.com

---

**Last Updated**: 2024

