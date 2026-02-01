# Iconiq - Change Log

This document tracks all changes made to the Iconiq Angular 16 application.

---

## February 1, 2026

### 🔄 Search Re-fetch on Input Change

#### 7. Fixed Search to Re-fetch When Search Word Changes

**File:** `src/app/components/searchrow/searchrow.component.ts`

**Problem:** When searching for a new word while search results were already displayed, the component didn't fetch new results because `ngOnInit` only runs once.

**Solution:**

- Implemented `OnChanges` lifecycle hook to detect `@Input()` changes
- Extracted fetch logic into a reusable `fetchIcons()` method
- Component now re-fetches icons whenever the `heading` input changes
- Removed `!changes['heading'].firstChange` check that was preventing initial fetch
- Added proper error handling for API calls

---

### 🌐 API Endpoint Update

#### 6. Changed API Endpoint to public-api.streamlinehq.com

**Files:** `proxy.conf.json`, `vercel.json`

**Problem:** The original API endpoint `api.streamlinehq.com` was not resolving (non-existent domain).

**Solution:** Updated to the correct endpoint `public-api.streamlinehq.com`:

- Updated proxy config for local development
- Updated Vercel rewrites for production deployment

---

### 🔧 Vercel Deployment Fixes

#### 1. Fixed Production Environment Configuration

**File:** `src/environments/environment.ts`

**Problem:** The production environment file was empty, causing API calls to fail on Vercel deployment.

**Solution:** Added all required environment variables:

```typescript
export const environment = {
  production: true,
  apiUrl: "/v1/search/global?productType=icons&query=",
  familyUrl: "/v1/search/global?productType=icons&query=",
  svgUrl: "/v1/icons/",
  apiKey: "FzeiBsUcJK7krmOi.3ce45df5e9185184d45a0be189b2100c",
};
```

---

#### 2. Fixed Vercel Rewrites Configuration

**File:** `vercel.json`

**Problem:** The rewrite syntax `:path*` was not working correctly in Vercel.

**Solution:** Changed to proper regex capture group syntax:

```json
{
  "rewrites": [
    {
      "source": "/v1/(.*)",
      "destination": "https://api.streamlinehq.com/v1/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

#### 3. Removed `withCredentials` from HTTP Requests

**File:** `src/services/icon-service.service.ts`

**Problem:** `withCredentials: true` was causing CORS issues when proxying to the third-party API.

**Solution:** Removed `withCredentials: true` from all HTTP calls:

- `getIconBySearch()`
- `getfamilyTrendingIcons()`
- `getSvgUrl()`

---

### 🔍 Search Bar Improvements

#### 4. Fixed Search Component State Management

**File:** `src/app/components/search/search.component.ts`

**Problems:**

- The `isSearch` flag was never updated from the service
- Clear (X) button didn't reset the search state in the service
- No Enter key support for search

**Solutions:**

- Added subscription to `isSearch$` observable to sync state
- Implemented proper lifecycle hooks (`OnInit`, `OnDestroy`)
- Added `handleKeyPress()` method for Enter key support
- Fixed `handleCross()` to properly reset service state
- Added subscription cleanup to prevent memory leaks

---

#### 5. Added Enter Key Support to Search Input

**File:** `src/app/components/search/search.component.html`

**Changes:**

- Added `(keypress)="handleKeyPress($event)"` to input field
- Improved X button styling with hover effects

---

## Summary of Files Modified

| File                                              | Type of Change          |
| ------------------------------------------------- | ----------------------- |
| `src/environments/environment.ts`                 | Added production config |
| `vercel.json`                                     | Fixed rewrite syntax    |
| `src/services/icon-service.service.ts`            | Removed withCredentials |
| `src/app/components/search/search.component.ts`   | Fixed state management  |
| `src/app/components/search/search.component.html` | Added Enter key support |

---

## Notes

- **API Key Security:** Consider moving the API key to Vercel environment variables for better security.
- **Angular Version:** 16
- **CSS Framework:** TailwindCSS 3
