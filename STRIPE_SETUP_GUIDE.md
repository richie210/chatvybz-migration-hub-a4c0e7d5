# Stripe Payment Integration Setup Guide

## Overview
This guide covers the complete setup for Stripe payment processing in ChatVybz, including channel subscriptions, ad revenue splits, and creator payouts.

## Prerequisites
- Stripe account (https://stripe.com)
- Supabase project with admin access
- Node.js and npm installed

## Step 1: Stripe Account Setup

### 1.1 Create Stripe Account
1. Sign up at https://stripe.com
2. Complete business verification
3. Enable test mode for development

### 1.2 Get API Keys
1. Go to Developers > API keys
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`)
4. Store these securely

### 1.3 Enable Stripe Connect
1. Go to Connect > Settings
2. Enable Express accounts
3. Set up branding and business information
4. Configure payout settings

### 1.4 Create Webhook Endpoint
1. Go to Developers > Webhooks
2. Click "Add endpoint"
3. URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
4. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

## Step 2: Environment Variables

### 2.1 Frontend (.env)
Add to your `.env` file:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### 2.2 Supabase Edge Functions
Set these secrets in Supabase:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key_here
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
supabase secrets set APP_URL=https://your-app-domain.com
```

Or via Supabase Dashboard:
1. Go to Project Settings > Edge Functions
2. Add secrets:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `APP_URL`

## Step 3: Database Migration

### 3.1 Apply Migration
The migration file `20260110210000_stripe_channel_monetization.sql` has been created.

To apply:
1. Via Supabase Dashboard:
   - Go to SQL Editor
   - Run the migration file

2. Via CLI:
   ```bash
   supabase db push
   ```

### 3.2 Verify Tables
Check that these tables were created:
- `channel_subscription_tiers`
- `channel_subscriptions`
- `stripe_customers`
- `channel_revenue_splits`
- `ad_revenue_distribution`
- `creator_payouts`
- `stripe_webhook_events`

## Step 4: Deploy Edge Functions

### 4.1 Deploy Functions
```bash
supabase functions deploy create-stripe-customer
supabase functions deploy create-stripe-price
supabase functions deploy create-stripe-subscription
supabase functions deploy cancel-stripe-subscription
supabase functions deploy create-stripe-connect-account
supabase functions deploy create-stripe-payout
supabase functions deploy stripe-webhook
```

### 4.2 Verify Deployment
1. Go to Supabase Dashboard > Edge Functions
2. Confirm all functions are deployed
3. Test each function endpoint

## Step 5: Install NPM Packages

The following packages have been added to package.json:
```bash
npm install
```

Packages installed:
- `stripe@^14.0.0`
- `@stripe/react-stripe-js@^2.4.0`
- `@stripe/stripe-js@^3.0.0`

## Step 6: Create Subscription Tiers

### 6.1 Via Channel Management Dashboard
1. Navigate to Channel Management Dashboard
2. Click "Manage Monetization"
3. Create subscription tiers:
   - **Free**: $0/month (default)
   - **Premium**: $4.99/month
   - **Pro**: $9.99/month

### 6.2 Via API (Optional)
Use the `stripePaymentService.createSubscriptionTier()` method:
```javascript
await stripePaymentService.createSubscriptionTier(channelId, {
  tier: 'premium',
  name: 'Premium',
  description: 'Access to exclusive content',
  price: 4.99,
  currency: 'USD',
  billingInterval: 'month',
  features: [
    'Ad-free experience',
    'Early access to content',
    'Exclusive community access'
  ]
});
```

## Step 7: Testing

### 7.1 Test Mode Cards
Use these test cards in Stripe test mode:

**Successful payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Payment requires authentication:**
- Card: `4000 0025 0000 3155`

**Payment declined:**
- Card: `4000 0000 0000 0002`

### 7.2 Test Subscription Flow
1. Navigate to Channel Discovery
2. Select a channel
3. Click "Upgrade" button
4. Choose a subscription tier
5. Complete payment with test card
6. Verify subscription appears in user's subscriptions

### 7.3 Test Webhook Events
1. Go to Stripe Dashboard > Developers > Webhooks
2. Click on your webhook endpoint
3. Click "Send test webhook"
4. Select event type
5. Verify event is processed in `stripe_webhook_events` table

## Step 8: Revenue Split Configuration

### 8.1 Platform Fee
Default: 20% platform fee, 80% to creator

To modify:
1. Edit `calculate_platform_fee()` function in migration
2. Edit `calculate_creator_earnings()` function in migration

### 8.2 Ad Revenue Tracking
Ad revenue is automatically tracked when ads are displayed:
```javascript
await stripePaymentService.trackAdRevenue(
  channelId,
  adId,
  impressions,
  clicks,
  revenueAmount
);
```

## Step 9: Creator Payouts

### 9.1 Stripe Connect Onboarding
1. Creator navigates to Monetization Dashboard
2. Clicks "Setup Payouts"
3. Completes Stripe Connect onboarding
4. Stripe verifies identity and bank account

### 9.2 Request Payout
1. Minimum payout: $50
2. Creator clicks "Request Payout"
3. Payout is processed via Stripe Connect
4. Funds transferred to creator's bank account

## Step 10: Production Deployment

### 10.1 Switch to Live Mode
1. Get live API keys from Stripe Dashboard
2. Update environment variables with live keys:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
   ```
3. Update Supabase secrets with live keys
4. Update webhook endpoint to production URL

### 10.2 Compliance
- Ensure terms of service include payment terms
- Add privacy policy covering payment data
- Display refund policy clearly
- Comply with local regulations (PCI DSS handled by Stripe)

## Features Implemented

### ✅ Channel Subscriptions
- Multiple subscription tiers (Free, Premium, Pro)
- Recurring billing (monthly/yearly)
- Automatic subscription management
- Subscription status tracking

### ✅ Payment Processing
- Secure Stripe Checkout
- Payment method tokenization
- Automatic payment retries
- Failed payment handling

### ✅ Revenue Splits
- 80/20 creator/platform split
- Automatic revenue calculation
- Subscription revenue tracking
- Ad revenue distribution

### ✅ Creator Payouts
- Stripe Connect integration
- Minimum payout threshold ($50)
- Automatic payout processing
- Payout history tracking

### ✅ Monetization Dashboard
- Revenue analytics
- Subscription metrics
- Payout management
- Revenue breakdown

## Troubleshooting

### Issue: Webhook not receiving events
**Solution:**
1. Verify webhook URL is correct
2. Check webhook signing secret
3. Ensure Edge Function is deployed
4. Check Supabase logs for errors

### Issue: Payment fails
**Solution:**
1. Check Stripe API keys are correct
2. Verify customer has valid payment method
3. Check Stripe Dashboard for error details
4. Review browser console for errors

### Issue: Subscription not created
**Solution:**
1. Verify subscription tier exists
2. Check user has Stripe customer record
3. Review Edge Function logs
4. Ensure RLS policies allow insert

### Issue: Payout fails
**Solution:**
1. Verify creator completed Stripe Connect onboarding
2. Check minimum payout amount ($50)
3. Ensure sufficient balance
4. Review Stripe Connect account status

## Support

For issues:
1. Check Supabase logs: Dashboard > Logs
2. Check Stripe Dashboard: Developers > Logs
3. Review browser console errors
4. Check database RLS policies

## Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Use environment variables** for all sensitive data
3. **Validate webhook signatures** (handled automatically)
4. **Use HTTPS** for all production endpoints
5. **Implement rate limiting** on payment endpoints
6. **Log all payment events** for audit trail
7. **Regular security audits** of payment flow

## Next Steps

1. Test complete payment flow in test mode
2. Create subscription tiers for channels
3. Enable Stripe Connect for creators
4. Configure ad revenue tracking
5. Test payout process
6. Switch to live mode for production
7. Monitor payment analytics

---

**Note**: This integration follows Stripe best practices and PCI compliance standards. All payment data is handled securely by Stripe.