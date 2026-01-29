
# Chatvybz Migration Plan

## Current Status

**Issue**: The `package.json` is missing the required `build:dev` script, causing the build to fail.

**Project State**: The Lovable project contains only a blank starter template with default files. Your 50+ pages and 60+ services from the original Chatvybz project need to be migrated.

---

## Step 1: Fix the Build Error (You Need to Do This)

Since I cannot edit `package.json` directly, you need to add the missing script:

1. Click the **Code** button (top-left of the preview)
2. Open `package.json`
3. Find the `"scripts"` section (around line 86)
4. Change it from:
```json
"scripts": {
  "start": "vite",
  "build": "vite build --sourcemap",
  "serve": "vite preview"
}
```
To:
```json
"scripts": {
  "start": "vite",
  "build": "vite build --sourcemap",
  "build:dev": "vite build --mode development",
  "serve": "vite preview"
}
```
5. Save the file

---

## Step 2: Migration Strategy

Once the build is working, we'll migrate your Chatvybz project in batches:

### Phase 1: Core Foundation
Upload these folders/files first (5-10 files per message):
- `src/pages/` - Core pages like Login, Home, Chat
- `src/App.tsx` and `src/Routes.tsx` - Main routing

### Phase 2: Components
- `src/components/` - UI components in batches

### Phase 3: Services & Logic
- `src/services/` - API and backend services
- `src/hooks/` - Custom React hooks
- `src/store/` or `src/redux/` - State management

### Phase 4: Assets & Config
- `src/styles/` or CSS files
- `public/` assets
- Configuration files

---

## What I'll Do For Each Batch

For each batch of files you upload:
1. Review and adapt imports/paths for Lovable's structure
2. Fix any TypeScript errors
3. Integrate with existing UI components
4. Update routing in `App.tsx`
5. Test the integration

---

## Technical Notes

**Dependencies**: Already in place - Supabase, Socket.IO, Stripe, TweetNaCl, WaveSurfer.js, and AI SDKs are all installed.

**Backend**: You'll need to connect Lovable Cloud (Supabase) for database, auth, and edge functions. This can be done after the code is migrated.

---

## Next Steps

1. **Fix the build:dev script** in the Code Editor (see Step 1 above)
2. **Confirm the build works** by sending a message
3. **Start uploading files** from `src/pages/` (5-10 files at a time)

Ready to proceed once you've added the script!
