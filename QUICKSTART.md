# Green Valley Clinic - Quick Start Guide

Get the application running in seconds!

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

You'll see output like:
```
[BS] Access URLs:
   Local: http://localhost:3000
   UI: http://localhost:3001/ui
```

## 3. Open in Browser

- **Staff Portal**: http://localhost:3000/clinic/
- **Patient Portal**: http://localhost:3000/public/

## 4. Start Coding!

- Modify any `.js` or `.scss` files
- Changes auto-compile and reload in browser
- Check browser console (F12) for any errors

---

## Available Commands

```bash
npm run dev        # Start dev server with live reload (recommended)
npm run sass       # Compile CSS once
npm run sass:watch # Watch and compile CSS
npm run serve      # Start server without Sass
```

---

## Project Structure at a Glance

```
clinic/              → Staff application
  └── views/        → Staff pages (Dashboard, Inventory, etc.)

public/             → Patient application  
  └── views/        → Patient pages (Landing, BookAppointment, etc.)

packages/
  ├── components/   → Reusable UI components
  └── styles/       → SCSS stylesheets
```

---

## Common Tasks

### Add a New Staff Page
1. Create `clinic/views/MyPage.js`
2. Add styles to `packages/styles/src/components/_clinical-views.scss`
3. Import in `clinic/index.js` and add to routing

### Add a New Patient Page
1. Create `public/views/MyPage.js`
2. Add styles to `packages/styles/src/components/_mobile-views.scss`
3. Import in `public/index.js` and add to routing

### Change Colors
Edit color variables in `packages/styles/src/base/_variables.scss`

---

## Troubleshooting

**CSS not updating?**
```bash
npm run sass
# Then refresh browser (Ctrl+Shift+R)
```

**Server won't start?**
```bash
# Try on different port
npx browser-sync start --server --port 3001
```

**Module errors?**
```bash
npm install
# Restart dev server
```

---

## Documentation

- **README.md** - Project overview and features
- **SETUP.md** - Detailed setup and debugging guide  
- **VERIFICATION.md** - Build verification checklist

---

## Next Steps

1. Run `npm run dev`
2. Open http://localhost:3000/clinic/
3. Check the staff dashboard
4. Navigate to http://localhost:3000/public/
5. Check the patient landing page
6. Start developing!

**Questions?** Check SETUP.md for detailed troubleshooting and architecture details.
