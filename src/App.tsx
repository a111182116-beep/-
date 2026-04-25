import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Ship, GraduationCap, Compass, Mail, Info, Menu, X } from 'lucide-react';
import { useState } from 'react';

// --- Components ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: '首頁 Intro', path: '/' },
    { name: '行程規劃 Itinerary', path: '/itinerary' },
    { name: '行前準備 Details', path: '/details' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-full px-6 lg:px-12">
        <div className="flex justify-between h-full items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rotate-45"></div>
            <span className="text-xl font-black tracking-tighter">HSIN-PEI.</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-slate-200 fixed top-20 left-0 w-full shadow-lg"
          >
            <div className="px-6 py-8 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-bold tracking-tight ${
                    location.pathname === link.path ? 'text-accent' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Pages ---

const HomePage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-full xl:h-[calc(100vh-144px)] grid grid-cols-1 lg:grid-cols-12 gap-0"
  >
    {/* Left Column: Visual */}
    <div className="lg:col-span-5 bg-slate-100 relative items-center justify-center flex p-12 overflow-hidden min-h-[500px]">
      <div className="absolute top-12 left-12 z-0">
        <span className="text-[140px] font-black text-white leading-none select-none">01</span>
      </div>
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[320px] aspect-[3/4] bg-slate-300 border-[12px] border-white shadow-2xl overflow-hidden"
      >
        <img
          src="/avatar.png"
          alt="Xinpei"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a better placeholder if avatar.png is missing
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop";
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
      </motion.div>
    </div>

    {/* Right Column: Content */}
    <div className="lg:col-span-7 p-8 sm:p-16 flex flex-col justify-center bg-white">
      <motion.div 
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl"
      >
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-3">Navigation & Shipping Tech</h2>
          <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight tracking-tighter">
            欣佩 <span className="text-slate-200 font-light">HSIN-PEI</span>
          </h1>
          <div className="h-1.5 w-20 bg-accent"></div>
        </div>

        <p className="text-lg leading-relaxed text-slate-600 mb-12 border-l-4 border-slate-100 pl-6 py-2">
          您好，我是欣佩，目前就讀於國立高雄科技大學航運技術系航海科。我具有認真負責與獨立思考的能力，做事細心謹慎，面對困難時會主動尋找解決方法，不輕易放棄。喜歡接觸新事物，藉此提升自我能力與拓展視野。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-t border-slate-100">
          {[
            { label: 'Zodiac Sign', value: '獅子座 Leo' },
            { label: 'Blood Type', value: 'B 型' },
            { label: 'Birthday', value: '2007-07-25' },
          ].map((info) => (
            <div key={info.label}>
              <h4 className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-2">{info.label}</h4>
              <p className="font-bold text-primary text-sm sm:text-base">{info.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link to="/itinerary" className="btn-primary">
            行程規劃 Itinerary
          </Link>
          <Link to="/details" className="btn-outline">
            完整細節 Checklist
          </Link>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const ItineraryPage = () => {
  const days = [
    {
      day: 1,
      title: "抵達清萊 — 建立後勤基地",
      items: ["抵達清萊機場 (CEI) 後前往市中心飯店", "前往「清萊第一巴士站」確認往美塞車次", "晚上至清萊夜市 (Night Bazaar) 採買"],
      transport: "Grab (約200泰銖) / CR Bus (20泰銖)",
      tasks: ["購買泰國長期電信卡", "換足泰銖現鈔", "補齊基本生活用品"]
    },
    {
      day: 2,
      title: "文化洗禮 — 清萊經典巡禮",
      items: ["白廟 (Wat Rong Khun)：藝術傑作", "藍廟 (Wat Rong Suea Ten)：華麗交織", "建議包雙條車 (Songthaew) 或 Grab 往返"],
      food: "Khao Soy Maesai：泰北咖哩麵",
      tasks: ["採買防蚊液", "準備個人常備藥", "邊境進入前健康整備"]
    },
    {
      day: 3,
      title: "推進邊界 — 清萊 ➔ 美塞",
      items: ["上午：參觀「黑屋博物館 (黑廟)」", "下午：前往泰國最北端城市「美塞」", "抵達後入住靠近口岸的旅館"],
      transport: "Minivan (100泰銖) / Local Bus (45泰銖)",
      tasks: ["複印重要證件：護照、簽證、工作合約", "安全策略：實體與數位檔分開存放"]
    },
    {
      day: 4,
      title: "地理實測 — 金三角區域",
      items: ["前往金三角地標：觀察三國交界", "參觀鴉片博物館：了解歷史背景", "建立空間感：對地理環境進行實地觀察"],
      transport: "包車往返 (約500-800泰銖)",
      tasks: ["下載 Google Maps 離線地圖", "確認相機/手機電量充足"]
    },
    {
      day: 5,
      title: "最後整備 — 進入備戰狀態",
      items: ["上午：翠峰茶園享受下午茶", "下午：美塞市區最後物資衝刺", "晚上：與工作對接人進行最後細節確認"],
      tasks: ["安裝 2 套以上 VPN 並完成測試", "檢查所有電子設備電量 (行動電源滿格)", "整理隨身行李，將證件置於易取處"]
    },
    {
      day: 6,
      title: "正式跨國 — 進入緬甸大其力",
      items: ["08:00 抵達美塞海關辦理出境", "08:30 步行跨越「友誼大橋」", "09:30 提交 e-Visa 完成入境手續", "10:30 與接頭人碰面並轉往工作地點"],
      tasks: ["第一時間確認手機訊號", "立即傳送即時定位給緊急聯絡人", "保持通訊軟體在線"]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto py-16 px-6 lg:px-12"
    >
      <div className="mb-12">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">6-Day Itinerary</h2>
        <h1 className="text-4xl font-black text-primary leading-tight">跨國行程規劃詳情</h1>
        <div className="h-1 w-12 bg-primary mt-6"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {days.map((d) => (
          <div key={d.day} className="bg-white border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-50 rotate-45 group-hover:bg-accent/10 transition-colors"></div>
            <span className="text-[10px] font-black uppercase text-accent mb-2 block">Day 0{d.day}</span>
            <h3 className="text-xl font-bold text-primary mb-6 leading-tight h-14 line-clamp-2">{d.title}</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 italic">Schedule</h4>
                <ul className="space-y-2">
                  {d.items.map((item, i) => (
                    <li key={i} className="text-xs text-slate-600 leading-relaxed flex gap-2">
                      <span className="text-accent">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {d.tasks && (
                <div className="pt-4 border-t border-slate-50">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 italic">To-Do</h4>
                  <ul className="space-y-2">
                    {d.tasks.map((task, i) => (
                      <li key={i} className="text-xs font-bold text-primary flex gap-2">
                        <div className="w-1 h-1 bg-primary mt-1.5 rotate-45"></div> {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const DetailsPage = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-7xl mx-auto py-16 px-6 lg:px-12"
  >
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-12 mb-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Preparation & Budget</h2>
        <h1 className="text-4xl font-black text-primary leading-tight">行前清單與預算總覽</h1>
        <div className="h-1 w-12 bg-primary mt-6"></div>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <div className="bg-primary text-white p-10">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">Total Budget</h3>
          <p className="text-4xl font-black mb-2">NT$ 30,000</p>
          <p className="text-xs text-slate-400 italic">估計新台幣 3 萬元整</p>
        </div>

        <div className="border border-slate-200 p-8">
          <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">核心目標</h3>
          <ul className="space-y-4">
            {["泰北文化深度巡禮", "金三角地理實地考察", "跨國邊境流程實測", "緬甸端工作對接準備"].map(goal => (
              <li key={goal} className="flex gap-3 text-sm text-slate-600 font-bold italic">
                <div className="w-1.5 h-1.5 bg-accent rotate-45 mt-1"></div> {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">證件與合約</h4>
            <ul className="space-y-3">
              {["護照正本與影本", "緬甸 e-Visa (列印本)", "工作合約 (實體與數位)"].map(item => (
                <li key={item} className="p-4 bg-white border border-slate-100 font-bold text-primary flex justify-between items-center">
                  {item} <div className="w-2 h-2 bg-slate-200"></div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">數位工具</h4>
            <ul className="space-y-3">
              {["2 套以上 VPN (已測試)", "Google Maps 離線地圖", "泰國長期電信卡"].map(item => (
                <li key={item} className="p-4 bg-white border border-slate-100 font-bold text-primary flex justify-between items-center">
                  {item} <div className="w-2 h-2 bg-slate-200"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-100 p-8">
            <h4 className="text-[10px] font-black uppercase text-accent tracking-widest mb-6">安全機制</h4>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-primary border border-slate-200">01</div>
                <div>
                  <p className="font-bold text-primary">緊急聯絡人</p>
                  <p className="text-xs text-slate-500">準備台灣緊急聯絡名單</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-primary border border-slate-200">02</div>
                <div>
                  <p className="font-bold text-primary">即時定位分享</p>
                  <p className="text-xs text-slate-500">入境後立即開啟分享</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-white flex items-center justify-center font-black text-primary border border-slate-200">03</div>
                <div>
                  <p className="font-bold text-primary">聯繫方式確認</p>
                  <p className="text-xs text-slate-500">再次確認對接人身份</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="border-t-4 border-primary pt-8">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 text-center italic">Ready to cross the border.</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- Layout component ---

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-ui-bg pt-20 flex flex-col relative font-sans">
    <Navigation />
    <main className="flex-1 overflow-x-hidden relative z-10 flex flex-col">
      {children}
    </main>
    <footer className="h-20 border-t border-slate-200 bg-white flex items-center justify-between px-6 lg:px-12 text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black z-10">
      <div className="flex items-center gap-4">
        <span>© 2026 HSIN-PEI.</span>
        <span className="hidden sm:inline text-slate-200">|</span>
        <span className="hidden sm:inline">Professional Portfolio</span>
      </div>
      <div className="flex gap-8">
        <span className="hidden lg:inline">NKUST Navigation Tech</span>
        <span>Page 1 / 3</span>
      </div>
    </footer>
  </div>
);

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/details" element={<DetailsPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}
