/**
 * ContentFlow AI - Centralized Demo Data
 * Contains 8 realistic source documents, 15 generated posts across platforms,
 * evidence records, brand profiles, and activity logs.
 */

const DEMO_SOURCES = [
  {
    id: "src-101",
    title: "Zero Trust Architecture: 2026 Enterprise Security Implementation Guide",
    type: "Blog Post",
    url: "https://cyberdefense-weekly.com/articles/zero-trust-2026-guide",
    createdAt: "2026-09-12T10:30:00Z",
    wordCount: 1420,
    excerpt: "Modern enterprises are ditching perimeter-based defenses for continuous identity verification and micro-segmentation. In our benchmark study of 120 enterprises, organizations implementing Zero Trust reduced lateral attack movement by 74% and lowered incident containment time from 21 days to under 4 hours.",
    content: `Zero Trust Architecture: 2026 Enterprise Security Implementation Guide.
Perimeter-based defense is no longer viable in multi-cloud and remote work setups. Zero Trust enforces 'never trust, always verify' across every access request.
In our benchmark study of 120 enterprises, organizations implementing Zero Trust reduced lateral attack movement by 74% and lowered incident containment time from 21 days to under 4 hours.
Key pillars include continuous identity authentication, contextual device compliance, micro-segmentation, and least-privilege access policies.
Furthermore, automated posture checks decreased phishing-driven privilege escalation by 62% across all departments.
However, implementation requires cross-functional alignment. 81% of CISOs report that employee cultural resistance was their biggest initial obstacle rather than tooling costs.`
  },
  {
    id: "src-102",
    title: "Modern Jamstack & Edge Rendering: The 2026 Web Performance Benchmark",
    type: "Guide",
    url: "https://webdev-insights.io/guides/edge-rendering-benchmark",
    createdAt: "2026-09-18T14:15:00Z",
    wordCount: 1850,
    excerpt: "Server-side rendering at the edge combined with selective hydration delivers sub-100ms Largest Contentful Paint (LCP) globally. Sites migrating from traditional monolithic Node SSR saw an average 38% bump in mobile conversion rates.",
    content: `Modern Jamstack & Edge Rendering: The 2026 Web Performance Benchmark.
User attention spans are shorter than ever, making Core Web Vitals directly correlated with revenue.
Server-side rendering at the edge combined with selective hydration delivers sub-100ms Largest Contentful Paint (LCP) globally. Sites migrating from traditional monolithic Node SSR saw an average 38% bump in mobile conversion rates.
Edge-computed personalization reduced origin server egress bandwidth expenses by 54% while maintaining dynamic cached content fresh within 2 seconds.
The report highlights that bundling budgets should not exceed 80KB critical JS for initial page load. Developers who adopt lightweight component islands avoid severe hydration locks on mid-tier mobile hardware.`
  },
  {
    id: "src-103",
    title: "SaaS Organic Growth: How FinTrack Scaled Inbound Traffic 320% in 9 Months",
    type: "Case Study",
    url: "https://growthcase.org/fintrack-inbound-scale",
    createdAt: "2026-09-24T09:00:00Z",
    wordCount: 1640,
    excerpt: "By repurposing top-performing founder insights into thematic programmatic hubs and multi-channel micro-content, B2B fintech FinTrack scaled monthly inbound organic demos from 45 to 190 while decreasing blended customer acquisition cost (CAC) by 41%.",
    content: `SaaS Organic Growth: How FinTrack Scaled Inbound Traffic 320% in 9 Months.
FinTrack struggled with high paid search CAC exceeding $820 per qualified demo. The growth team shifted budget into content repurposing and semantic SEO clusters.
By repurposing top-performing founder insights into thematic programmatic hubs and multi-channel micro-content, B2B fintech FinTrack scaled monthly inbound organic demos from 45 to 190 while decreasing blended customer acquisition cost (CAC) by 41%.
Repurposing a single 2,000-word engineering post generated 12 LinkedIn carousels, 4 YouTube Shorts breakdowns, and 6 email newsletter editions.
Overall domain rating climbed from DR 31 to DR 67, and direct branded search volume rose 240% over the campaign duration.`
  },
  {
    id: "src-104",
    title: "Omnichannel Local Marketing Playbook for Main Street Retailers",
    type: "Article",
    url: "https://smallbizgrowth.net/omnichannel-local-retail",
    createdAt: "2026-10-02T11:45:00Z",
    wordCount: 1210,
    excerpt: "Local brick-and-mortar stores blending geo-targeted short video clips with Google Maps inventory sync experienced a 47% increase in weekend foot traffic and a 2.3x return on local advertising spend.",
    content: `Omnichannel Local Marketing Playbook for Main Street Retailers.
Small retailers frequently overcomplicate social marketing. High-production studio setups are unnecessary; authenticity wins local audiences.
Local brick-and-mortar stores blending geo-targeted short video clips with Google Maps inventory sync experienced a 47% increase in weekend foot traffic and a 2.3x return on local advertising spend.
Highlighting behind-the-scenes restocking videos on Instagram Reels and Facebook Stories created community affinity that big-box retailers cannot replicate.
Local shoppers who interacted with at least 3 social touchpoints showed an 80% higher repeat purchase rate within 60 days.`
  },
  {
    id: "src-105",
    title: "PulseFlow AI Studio v4.0: Autonomous Audio Engine Launch Announcement",
    type: "Product Launch",
    url: "https://pulseflow.audio/press/v4-launch",
    createdAt: "2026-10-08T16:20:00Z",
    wordCount: 980,
    excerpt: "PulseFlow 4.0 introduces neural mastering presets, 0.4ms latency stem isolation, and zero-loss lossless audio collaboration directly inside browser tabs. Over 15,000 beta audio producers recorded a 65% faster mix turnaround.",
    content: `PulseFlow AI Studio v4.0: Autonomous Audio Engine Launch Announcement.
We are thrilled to officially unveil PulseFlow 4.0, engineered for modern music creators, podcasters, and post-production studios.
PulseFlow 4.0 introduces neural mastering presets, 0.4ms latency stem isolation, and zero-loss lossless audio collaboration directly inside browser tabs. Over 15,000 beta audio producers recorded a 65% faster mix turnaround.
Featuring WebGPU-accelerated sound synthesis, projects export in pristine 32-bit floating point audio without demanding heavy desktop digital audio workstations.
Introductory pricing offers lifetime studio perks for early adopters through the end of the quarter.`
  },
  {
    id: "src-106",
    title: "Navigating Global Corporate Tax & Cross-Border Remote Compliance in 2026",
    type: "Service Guide",
    url: "https://apexadvisory.tax/reports/cross-border-tax-2026",
    createdAt: "2026-10-12T08:10:00Z",
    wordCount: 2100,
    excerpt: "Permanent establishment risks and withholding thresholds have tightened across 42 tax jurisdictions. Companies failing to track remote employee residency days risk audits resulting in penalties up to 28% on unremitted payroll taxes.",
    content: `Navigating Global Corporate Tax & Cross-Border Remote Compliance in 2026.
Distributed workforces introduce severe legal nexus complexities that traditional tax advisors often overlook until notice letters arrive.
Permanent establishment risks and withholding thresholds have tightened across 42 tax jurisdictions. Companies failing to track remote employee residency days risk audits resulting in penalties up to 28% on unremitted payroll taxes.
Standardizing payroll operations through compliant Employer of Record (EOR) entities or tax-treaty compliant local branches reduces audit exposure by 90%.
Proactive quarterly tax provisioning allows international enterprises to legally reclaim up to 14% of foreign vat and sales levy credits.`
  },
  {
    id: "src-107",
    title: "Self-Serve User Onboarding: Reducing Day-7 B2B SaaS Churn from 68% to 29%",
    type: "Guide",
    url: "https://productmetrics.co/articles/saas-onboarding-churn",
    createdAt: "2026-10-15T13:40:00Z",
    wordCount: 1530,
    excerpt: "Interactive in-app milestone checklists and contextual micro-surveys accelerated time-to-first-value (TTFV) from 48 hours to 11 minutes, slashing early churn from 68% down to 29% for freemium users.",
    content: `Self-Serve User Onboarding: Reducing Day-7 B2B SaaS Churn from 68% to 29%.
The greatest leak in any product-led SaaS funnel occurs during the first 15 minutes of user signup.
Interactive in-app milestone checklists and contextual micro-surveys accelerated time-to-first-value (TTFV) from 48 hours to 11 minutes, slashing early churn from 68% down to 29% for freemium users.
Removing mandatory credit card entry during registration doubled signups while maintaining a 14% net upgrade rate to paid tiers when users hit product usage thresholds.
Gamified onboarding badges increased team member invites by 88% within the critical first 72 hours.`
  },
  {
    id: "src-108",
    title: "Headless E-Commerce Optimization: Peak Holiday Checkout Conversion Strategies",
    type: "Article",
    url: "https://retailarchitects.com/ecommerce-holiday-readiness",
    createdAt: "2026-10-19T17:00:00Z",
    wordCount: 1390,
    excerpt: "One-click express checkout wallets, dynamic geo-pricing, and instantaneous cart recalculations lifted average order value (AOV) by 22% during peak sales volume spikes.",
    content: `Headless E-Commerce Optimization: Peak Holiday Checkout Conversion Strategies.
Holiday traffic spikes test every layer of an e-commerce infrastructure, with slow checkout forms being the primary cause of abandoned purchases.
One-click express checkout wallets, dynamic geo-pricing, and instantaneous cart recalculations lifted average order value (AOV) by 22% during peak sales volume spikes.
Decoupling the frontend storefront from inventory databases prevented checkout crashes during sudden flash sale surges of over 50,000 concurrent users.
Automated out-of-stock SMS alerts retained 34% of high-intent shoppers who returned when inventory restocked.`
  }
];

const DEMO_POSTS = [
  {
    id: "post-201",
    sourceId: "src-101",
    sourceTitle: "Zero Trust Architecture: 2026 Enterprise Security Implementation Guide",
    platform: "LinkedIn",
    title: "The Death of the Corporate Security Perimeter",
    content: `Is your company still relying on firewall perimeters in 2026? 🛑\n\nOur recent benchmark study across 120 enterprises uncovered eye-opening numbers:\n\nOrganizations operating true Zero Trust reduced lateral attack movement by 74% and slashed containment times from 21 days down to under 4 hours.\n\nYet 81% of CISOs say technology wasn't their hardest challenge—cultural resistance was.\n\nSecurity isn't a perimeter tool. It's a continuous identity discipline.\n\nWhat is your organization's biggest hurdle in adopting zero trust? Drop your thoughts below. 👇`,
    cta: "Download the complete Zero Trust Implementation Guide in the comments.",
    hashtags: "#CyberSecurity #ZeroTrust #InfoSec #CISO #EnterpriseTech",
    status: "Approved",
    createdAt: "2026-09-13T11:20:00Z",
    updatedAt: "2026-09-13T14:00:00Z",
    versions: [
      {
        version: 1,
        content: "Initial draft generated for LinkedIn discussing enterprise security.",
        updatedAt: "2026-09-13T11:20:00Z"
      }
    ],
    claims: [
      {
        id: "cl-1",
        claim: "Zero Trust implementation reduced lateral attack movement by 74%",
        excerpt: "organizations implementing Zero Trust reduced lateral attack movement by 74%",
        status: "Supported",
        passageId: "P-101-2",
        notes: "Matches exact study statistic from Section 2."
      },
      {
        id: "cl-2",
        claim: "Containment time dropped from 21 days to under 4 hours",
        excerpt: "lowered incident containment time from 21 days to under 4 hours.",
        status: "Supported",
        passageId: "P-101-2",
        notes: "Direct factual match."
      },
      {
        id: "cl-3",
        claim: "81% of CISOs report employee cultural resistance as primary obstacle",
        excerpt: "81% of CISOs report that employee cultural resistance was their biggest initial obstacle",
        status: "Supported",
        passageId: "P-101-5",
        notes: "Verified against survey findings."
      }
    ]
  },
  {
    id: "post-202",
    sourceId: "src-101",
    sourceTitle: "Zero Trust Architecture: 2026 Enterprise Security Implementation Guide",
    platform: "Instagram",
    title: "Swipe to See How 120 Enterprises Stopped Lateral Breaches",
    content: `Swipe for the 4 pillars of modern cybersecurity in 2026 🔒✨\n\nSlide 1: Why perimeters are failing.\nSlide 2: 74% reduction in lateral threat spread.\nSlide 3: Containment time cut from 21 days to under 4 hours!\nSlide 4: Microsegmentation made simple.\n\nProtect your users without destroying their workflow speed. Save this carousel for your next security audit! 📌`,
    cta: "Tap the link in bio to read our complete CISO security roadmap.",
    hashtags: "#CyberSec #TechTips #DevSecOps #CloudSecurity #TechGram",
    status: "Approved",
    createdAt: "2026-09-14T09:15:00Z",
    updatedAt: "2026-09-14T09:15:00Z",
    versions: [],
    claims: [
      {
        id: "cl-4",
        claim: "Containment time cut from 21 days to under 4 hours",
        excerpt: "lowered incident containment time from 21 days to under 4 hours.",
        status: "Supported",
        passageId: "P-101-2",
        notes: "Accurate extraction."
      }
    ]
  },
  {
    id: "post-203",
    sourceId: "src-101",
    sourceTitle: "Zero Trust Architecture: 2026 Enterprise Security Implementation Guide",
    platform: "YouTube Shorts",
    title: "Why Hackers Love Old Firewalls (And How to Fix It)",
    content: `[0:00 - Hook]: "If you still think a VPN keeps your company safe, I have bad news for you."\n[0:08 - Stat Callout]: "120 enterprises tested Zero Trust. Lateral movement dropped by 74%."\n[0:22 - The Secret]: "Instead of guarding the door, verify every single request automatically."\n[0:45 - Takeaway]: "Incident containment went from 3 weeks down to under 4 hours."`,
    cta: "Subscribe for daily enterprise cybersecurity breakdowns!",
    hashtags: "#Shorts #TechTok #CyberSecurity #Hacking #Programming",
    status: "Needs Review",
    createdAt: "2026-09-15T15:30:00Z",
    updatedAt: "2026-09-15T15:30:00Z",
    versions: [],
    claims: [
      {
        id: "cl-5",
        claim: "Lateral movement dropped by 74%",
        excerpt: "reduced lateral attack movement by 74%",
        status: "Supported",
        passageId: "P-101-2",
        notes: "Factual."
      },
      {
        id: "cl-6",
        claim: "VPN alone cannot secure multi-cloud access",
        excerpt: "Perimeter-based defense is no longer viable in multi-cloud and remote work setups.",
        status: "Supported",
        passageId: "P-101-1",
        notes: "Paraphrased accurately."
      }
    ]
  },
  {
    id: "post-204",
    sourceId: "src-102",
    sourceTitle: "Modern Jamstack & Edge Rendering: The 2026 Web Performance Benchmark",
    platform: "LinkedIn",
    title: "Sub-100ms LCP is No Longer an Edge Case—It's Revenue",
    content: `Web performance is not just a developer obsession; it's an executive metric. ⚡\n\nOur latest performance benchmark found that migrating to edge rendering and selective hydration unlocked sub-100ms Largest Contentful Paint globally.\n\nThe real business outcome? A 38% increase in mobile conversion rates.\n\nPlus, edge computing reduced origin egress costs by 54%.\n\nKeep your critical JS bundle under 80KB or watch customers bounce before your interactive code even runs.`,
    cta: "Full benchmark breakdown and architectural diagrams linked in the first comment.",
    hashtags: "#WebDevelopment #SoftwareEngineering #Jamstack #Frontend #Performance",
    status: "Approved",
    createdAt: "2026-09-19T10:00:00Z",
    updatedAt: "2026-09-19T10:00:00Z",
    versions: [],
    claims: [
      {
        id: "cl-7",
        claim: "Migrating to edge rendering resulted in 38% mobile conversion lift",
        excerpt: "Sites migrating from traditional monolithic Node SSR saw an average 38% bump in mobile conversion rates.",
        status: "Supported",
        passageId: "P-102-2",
        notes: "Exact number and context confirmed."
      },
      {
        id: "cl-8",
        claim: "Origin egress costs reduced by 54%",
        excerpt: "reduced origin server egress bandwidth expenses by 54%",
        status: "Supported",
        passageId: "P-102-3",
        notes: "Data verified."
      }
    ]
  },
  {
    id: "post-205",
    sourceId: "src-102",
    sourceTitle: "Modern Jamstack & Edge Rendering: The 2026 Web Performance Benchmark",
    platform: "Facebook",
    title: "Is Your Business Website Fast Enough for Today's Customers?",
    content: `Slow websites quietly drain customer sales every single day. 📉\n\nA recent engineering study revealed that when websites loaded in under 100 milliseconds, mobile conversions jumped by 38%!\n\nModern 'Edge Rendering' delivers pages instantly from servers close to your customers, no matter where they live.\n\nIs your site running at top speed this quarter?`,
    cta: "Check your site's edge speed readiness with our free benchmark checklist.",
    hashtags: "#WebDesign #SmallBizTech #OnlineBusiness #EcommerceTips",
    status: "Draft",
    createdAt: "2026-09-20T12:00:00Z",
    updatedAt: "2026-09-20T12:00:00Z",
    versions: [],
    claims: [
      {
        id: "cl-9",
        claim: "Mobile conversions jumped by 38%",
        excerpt: "saw an average 38% bump in mobile conversion rates.",
        status: "Supported",
        passageId: "P-102-2",
        notes: "Supported by source."
      }
    ]
  },
  {
    id: "post-206",
    sourceId: "src-103",
    sourceTitle: "SaaS Organic Growth: How FinTrack Scaled Inbound Traffic 320% in 9 Months",
    platform: "LinkedIn",
    title: "How FinTrack Cut Customer Acquisition Cost by 41% with Repurposing",
    content: `Spending $800+ on Google ads for a single demo isn't sustainable. 💸\n\nFinTrack proved there's a smarter route:\n\n1. Take 1 comprehensive engineering deep dive (2,000 words).\n2. Transform it into 12 LinkedIn carousels, 4 YouTube Shorts, and 6 newsletters.\n3. Build programmatic topic clusters.\n\nThe 9-month result:\n📈 Inbound monthly demos up from 45 to 190 (320% scale).\n📉 Blended CAC decreased by 41%.\n🌐 Domain rating jumped from 31 to 67.\n\nStop creating more content. Start repurposing what already resonates.`,
    cta: "Read the complete FinTrack playbook at the link below.",
    hashtags: "#B2BMarketing #SaaSGrowth #ContentStrategy #InboundMarketing #Fintech",
    status: "Approved",
    createdAt: "2026-09-25T14:30:00Z",
    updatedAt: "2026-09-25T14:30:00Z",
    versions: [],
    claims: [
      {
        id: "cl-10",
        claim: "FinTrack scaled monthly inbound organic demos from 45 to 190",
        excerpt: "scaled monthly inbound organic demos from 45 to 190 while decreasing blended customer acquisition cost (CAC) by 41%",
        status: "Supported",
        passageId: "P-103-2",
        notes: "Direct match."
      },
      {
        id: "cl-11",
        claim: "Blended CAC dropped by 41%",
        excerpt: "decreasing blended customer acquisition cost (CAC) by 41%",
        status: "Supported",
        passageId: "P-103-2",
        notes: "Direct match."
      }
    ]
  },
  {
    id: "post-207",
    sourceId: "src-103",
    sourceTitle: "SaaS Organic Growth: How FinTrack Scaled Inbound Traffic 320% in 9 Months",
    platform: "Instagram Reels",
    title: "Stop Spending $800 Per Lead! Do This Instead 🔥",
    content: `[Visual: Founder looking stressed at ad dashboards]\nAudio: Upbeat trending sound\nOverlay Text:\n"We were spending $820 per demo..."\n"So we took ONE blog post and turned it into:"\n👉 12 Carousels\n👉 4 Shorts\n👉 6 Newsletters\n"9 months later: 45 demos -> 190 demos/month!"\n"CAC dropped 41%."\nRepurpose your genius, don't burn cash on paid ads!`,
    cta: "Comment 'REPURPOSE' and we'll DM you our workflow template!",
    hashtags: "#MarketingHacks #SaaSFounder #StartupLife #GrowthMindset #ReelsViral",
    status: "Needs Review",
    createdAt: "2026-09-26T16:00:00Z",
    updatedAt: "2026-09-26T16:00:00Z",
    versions: [],
    claims: [
      {
        id: "cl-12",
        claim: "Original CAC was $820 per qualified demo",
        excerpt: "FinTrack struggled with high paid search CAC exceeding $820 per qualified demo.",
        status: "Supported",
        passageId: "P-103-1",
        notes: "Verified against case study baseline."
      }
    ]
  },
  {
    id: "post-208",
    sourceId: "src-104",
    sourceTitle: "Omnichannel Local Marketing Playbook for Main Street Retailers",
    platform: "Facebook",
    title: "How Local Main Street Stores Are Winning Against Big Box Giants",
    content: `Big-box retail chains have massive budgets, but they can't match your local story! 🏬❤️\n\nMain Street retailers who combined quick behind-the-scenes Instagram Reels with Google Maps inventory sync saw:\n✅ 47% increase in weekend foot traffic\n✅ 2.3x return on local ad spend\n✅ 80% higher repeat purchase rate among social-engaged customers\n\nAuthenticity beats million-dollar ad campaigns every time.`,
    cta: "Share this with a fellow local business owner who needs more foot traffic!",
    hashtags: "#ShopLocal #SmallBusinessOwner #MainStreet #RetailMarketing #SupportLocal",
    status: "Approved",
    createdAt: "2026-10-03T10:15:00Z",
    updatedAt: "2026-10-03T10:15:00Z",
    versions: [],
    claims: [
      {
        id: "cl-13",
        claim: "Weekend foot traffic increased 47%",
        excerpt: "experienced a 47% increase in weekend foot traffic and a 2.3x return on local advertising spend.",
        status: "Supported",
        passageId: "P-104-2",
        notes: "Direct match."
      },
      {
        id: "cl-14",
        claim: "Social engaged shoppers had 80% higher repeat purchase rate",
        excerpt: "showed an 80% higher repeat purchase rate within 60 days.",
        status: "Supported",
        passageId: "P-104-4",
        notes: "Data supported."
      }
    ]
  },
  {
    id: "post-209",
    sourceId: "src-104",
    sourceTitle: "Omnichannel Local Marketing Playbook for Main Street Retailers",
    platform: "Instagram",
    title: "The Simple 3-Step Social Routine for Local Retail Stores",
    content: `Stop worrying about fancy cameras! 📱\n\nLocal customers don't want glossy TV commercials. They want to see what arrived in your store today.\n\n3 daily clips you can film in 5 minutes:\n1. Unboxing newly arrived merchandise\n2. Styling a shelf or display window\n3. Answering one frequent customer question\n\nRetailers using this routine recorded a 47% boost in weekend shoppers!`,
    cta: "Tap the link in our bio for the free Main Street Social Cheat Sheet.",
    hashtags: "#RetailTherapy #BoutiqueShopping #SmallBizMarketing #ShopLocalLove",
    status: "Draft",
    createdAt: "2026-10-04T13:00:00Z",
    updatedAt: "2026-10-04T13:00:00Z",
    versions: [],
    claims: [
      {
        id: "cl-15",
        claim: "Retailers using video routine recorded 47% weekend boost",
        excerpt: "experienced a 47% increase in weekend foot traffic",
        status: "Supported",
        passageId: "P-104-2",
        notes: "Supported."
      }
    ]
  },
  {
    id: "post-210",
    sourceId: "src-105",
    sourceTitle: "PulseFlow AI Studio v4.0: Autonomous Audio Engine Launch Announcement",
    platform: "YouTube Shorts",
    title: "Mixing a Whole Song in a Browser Tab?! 🤯 PulseFlow 4.0",
    content: `[0:00]: "Did we just eliminate the need for heavy audio software?"\n[0:10]: "PulseFlow 4.0 runs with 0.4ms latency stem separation directly in Google Chrome."\n[0:25]: "Over 15,000 producers beta-tested this—cutting mix turnaround by 65%."\n[0:45]: "Export in pristine 32-bit floating point audio anywhere you go."`,
    cta: "Try the browser demo free—link in channel description!",
    hashtags: "#MusicProducer #Beatmaker #AudioEngineering #Shorts #TechInnovation",
    status: "Approved",
    createdAt: "2026-10-09T18:00:00Z",
    updatedAt: "2026-10-09T18:00:00Z",
    versions: [],
    claims: [
      {
        id: "cl-16",
        claim: "PulseFlow features 0.4ms latency stem isolation",
        excerpt: "0.4ms latency stem isolation, and zero-loss lossless audio collaboration directly inside browser tabs.",
        status: "Supported",
        passageId: "P-105-2",
        notes: "Product specs verified."
      },
      {
        id: "cl-17",
        claim: "15,000 beta producers reported 65% faster mix turnaround",
        excerpt: "Over 15,000 beta audio producers recorded a 65% faster mix turnaround.",
        status: "Supported",
        passageId: "P-105-2",
        notes: "Statistic verified."
      }
    ]
  },
  {
    id: "post-211",
    sourceId: "src-106",
    sourceTitle: "Navigating Global Corporate Tax & Cross-Border Remote Compliance in 2026",
    platform: "LinkedIn",
    title: "The Hidden Tax Trap in Your Remote Hiring Policy",
    content: `Hiring remote talent abroad without tracking residency days? You might be triggering unexpected corporate permanent establishment liabilities. ⚖️\n\n42 tax jurisdictions tightened enforcement this year. Penalties for unremitted payroll taxes can reach up to 28% plus interest.\n\nKey takeaways for global CFOs:\n- Moving to compliant EOR or local branch entities reduces audit exposure by 90%.\n- Proactive quarterly provisioning can reclaim up to 14% of foreign sales levies.\n\nProtect your balance sheet before local tax authorities initiate audits.`,
    cta: "Download the 2026 Global Remote Tax Compliance Matrix at the link below.",
    hashtags: "#CorporateTax #RemoteWork #CFO #TaxCompliance #GlobalBusiness #Finance",
    status: "Needs Review",
    createdAt: "2026-10-13T11:00:00Z",
    updatedAt: "2026-10-13T11:00:00Z",
    versions: [],
    claims: [
      {
        id: "cl-18",
        claim: "Penalties for unremitted payroll can reach up to 28%",
        excerpt: "penalties up to 28% on unremitted payroll taxes.",
        status: "Supported",
        passageId: "P-106-2",
        notes: "Direct match."
      },
      {
        id: "cl-19",
        claim: "EOR entities reduce audit exposure by 90%",
        excerpt: "reduces audit exposure by 90%.",
        status: "Supported",
        passageId: "P-106-3",
        notes: "Supported by legal guide."
      }
    ]
  },
  {
    id: "post-212",
    sourceId: "src-107",
    sourceTitle: "Self-Serve User Onboarding: Reducing Day-7 B2B SaaS Churn from 68% to 29%",
    platform: "LinkedIn",
    title: "Why Your B2B SaaS Is Losing 68% of Signups in Week 1",
    content: `If your product-led growth feels like pouring water into a leaky bucket, look at your time-to-first-value (TTFV). 🪣\n\nMost software products leave users staring at blank setup screens.\n\nWhen we introduced interactive milestone checklists and eliminated the mandatory credit card gate:\n⏱️ TTFV plummeted from 48 hours to 11 minutes.\n📉 Day-7 churn dropped from 68% down to 29%.\n👥 Team invites surged 88% in the first 72 hours.\n\nOnboarding is not a tour; it's a sprint to the user's 'Aha!' moment.`,
    cta: "Check out our teardown of 10 high-converting SaaS onboarding flows.",
    hashtags: "#ProductLedGrowth #ProductManagement #SaaS #UXDesign #CustomerSuccess",
    status: "Approved",
    createdAt: "2026-10-16T15:20:00Z",
    updatedAt: "2026-10-16T15:20:00Z",
    versions: [],
    claims: [
      {
        id: "cl-20",
        claim: "Time-to-first-value accelerated from 48 hours to 11 minutes",
        excerpt: "accelerated time-to-first-value (TTFV) from 48 hours to 11 minutes, slashing early churn from 68% down to 29%",
        status: "Supported",
        passageId: "P-107-2",
        notes: "Verified against product benchmark."
      },
      {
        id: "cl-21",
        claim: "Team member invites increased by 88% within 72 hours",
        excerpt: "Gamified onboarding badges increased team member invites by 88% within the critical first 72 hours.",
        status: "Supported",
        passageId: "P-107-4",
        notes: "Verified."
      }
    ]
  },
  {
    id: "post-213",
    sourceId: "src-107",
    sourceTitle: "Self-Serve User Onboarding: Reducing Day-7 B2B SaaS Churn from 68% to 29%",
    platform: "Instagram Reels",
    title: "The 11-Minute Rule That Saved Our SaaS App 🚀",
    content: `[Visual: Screen recording showing quick onboarding progress bar]\nAudio: Trending energetic beat\nVoiceover:\n"If your user doesn't get a win in 11 minutes, they're gone forever."\n"Here is how we crushed our 68% churn down to 29%:"\n1. Kill the credit card wall upfront.\n2. Add a 3-step interactive checklist.\n3. Celebrate their first completed task!\nDrop a comment if your onboarding needs this overhaul!`,
    cta: "Link in bio to get our free Figma UX onboarding wireframes.",
    hashtags: "#TechStartup #UXDesign #AppDesign #ProductDesign #UIUX",
    status: "Needs Review",
    createdAt: "2026-10-17T09:40:00Z",
    updatedAt: "2026-10-17T09:40:00Z",
    versions: [],
    claims: [
      {
        id: "cl-22",
        claim: "Slashing early churn from 68% down to 29%",
        excerpt: "slashing early churn from 68% down to 29% for freemium users.",
        status: "Supported",
        passageId: "P-107-2",
        notes: "Accurate."
      }
    ]
  },
  {
    id: "post-214",
    sourceId: "src-108",
    sourceTitle: "Headless E-Commerce Optimization: Peak Holiday Checkout Conversion Strategies",
    platform: "LinkedIn",
    title: "Flash Sales Shouldn't Crash Your Store: 3 Peak Traffic Lessons",
    content: `Black Friday and Cyber Monday shouldn't be an anxiety test for engineering and marketing leaders. 🛒\n\nHigh-volume retailers that decoupled frontend storefronts from core inventory engines saw dramatic payoffs:\n\n✨ Seamless operations during 50,000+ concurrent user surges.\n💳 22% higher average order value via one-click express checkout.\n📱 34% of high-intent shoppers recovered via instantaneous restock SMS.\n\nSpeed equals sales. Latency is just another cart abandonment mechanism.`,
    cta: "Read our full Headless E-Commerce Architecture whitepaper in the link below.",
    hashtags: "#Ecommerce #HeadlessCommerce #RetailTech #WebPerformance #BlackFriday",
    status: "Approved",
    createdAt: "2026-10-20T14:10:00Z",
    updatedAt: "2026-10-20T14:10:00Z",
    versions: [],
    claims: [
      {
        id: "cl-23",
        claim: "Average order value increased by 22% with express checkout",
        excerpt: "lifted average order value (AOV) by 22% during peak sales volume spikes.",
        status: "Supported",
        passageId: "P-108-2",
        notes: "Direct match."
      },
      {
        id: "cl-24",
        claim: "Restock SMS alerts retained 34% of high-intent shoppers",
        excerpt: "Automated out-of-stock SMS alerts retained 34% of high-intent shoppers",
        status: "Supported",
        passageId: "P-108-4",
        notes: "Direct match."
      }
    ]
  },
  {
    id: "post-215",
    sourceId: "src-108",
    sourceTitle: "Headless E-Commerce Optimization: Peak Holiday Checkout Conversion Strategies",
    platform: "Facebook",
    title: "Don't Let A Clunky Checkout Ruin Your Holiday Sales!",
    content: `Did you know that slow checkout forms cause over 60% of online shoppers to give up and leave? 🛍️\n\nAdding express wallet checkouts (like Apple Pay and Google Pay) and fast loading times can boost your average order values by 22%!\n\nGet your online storefront ready before the holiday rush hits.`,
    cta: "Click below to see our holiday checkout optimization checklist.",
    hashtags: "#OnlineStore #EcommerceMarketing #ShopOnline #HolidayShopping",
    status: "Rejected",
    createdAt: "2026-10-21T11:00:00Z",
    updatedAt: "2026-10-21T16:30:00Z",
    versions: [],
    claims: [
      {
        id: "cl-25",
        claim: "Slow checkout forms cause over 60% of online shoppers to leave",
        excerpt: "slow checkout forms being the primary cause of abandoned purchases.",
        status: "Uncertain",
        passageId: "P-108-1",
        notes: "Source mentions slow checkout as primary cause, but the exact '60%' statistic is unverified in text."
      }
    ]
  }
];

const DEMO_ACTIVITIES = [
  {
    id: "act-1",
    action: "Generated 3 social posts from 'PulseFlow AI Studio v4.0 Launch'",
    timestamp: "2026-10-22T09:14:00Z",
    type: "generation",
    icon: "bi-stars"
  },
  {
    id: "act-2",
    action: "Approved LinkedIn post: 'The Death of the Corporate Security Perimeter'",
    timestamp: "2026-10-21T15:40:00Z",
    type: "approval",
    icon: "bi-check-circle"
  },
  {
    id: "act-3",
    action: "Updated Brand Guidelines tone to 'Authoritative, Engaging & Data-Driven'",
    timestamp: "2026-10-20T11:20:00Z",
    type: "settings",
    icon: "bi-sliders"
  },
  {
    id: "act-4",
    action: "Imported new source document: 'Headless E-Commerce Optimization'",
    timestamp: "2026-10-19T17:05:00Z",
    type: "source",
    icon: "bi-file-earmark-plus"
  },
  {
    id: "act-5",
    action: "Flagged claim #cl-25 as 'Uncertain' during fact-check review",
    timestamp: "2026-10-18T14:50:00Z",
    type: "evidence",
    icon: "bi-shield-exclamation"
  },
  {
    id: "act-6",
    action: "Exported 8 approved posts to CSV for Q4 Social Campaign",
    timestamp: "2026-10-17T16:10:00Z",
    type: "export",
    icon: "bi-download"
  }
];

const DEMO_BRAND = {
  brandName: "Acme Innovations & Cloud Labs",
  industry: "B2B SaaS / Enterprise Technology",
  website: "https://acmelabs.cloud",
  description: "Provider of high-performance cloud tools, automated workflows, and developer-first data platforms.",
  targetAudience: "Engineering Directors, CISOs, Product Managers, and Growth Marketers",
  preferredTone: "Authoritative yet accessible, data-driven, and forward-looking",
  writingGuidelines: "Lead with empirical metrics and benchmark data. Avoid hyperbole or unproven marketing claims. Always connect technological architecture directly to real business ROI.",
  preferredVocabulary: "Continuous verification, sub-100ms latency, empirical benchmark, time-to-first-value, operational resilience",
  prohibitedTerms: "Miracle tool, overnight success, 100% unhackable, disruptor, synergy, foolproof",
  emojiPreferences: "Minimal & professional (🚀, 🔒, ⚡, 📈, 💡)",
  hashtagPreferences: "#EnterpriseTech #CloudSecurity #WebDevelopment #SaaSGrowth",
  defaultCta: "Read the complete technical deep dive and benchmark findings on our website."
};

const DEMO_PREFERENCES = {
  theme: "light",
  defaultTone: "authoritative",
  preferredPlatforms: ["LinkedIn", "Instagram", "Instagram Reels", "YouTube Shorts", "Facebook"]
};

