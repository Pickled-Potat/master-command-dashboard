import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Share2,
  ExternalLink,
  Copy,
  Check,
  BarChart3,
  Layers
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  niche: string;
  url: string;
  githubRepo: string;
  status: 'LIVE' | 'BUILDING' | 'QUEUED';
  estDailyVisitors: number;
  adSlots: number;
  amazonTag: string;
}

const PORTFOLIO_TOOLS: ToolItem[] = [
  {
    id: 'tool-1',
    name: '3D Printing Cost Estimator',
    niche: '3D Printing & Manufacturing',
    url: 'https://3d-print-calc.pages.dev',
    githubRepo: 'https://github.com/Pickled-Potat/3d-print-calc',
    status: 'LIVE',
    estDailyVisitors: 150,
    adSlots: 2,
    amazonTag: 'nichetools-21'
  },
  {
    id: 'tool-2',
    name: 'Streamer & OBS Bitrate Calculator',
    niche: 'Live Streaming & Broadcast',
    url: 'https://obs-bitrate-calc.pages.dev',
    githubRepo: 'https://github.com/Pickled-Potat/obs-bitrate-calc',
    status: 'LIVE',
    estDailyVisitors: 200,
    adSlots: 2,
    amazonTag: 'nichetools-21'
  },
  {
    id: 'tool-3',
    name: 'Audio & Podcast Gear Estimator',
    niche: 'Audio & Sound Engineering',
    url: 'https://audio-gear-calc.pages.dev',
    githubRepo: 'https://github.com/Pickled-Potat/audio-gear-calc',
    status: 'QUEUED',
    estDailyVisitors: 100,
    adSlots: 2,
    amazonTag: 'nichetools-21'
  },
  {
    id: 'tool-4',
    name: 'CNC & Laser Cutting Cost Tool',
    niche: 'Maker & Fabrication',
    url: 'https://cnc-cost-calc.pages.dev',
    githubRepo: 'https://github.com/Pickled-Potat/cnc-cost-calc',
    status: 'QUEUED',
    estDailyVisitors: 100,
    adSlots: 2,
    amazonTag: 'nichetools-21'
  }
];

const REDDIT_POSTS = [
  {
    subreddit: 'r/3Dprinting & r/BambuLab',
    title: 'Built a free tool to calculate exact 3D print costs (power + filament wear + profit margin)',
    body: `Hey everyone,

I got tired of manually calculating electricity usage, filament spools, and machine depreciation every time I sold a print or estimated a big batch, so I built a 100% free web tool:

🔗 **Tool Link:** https://3d-print-calc.pages.dev

**What it does:**
- Select preset printers (Bambu X1C, P1S, A1, Ender 3, Prusa MK4, Elegoo Neptune, etc.)
- Calculates exact kWh power cost + filament gram cost
- Single Quote, Batch Discounting & Profit Margin modes
- Exports instant clean PDF Quotes for clients
- 100% Free, zero sign-up required

Would love any feedback or feature suggestions!`
  },
  {
    subreddit: 'r/obs & r/Streamers',
    title: 'Free OBS Bitrate & Encoder Calculator for Twitch, YouTube & Kick',
    body: `Hey streamers,

If you ever wondered why your stream looks pixelated or drops frames during high-motion gameplay, I built a free calculator that computes exact OBS bitrate and encoder presets based on your upload speed:

🔗 **Tool Link:** https://obs-bitrate-calc.pages.dev

**Features:**
- Presets for Twitch, YouTube Live (AV1/NVENC), Kick, TikTok
- Recommended bitrate (Kbps) + audio bitrate (128k, 160k, 320k)
- Internet upload headroom calculator (warns if your connection will drop frames)
- Exact OBS copy-paste cheat sheet (CBR, 2s Keyframes, B-Frames)
- 100% Free & instant

Let me know what platform you stream on!`
  },
  {
    subreddit: 'r/SideProject',
    title: 'Building a network of free, monetized web utility tools (£0 host costs on Cloudflare)',
    body: `Hey r/SideProject,

I am building a network of lightweight, high-intent web tools (3D printing calculators, OBS bitrate calculators, maker tools).

**Tech Stack:**
- Vite + React + TailwindCSS
- Deployed on Cloudflare Pages (£0 hosting)
- Monetized with non-intrusive Adsterra display ads + Amazon Associates

Check out the first two tools live:
1. https://3d-print-calc.pages.dev
2. https://obs-bitrate-calc.pages.dev`
  }
];

export function App() {
  const [devModeActive, setDevModeActive] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'reddit' | 'tools'>('overview');

  // State for Live API keys
  const [adsterraApiKey, setAdsterraApiKey] = useState<string>(() => localStorage.getItem('adsterra_api_key') || '');
  const [cloudflareToken, setCloudflareToken] = useState<string>(() => localStorage.getItem('cloudflare_token') || '');
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);
  const [liveAdsterraData, setLiveAdsterraData] = useState<{ impressions: number; revenue: number; cpm: number } | null>(null);

  useEffect(() => {
    const isDev = localStorage.getItem('dev_admin_mode') === 'true';
    setDevModeActive(isDev);
  }, []);

  const saveApiKeys = (adsterra: string, cfToken: string) => {
    setAdsterraApiKey(adsterra);
    setCloudflareToken(cfToken);
    localStorage.setItem('adsterra_api_key', adsterra);
    localStorage.setItem('cloudflare_token', cfToken);
  };

  // Fetch actual real-time Adsterra revenue stats from official API
  const fetchActualAdsterraData = async () => {
    if (!adsterraApiKey) return;
    setIsFetchingLive(true);
    try {
      // Fetch stats from Adsterra Publisher API
      const res = await fetch(`https://api3.adsterra.com/publisher/stats.json?api_key=${adsterraApiKey}`);
      const data = await res.json();
      if (data && data.items) {
        let totalRevenue = 0;
        let totalImpressions = 0;
        data.items.forEach((item: any) => {
          totalRevenue += parseFloat(item.revenue || 0);
          totalImpressions += parseInt(item.impressions || 0, 10);
        });
        const cpm = totalImpressions > 0 ? (totalRevenue / totalImpressions) * 1000 : 0;
        setLiveAdsterraData({ impressions: totalImpressions, revenue: totalRevenue, cpm });
      }
    } catch (e) {
      console.error('Adsterra Live API fetch error:', e);
    } finally {
      setIsFetchingLive(false);
    }
  };

  const toggleDevMode = () => {
    const nextState = !devModeActive;
    setDevModeActive(nextState);
    if (nextState) {
      localStorage.setItem('dev_admin_mode', 'true');
    } else {
      localStorage.removeItem('dev_admin_mode');
    }
  };

  const handleCopyReddit = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Calculations for Portfolio Stats
  const liveToolsCount = PORTFOLIO_TOOLS.filter((t) => t.status === 'LIVE').length;
  const totalDailyVisitors = PORTFOLIO_TOOLS.reduce((acc, t) => acc + (t.status === 'LIVE' ? t.estDailyVisitors : 0), 0);
  const totalMonthlyVisits = totalDailyVisitors * 30;
  const totalMonthlyAdViews = totalMonthlyVisits * 2; // 2 ad slots per tool
  const estMonthlyAdRevenueUSD = (totalMonthlyAdViews / 1000) * 3.0; // $3.00 CPM
  const estMonthlyAdRevenueGBP = estMonthlyAdRevenueUSD * 0.79;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
      {/* Top Owner Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">MASTER COMMAND CENTER</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              OWNER GUI
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Developer Mode Protection Toggle */}
            <button
              onClick={toggleDevMode}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                devModeActive
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>DEV ADMIN MODE: {devModeActive ? 'ENABLED (Stats Protected)' : 'DISABLED'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-zinc-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Revenue & Traffic Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'tools'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Portfolio Tools ({liveToolsCount} Live)</span>
          </button>

          <button
            onClick={() => setActiveTab('reddit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'reddit'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Reddit Marketing Copy</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & REVENUE ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Live API Keys Integration Box */}
            <div className="border border-purple-500/30 bg-purple-500/5 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm text-purple-400">⚡ Connect Official API Keys for ACTUAL Live Revenue & Traffic</h3>
                  <p className="text-xs text-zinc-400">Enter your Adsterra Publisher API key to pull live dollar balances, impressions, and exact CPMs directly from your account.</p>
                </div>
                <button
                  onClick={fetchActualAdsterraData}
                  disabled={!adsterraApiKey || isFetchingLive}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isFetchingLive ? 'Fetching Live Stats...' : 'Sync Actual Live Data 🔄'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-zinc-300 block mb-1">Adsterra Publisher API Key</label>
                  <input
                    type="password"
                    placeholder="Paste key from Adsterra -> Profile -> API"
                    value={adsterraApiKey}
                    onChange={(e) => saveApiKeys(e.target.value, cloudflareToken)}
                    className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-zinc-300 block mb-1">Cloudflare Analytics Read Token (Optional)</label>
                  <input
                    type="password"
                    placeholder="Paste Cloudflare API Token"
                    value={cloudflareToken}
                    onChange={(e) => saveApiKeys(adsterraApiKey, e.target.value)}
                    className="w-full h-10 px-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200"
                  />
                </div>
              </div>
            </div>

            {/* Actual Live Revenue Card (If API connected) */}
            {liveAdsterraData && (
              <div className="p-6 border border-emerald-500/40 bg-emerald-500/10 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">✅ ACTUAL ADSTERRA LIVE DATA</span>
                  <div className="font-mono text-3xl font-extrabold text-foreground">
                    ${liveAdsterraData.revenue.toFixed(2)} USD <span className="text-sm font-normal text-zinc-400">({liveAdsterraData.impressions.toLocaleString()} Impressions)</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-zinc-400 block">Actual Average CPM</span>
                  <span className="text-2xl font-bold text-emerald-400">${liveAdsterraData.cpm.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="border border-zinc-800 bg-zinc-900/60 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 font-medium block mb-1">Active Live Tools</span>
                <span className="font-mono text-3xl font-extrabold text-emerald-400">{liveToolsCount}</span>
                <span className="text-[11px] text-zinc-500 block mt-1">Cloudflare Pages (£0 Host Cost)</span>
              </div>

              <div className="border border-zinc-800 bg-zinc-900/60 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 font-medium block mb-1">Est. Daily Visitors</span>
                <span className="font-mono text-3xl font-extrabold text-foreground">{totalDailyVisitors}</span>
                <span className="text-[11px] text-zinc-500 block mt-1">~{totalMonthlyVisits.toLocaleString()} visits / month</span>
              </div>

              <div className="border border-zinc-800 bg-zinc-900/60 p-5 rounded-2xl">
                <span className="text-xs text-zinc-400 font-medium block mb-1">Monthly Ad Impressions (2x)</span>
                <span className="font-mono text-3xl font-extrabold text-blue-400">{totalMonthlyAdViews.toLocaleString()}</span>
                <span className="text-[11px] text-zinc-500 block mt-1">2 ad slots per tool session</span>
              </div>

              <div className="border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-5 rounded-2xl">
                <span className="text-xs text-emerald-400 font-semibold block mb-1">Est. Pure Ad Revenue (CPM)</span>
                <span className="font-mono text-3xl font-extrabold text-emerald-400">
                  £{estMonthlyAdRevenueGBP.toFixed(2)}
                </span>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  ${estMonthlyAdRevenueUSD.toFixed(2)} USD / month (Plus Amazon Comm.)
                </span>
              </div>
            </div>

            {/* Strategy & Developer Protection Notice */}
            <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-emerald-400">Developer Mode Protection Active</h3>
              </div>
              <p className="text-xs text-zinc-300">
                When testing your live tools (`?dev=true` or `localhost`), Adsterra ad scripts are automatically disabled on your screen. You can browse, test formulas, and click around without generating fake ad impressions or skewing your CPM account stats.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO TOOLS */}
        {activeTab === 'tools' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Niche Tools Portfolio ({PORTFOLIO_TOOLS.length} Total)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PORTFOLIO_TOOLS.map((tool) => (
                <div key={tool.id} className="border border-zinc-800 bg-zinc-900/60 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{tool.name}</h3>
                      <span className="text-xs text-zinc-400">{tool.niche}</span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                        tool.status === 'LIVE'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>

                  <div className="text-xs text-zinc-400 space-y-1 font-mono">
                    <div>Tag: <span className="text-amber-400 font-bold">{tool.amazonTag}</span></div>
                    <div>Ad Slots: <span className="text-zinc-200">{tool.adSlots} Ad Units</span></div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span>Open Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={tool.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: REDDIT PROMOTION COPY */}
        {activeTab === 'reddit' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold">Reddit Promotional Copy (Non-Spam Value Posts)</h2>
              <p className="text-xs text-zinc-400 mt-1">
                Copy and paste these pre-formatted posts directly into relevant subreddits to drive high-intent organic traffic.
              </p>
            </div>

            <div className="space-y-6">
              {REDDIT_POSTS.map((post, idx) => (
                <div key={idx} className="border border-zinc-800 bg-zinc-900/60 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      Target Subreddit: {post.subreddit}
                    </span>
                    <button
                      onClick={() => handleCopyReddit(`${post.title}\n\n${post.body}`, idx)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === idx ? 'Copied Post!' : 'Copy Reddit Post'}</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">Post Title</label>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs font-bold text-foreground">
                      {post.title}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-mono text-zinc-400 block mb-1">Post Content</label>
                    <pre className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-300 whitespace-pre-wrap">
                      {post.body}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
