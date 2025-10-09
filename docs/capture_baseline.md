# Baseline Viewport Snapshots - Phase 2 (Older Devices)

## Older Device Matrix for Phase 2
- iPhone SE (2/3): 375×667
- iPhone 8: 375×667  
- iPhone 8 Plus: 414×736
- iPhone 11/XR: 414×896
- Galaxy S10: 360×760
- Galaxy S9: 360×740
- Galaxy A13/A14: 360×800
- Pixel 4a/5: 393×851
- iPad 10.2″: 810×1080
- Surface Duo (outer): 540×720

## Baseline Capture Plan

### Target Pages for Baseline:
1. **Home (/)** - Full content page with hero, features, pricing
2. **Realty (/realty)** - Full content page with comprehensive layout
3. **Virtual Staging (/virtual-staging)** - Minimal content (placeholder)
4. **Pricing (/pricing)** - Minimal content (placeholder)

### Capture Strategy:
1. Use browser developer tools to set exact viewport dimensions
2. Capture screenshots at each viewport size for each page
3. Document any immediate visual issues (overflow, text clipping, etc.)
4. Save screenshots with naming convention: `{page}_{device}_{viewport}.png`
5. Note any critical issues that need immediate attention

### Key Areas to Monitor:
- **Header Navigation**: Does it collapse properly on narrow screens?
- **Hero Text**: Is text readable and properly sized?
- **CTA Buttons**: Are they accessible (44px minimum) and properly positioned?
- **Feature Cards**: Do they stack vertically on mobile?
- **Images**: Are they responsive and not distorted?
- **Horizontal Scroll**: Any content causing horizontal overflow?

## Findings Template:

### iPhone SE (375×667)
- **Page**: /
- **Status**: Pending baseline capture
- **Critical Issues**: TBD
- **Minor Issues**: TBD
- **Screenshot**: TBD

### iPhone 8 (375×667)
- **Page**: /
- **Status**: Pending baseline capture  
- **Critical Issues**: TBD
- **Minor Issues**: TBD
- **Screenshot**: TBD

[Continue for all devices and pages...]

## Next Steps After Baseline:
1. Analyze baseline screenshots for patterns
2. Prioritize critical responsive issues
3. Implement fixes using Tailwind CSS classes
4. Re-test on modern devices to ensure no regressions
5. Create comprehensive responsive report
