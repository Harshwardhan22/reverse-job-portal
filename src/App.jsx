/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Heart, X, ChevronRight, ChevronLeft, MapPin, Briefcase,
  Send, Plus, Github, Linkedin, Globe, Mail, Phone, ExternalLink,
  Eye, Building, Users, MessageCircle, ArrowRight, Check, Zap,
  TrendingUp, Edit3, Award, Code, Database, Palette, Star, Sliders,
  BarChart2, Sparkles, BookOpen, Cpu, Coffee, Bell, RefreshCw,
  Layers, Target, Shield, Clock, DollarSign, Tag, ChevronDown,
  Flame, Mic, Brush, PenTool, ToggleLeft, ToggleRight, Lightbulb
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

// ─── STYLE INJECTION ───────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0D0D0F; color: #F5F0E8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0D0D0F; }
  ::-webkit-scrollbar-thumb { background: #F5A623; border-radius: 2px; }
  
  .playfair { font-family: 'Playfair Display', serif; }
  
  @keyframes floatUp {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    50% { transform: translateY(-20px) rotate(2deg); opacity: 0.9; }
    100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  }
  @keyframes floatCard1 {
    0% { transform: translateY(0) rotate(-3deg); }
    100% { transform: translateY(-30px) rotate(-1deg); }
  }
  @keyframes floatCard2 {
    0% { transform: translateY(0) rotate(4deg); }
    100% { transform: translateY(-25px) rotate(2deg); }
  }
  @keyframes floatCard3 {
    0% { transform: translateY(0) rotate(-2deg); }
    100% { transform: translateY(-35px) rotate(1deg); }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse-amber {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.4); }
    50% { box-shadow: 0 0 0 12px rgba(245,166,35,0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes confettiFall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes progressBar {
    from { width: 0%; }
    to { width: var(--target-width); }
  }
  @keyframes heartBeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.3); }
    50% { transform: scale(1); }
    75% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes glow {
    0%, 100% { text-shadow: 0 0 20px rgba(245,166,35,0.3); }
    50% { text-shadow: 0 0 40px rgba(245,166,35,0.8), 0 0 80px rgba(245,166,35,0.3); }
  }
  @keyframes dotPulse {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1.2); opacity: 1; }
  }
  
  .animate-fade-up { animation: fadeInUp 0.6s ease both; }
  .animate-fade-up-1 { animation: fadeInUp 0.6s ease 0.1s both; }
  .animate-fade-up-2 { animation: fadeInUp 0.6s ease 0.2s both; }
  .animate-fade-up-3 { animation: fadeInUp 0.6s ease 0.3s both; }
  .animate-fade-up-4 { animation: fadeInUp 0.6s ease 0.4s both; }
  .animate-scale-in { animation: scaleIn 0.5s ease both; }
  .animate-glow { animation: glow 3s ease-in-out infinite; }
  
  .glass-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .glass-card-hover:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(245,166,35,0.3);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,166,35,0.1);
    transition: all 0.3s ease;
  }
  .amber-btn {
    background: linear-gradient(135deg, #F5A623, #D4AF37);
    color: #0D0D0F;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  .amber-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(245,166,35,0.4);
    filter: brightness(1.05);
  }
  .ghost-btn {
    background: transparent;
    border: 1px solid rgba(245,166,35,0.4);
    color: #F5A623;
    transition: all 0.3s ease;
  }
  .ghost-btn:hover {
    background: rgba(245,166,35,0.1);
    border-color: #F5A623;
  }
  .skill-chip {
    background: rgba(245,166,35,0.12);
    border: 1px solid rgba(245,166,35,0.25);
    color: #F5A623;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .skill-chip:hover { background: rgba(245,166,35,0.2); }
  .skill-chip.active {
    background: rgba(245,166,35,0.25);
    border-color: #F5A623;
  }
  .range-input { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 2px; outline: none; cursor: pointer; }
  .range-input::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; background: #F5A623; border-radius: 50%; cursor: pointer; box-shadow: 0 0 8px rgba(245,166,35,0.5); }
  .range-input::-moz-range-thumb { width: 18px; height: 18px; background: #F5A623; border-radius: 50%; cursor: pointer; border: none; }
  
  .nav-link { position: relative; transition: color 0.2s; }
  .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #F5A623; transition: width 0.3s; }
  .nav-link:hover::after { width: 100%; }
  
  input, textarea, select {
    background: rgba(255,255,255,0.05) !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
    color: #F5F0E8 !important;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  input:focus, textarea:focus, select:focus {
    outline: none !important;
    border-color: rgba(245,166,35,0.5) !important;
    box-shadow: 0 0 0 3px rgba(245,166,35,0.1) !important;
  }
  input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.3) !important; }
  
  .confetti-piece {
    position: fixed;
    width: 10px;
    height: 10px;
    animation: confettiFall var(--duration) ease-in var(--delay) forwards;
    pointer-events: none;
    z-index: 9999;
  }
  .typing-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #F5A623;
    display: inline-block;
    margin: 0 2px;
    animation: dotPulse 1.4s ease-in-out infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
`;

// ─── MOCK DATA ──────────────────────────────────────────────────────────────────
const COMPANIES = [
  { id: "comp-1", name: "TechVision Labs", industry: "AI & Machine Learning", size: "50-200", logo: "TV", color: "#6366F1", blurb: "Building the future of intelligent automation. We value bold thinkers.", location: "San Francisco, CA" },
  { id: "comp-2", name: "FinFlow", industry: "Fintech", size: "200-500", logo: "FF", color: "#10B981", blurb: "Reimagining global payments infrastructure. Join our mission.", location: "New York, NY" },
  { id: "comp-3", name: "Designcraft", industry: "Creative Agency", size: "20-50", logo: "DC", color: "#EC4899", blurb: "Award-winning design studio seeking exceptional visual storytellers.", location: "London, UK" },
  { id: "comp-4", name: "CloudNova", industry: "Cloud Infrastructure", size: "500-1000", logo: "CN", color: "#3B82F6", blurb: "Scaling cloud solutions for Fortune 500 companies worldwide.", location: "Austin, TX" },
  { id: "comp-5", name: "HealthMind", industry: "Health Tech", size: "100-200", logo: "HM", color: "#14B8A6", blurb: "Transforming mental health care through AI-powered solutions.", location: "Boston, MA" },
  { id: "comp-6", name: "GreenByte", industry: "CleanTech", size: "50-100", logo: "GB", color: "#22C55E", blurb: "Sustainable software solutions for a greener planet.", location: "Amsterdam, NL" },
  { id: "comp-7", name: "Orbital Media", industry: "Media & Entertainment", size: "200-500", logo: "OM", color: "#F59E0B", blurb: "Next-gen content platform reaching 50M+ users globally.", location: "Los Angeles, CA" },
  { id: "comp-8", name: "CyberShield", industry: "Cybersecurity", size: "100-300", logo: "CS", color: "#EF4444", blurb: "Enterprise-grade security for the AI era. Zero compromises.", location: "Washington DC" },
  { id: "comp-9", name: "EduForge", industry: "EdTech", size: "30-80", logo: "EF", color: "#8B5CF6", blurb: "Democratizing world-class education through adaptive learning.", location: "Toronto, CA" },
  { id: "comp-10", name: "Meridian Labs", industry: "Biotech", size: "50-150", logo: "ML", color: "#06B6D4", blurb: "Accelerating drug discovery with computational biology.", location: "Seattle, WA" },
];

const PROFILES = [
  { id: "s-1", name: "Aria Chen", headline: "Senior Full Stack Engineer | React & Node | Open to Remote", bio: "8 years building scalable web apps. Passionate about clean architecture and developer experience. Led 3 successful product launches at Series B startups.", location: "San Francisco, CA", photo: null, initials: "AC", color: "#6366F1", skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "GraphQL"], yearsExp: 8, workType: "Remote", availability: "2 weeks", salaryMin: 160000, salaryMax: 220000, followedCompanies: ["comp-1", "comp-4"], employmentType: ["Full-time"], contactPref: "Email", email: "aria@example.com" },
  { id: "s-2", name: "Marcus Webb", headline: "ML Engineer | LLMs & Computer Vision | PhD Stanford", bio: "Specialized in large language models and computer vision. Published 5 papers in top AI conferences. Looking to apply research to real-world impact.", location: "Palo Alto, CA", photo: null, initials: "MW", color: "#10B981", skills: ["Python", "PyTorch", "LLMs", "Computer Vision", "MLOps", "CUDA"], yearsExp: 6, workType: "Hybrid", availability: "1 month", salaryMin: 200000, salaryMax: 280000, followedCompanies: ["comp-1", "comp-5"], employmentType: ["Full-time"], contactPref: "LinkedIn", linkedin: "linkedin.com/in/marcuswebb" },
  { id: "s-3", name: "Sofia Ramirez", headline: "Product Designer | Design Systems | Figma Expert", bio: "Crafting delightful digital experiences for 7 years. Built design systems used by teams of 200+. Believe great design is invisible.", location: "New York, NY", photo: null, initials: "SR", color: "#EC4899", skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Motion Design", "Framer"], yearsExp: 7, workType: "Remote", availability: "Immediate", salaryMin: 130000, salaryMax: 180000, followedCompanies: ["comp-3", "comp-7"], employmentType: ["Full-time", "Contract"], contactPref: "Email", email: "sofia@example.com" },
  { id: "s-4", name: "James Okoye", headline: "DevOps / Platform Engineer | K8s | Cloud Infrastructure", bio: "Building reliable, scalable infrastructure at hyperscale. Reduced cloud costs by 40% at my last company. Kubernetes certified.", location: "Austin, TX", photo: null, initials: "JO", color: "#F59E0B", skills: ["Kubernetes", "Terraform", "AWS", "GCP", "Docker", "CI/CD"], yearsExp: 9, workType: "Hybrid", availability: "2 weeks", salaryMin: 150000, salaryMax: 200000, followedCompanies: ["comp-4"], employmentType: ["Full-time"], contactPref: "Email", email: "james@example.com" },
  { id: "s-5", name: "Yuki Tanaka", headline: "iOS Developer | Swift | ARKit | 4.9★ App Store Apps", bio: "Mobile engineer specializing in iOS. Built 3 apps with 500k+ downloads. Deep expertise in ARKit and SwiftUI. Based in Tokyo, open to global remote.", location: "Tokyo, Japan", photo: null, initials: "YT", color: "#8B5CF6", skills: ["Swift", "SwiftUI", "ARKit", "iOS", "Objective-C", "CoreML"], yearsExp: 5, workType: "Remote", availability: "1 month", salaryMin: 100000, salaryMax: 150000, followedCompanies: ["comp-1"], employmentType: ["Full-time", "Contract"], contactPref: "LinkedIn", linkedin: "linkedin.com/in/yukitanaka" },
  { id: "s-6", name: "Priya Sharma", headline: "Backend Engineer | Go & Rust | Distributed Systems", bio: "Low-level systems programmer with a love for performance optimization. Built distributed databases handling 100M+ transactions/day.", location: "Bangalore, India", photo: null, initials: "PS", color: "#14B8A6", skills: ["Go", "Rust", "Distributed Systems", "gRPC", "Kafka", "Redis"], yearsExp: 7, workType: "Remote", availability: "Immediate", salaryMin: 90000, salaryMax: 140000, followedCompanies: ["comp-1", "comp-8"], employmentType: ["Full-time"], contactPref: "Email", email: "priya@example.com" },
  { id: "s-7", name: "Leo Martinez", headline: "Frontend Architect | Vue3 | Performance | Web3", bio: "Obsessed with web performance and accessibility. Core contributor to 2 open-source projects. Transitioned into Web3 last year.", location: "Barcelona, Spain", photo: null, initials: "LM", color: "#22C55E", skills: ["Vue.js", "Web3", "Performance", "TypeScript", "Solidity", "Three.js"], yearsExp: 6, workType: "Remote", availability: "2 weeks", salaryMin: 110000, salaryMax: 160000, followedCompanies: ["comp-7", "comp-2"], employmentType: ["Full-time", "Freelance"], contactPref: "Email", email: "leo@example.com" },
  { id: "s-8", name: "Amara Diallo", headline: "Data Scientist | NLP | Fintech Analytics | Ex-Bloomberg", bio: "Turning raw financial data into actionable insights. Ex-Bloomberg quant analyst. Masters in Statistics from Columbia.", location: "New York, NY", photo: null, initials: "AD", color: "#EF4444", skills: ["Python", "NLP", "SQL", "Tableau", "Spark", "Statistics"], yearsExp: 5, workType: "Hybrid", availability: "1 month", salaryMin: 140000, salaryMax: 190000, followedCompanies: ["comp-2", "comp-1"], employmentType: ["Full-time"], contactPref: "LinkedIn", linkedin: "linkedin.com/in/amaradiallo" },
  { id: "s-9", name: "Noah Kim", headline: "Security Engineer | Penetration Testing | Cloud Security", bio: "Ethical hacker and security researcher. Found critical vulnerabilities in major platforms. OSCP and CEH certified.", location: "Washington DC", photo: null, initials: "NK", color: "#06B6D4", skills: ["Penetration Testing", "Cloud Security", "Python", "Burp Suite", "AWS Security", "Zero Trust"], yearsExp: 8, workType: "On-site", availability: "1 month", salaryMin: 160000, salaryMax: 220000, followedCompanies: ["comp-8"], employmentType: ["Full-time"], contactPref: "Email", email: "noah@example.com" },
  { id: "s-10", name: "Elena Vasquez", headline: "Product Manager | B2B SaaS | 0→1 Products | YC Alum", bio: "Led product at two YC-backed startups from 0 to $10M ARR. Passionate about developer tools and bottom-up SaaS growth.", location: "Seattle, WA", photo: null, initials: "EV", color: "#F97316", skills: ["Product Strategy", "User Research", "Roadmapping", "B2B SaaS", "SQL", "Figma"], yearsExp: 7, workType: "Remote", availability: "Immediate", salaryMin: 170000, salaryMax: 230000, followedCompanies: ["comp-4", "comp-5"], employmentType: ["Full-time"], contactPref: "LinkedIn", linkedin: "linkedin.com/in/elenavasquez" },
  { id: "s-11", name: "Kai Anderson", headline: "DevRel & Technical Writer | Docs Expert | Community Builder", bio: "Building bridges between developers and products. Grew a developer community from 500 to 50k members. Speaker at DevConf 2024.", location: "Amsterdam, NL", photo: null, initials: "KA", color: "#D946EF", skills: ["Technical Writing", "Developer Relations", "Community", "APIs", "Content Strategy", "React"], yearsExp: 5, workType: "Remote", availability: "2 weeks", salaryMin: 100000, salaryMax: 145000, followedCompanies: ["comp-6", "comp-9"], employmentType: ["Full-time", "Contract"], contactPref: "Email", email: "kai@example.com" },
  { id: "s-12", name: "Ravi Patel", headline: "Blockchain Dev | Smart Contracts | DeFi Protocol Architect", bio: "Built DeFi protocols managing $200M+ TVL. Solidity and Move language expert. Previously at Coinbase.", location: "Miami, FL", photo: null, initials: "RP", color: "#84CC16", skills: ["Solidity", "Web3.js", "DeFi", "Smart Contracts", "Move", "Hardhat"], yearsExp: 4, workType: "Remote", availability: "Immediate", salaryMin: 140000, salaryMax: 200000, followedCompanies: ["comp-2", "comp-7"], employmentType: ["Full-time", "Contract", "Freelance"], contactPref: "Email", email: "ravi@example.com" },
];

const MOCK_VIEWS = [
  { company: "TechVision Labs", logo: "TV", color: "#6366F1", time: "2h ago" },
  { company: "CloudNova", logo: "CN", color: "#3B82F6", time: "5h ago" },
  { company: "FinFlow", logo: "FF", color: "#10B981", time: "Yesterday" },
  { company: "CyberShield", logo: "CS", color: "#EF4444", time: "2 days ago" },
];

const SPARKLINE_DATA = [
  { day: "M", views: 3 }, { day: "T", views: 7 }, { day: "W", views: 5 },
  { day: "T", views: 12 }, { day: "F", views: 9 }, { day: "S", views: 15 },
  { day: "S", views: 11 },
];

const TESTIMONIALS = [
  { name: "Isabelle Roy", role: "Frontend Dev → Stripe", text: "Got reached out to by 6 companies in my first week. Landed my dream job in 3 weeks total. TalentFirst completely flipped the script.", avatar: "IR", color: "#6366F1" },
  { name: "David Chen", role: "ML Eng → DeepMind", text: "As someone who hates cold-applying, this platform is a revelation. Companies came to me with tailored opportunities. 10/10.", avatar: "DC", color: "#10B981" },
  { name: "Nadia Omar", role: "PM → Figma", text: "The profile completeness tracker kept me motivated to show my best self. Three competing offers in two weeks. Incredible.", avatar: "NO", color: "#EC4899" },
];

const SKILL_TAGS = ["React", "TypeScript", "Python", "AWS", "Node.js", "Figma", "Go", "Rust", "Swift", "Kubernetes", "LLMs", "GraphQL", "Vue.js", "Docker", "PostgreSQL", "Web3", "Machine Learning", "DevOps", "Product Design", "Data Science", "iOS", "Android", "Blockchain", "NLP", "Redis", "MongoDB"];

// ─── UTILITY COMPONENTS ────────────────────────────────────────────────────────
const C = {
  bg: "#0D0D0F",
  card: { background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" },
  cardHover: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(245,166,35,0.3)" },
  accent: "#F5A623",
  gold: "#D4AF37",
  ivory: "#F5F0E8",
  muted: "#8A8A7E",
  border: "rgba(255,255,255,0.08)",
};

function Avatar({ initials, color, size = 40 }) {
  return (
    <div style={{ width: size, height: size, minWidth: size, borderRadius: "50%", background: `${color}22`, border: `2px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: size * 0.32, color }}>
      {initials}
    </div>
  );
}

function SkillChip({ skill, removable, onRemove, onClick, active }) {
  return (
    <span className={`skill-chip ${active ? "active" : ""}`} onClick={onClick || (removable ? onRemove : undefined)} style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: onClick || removable ? "pointer" : "default" }}>
      {skill}
      {removable && <X size={10} />}
    </span>
  );
}

function GlassCard({ children, style = {}, className = "", onClick, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`glass-card ${hover ? "glass-card-hover" : ""} ${className}`}
      style={{ borderRadius: 16, padding: 24, transition: "all 0.3s ease", cursor: onClick ? "pointer" : "default", ...style }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

function Badge({ children, variant = "default" }) {
  const styles = {
    default: { background: "rgba(255,255,255,0.08)", color: C.ivory },
    amber: { background: "rgba(245,166,35,0.15)", color: C.accent, border: "1px solid rgba(245,166,35,0.3)" },
    green: { background: "rgba(34,197,94,0.15)", color: "#22C55E", border: "1px solid rgba(34,197,94,0.3)" },
    red: { background: "rgba(239,68,68,0.15)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" },
    blue: { background: "rgba(59,130,246,0.15)", color: "#60A5FA", border: "1px solid rgba(59,130,246,0.3)" },
  };
  return (
    <span style={{ ...styles[variant], borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap", ...styles[variant] }}>
      {children}
    </span>
  );
}

function AmberBtn({ children, onClick, style = {}, disabled = false, small = false }) {
  return (
    <button className="amber-btn" onClick={onClick} disabled={disabled} style={{ borderRadius: 10, padding: small ? "8px 18px" : "12px 24px", fontSize: small ? 13 : 15, border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, display: "flex", alignItems: "center", gap: 8, ...style }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, style = {}, small = false }) {
  return (
    <button className="ghost-btn" onClick={onClick} style={{ borderRadius: 10, padding: small ? "7px 16px" : "11px 22px", fontSize: small ? 13 : 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, ...style }}>
      {children}
    </button>
  );
}

// ─── CHATBOT ───────────────────────────────────────────────────────────────────
function ChatBot({ mode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const messagesEndRef = useRef(null);
  const quickReplies = ["How do I get noticed?", "Help me find React devs", "How does following work?"];
  
  const systemPrompt = mode === "seeker"
    ? `You are Talent, the TalentFirst platform assistant. You help job seekers optimize their profiles, suggest relevant skills, explain platform features, and encourage them. TalentFirst is a reverse job board where seekers post profiles and companies find them. Be warm, concise, and actionable. Use emojis sparingly.`
    : `You are Talent, the TalentFirst platform assistant. You help companies find the right candidates, write better search queries, understand filters, and evaluate talent. TalentFirst is a reverse job board where job seekers post profiles and companies discover them. Be professional, concise, and data-driven.`;

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages,
        }),
      });
      const data = await res.json();
      const fullText = data.content?.[0]?.text || "I'm here to help! Ask me anything about TalentFirst.";
      setLoading(false);
      const botMsg = { role: "assistant", content: "" };
      setMessages(prev => [...prev, botMsg]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: fullText.slice(0, i + 1) };
            return updated;
          });
          i++;
        } else {
          clearInterval(interval);
        }
      }, 18);
    } catch {
      setLoading(false);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again!" }]);
    }
  };

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ position: "fixed", bottom: 28, right: 28, width: 58, height: 58, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, ${C.gold})`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 25px rgba(245,166,35,0.45)", animation: open ? "none" : "pulse-amber 2s infinite", zIndex: 1000, transition: "transform 0.3s", transform: open ? "scale(0.9)" : "scale(1)" }}
      >
        {open ? <X size={22} color="#0D0D0F" /> : <MessageCircle size={22} color="#0D0D0F" />}
      </button>

      {/* Chat Drawer */}
      {open && (
        <div style={{ position: "fixed", bottom: 100, right: 28, width: 360, height: 520, borderRadius: 20, ...C.card, display: "flex", flexDirection: "column", zIndex: 999, animation: "slideInRight 0.3s ease", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "18px 20px", borderBottom: `1px solid ${C.border}`, background: "rgba(245,166,35,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, ${C.gold})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} color="#0D0D0F" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: C.ivory, fontFamily: "'Playfair Display', serif" }}>Talent AI</div>
              <div style={{ fontSize: 11, color: C.accent }}>● Online · TalentFirst Assistant</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>✨</div>
                <div style={{ color: C.ivory, fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Hi! I'm Talent.</div>
                <div style={{ color: C.muted, fontSize: 12 }}>Your TalentFirst AI guide</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                  {quickReplies.map(q => (
                    <button key={q} onClick={() => sendMessage(q)} style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 12, padding: "8px 14px", fontSize: 12, color: C.accent, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: m.role === "user" ? `linear-gradient(135deg, ${C.accent}, ${C.gold})` : "rgba(255,255,255,0.07)",
                  color: m.role === "user" ? "#0D0D0F" : C.ivory, fontSize: 13, lineHeight: 1.5,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "10px 14px", background: "rgba(255,255,255,0.07)", borderRadius: "16px 16px 16px 4px", width: "fit-content", marginBottom: 10 }}>
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && input.trim() && sendMessage(input)}
              placeholder="Ask Talent anything..."
              style={{ flex: 1, borderRadius: 10, padding: "10px 14px", fontSize: 13 }}
            />
            <button onClick={() => input.trim() && sendMessage(input)} style={{ width: 40, height: 40, borderRadius: 10, background: input.trim() ? `linear-gradient(135deg, ${C.accent}, ${C.gold})` : "rgba(255,255,255,0.05)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Send size={16} color={input.trim() ? "#0D0D0F" : C.muted} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────────
function Navbar({ mode, setMode, view, setView }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 32px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(13,13,15,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <div className="playfair" style={{ fontSize: 22, fontWeight: 700, color: C.ivory, cursor: "pointer", letterSpacing: "-0.02em" }} onClick={() => setView("landing")}>
          Talent<span style={{ color: C.accent }}>First</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["Home", "landing"], ["Find Talent", "company"], ["Post Profile", "create-profile"], ["Companies", mode === "seeker" ? "seeker-dashboard" : "company"]].map(([label, v]) => (
            <span key={label} className="nav-link" style={{ fontSize: 14, color: view === v ? C.accent : C.muted, cursor: "pointer", fontWeight: 500, transition: "color 0.2s" }} onClick={() => setView(v === "seeker-dashboard" ? "seeker-dashboard" : v === "company" ? "company" : v)}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Mode Toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", borderRadius: 30, padding: "5px 6px", border: `1px solid ${C.border}` }}>
        {["seeker", "company"].map(m => (
          <button key={m} onClick={() => { setMode(m); setView(m === "seeker" ? "landing" : "company"); }} style={{ borderRadius: 24, padding: "7px 18px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: mode === m ? `linear-gradient(135deg, ${C.accent}, ${C.gold})` : "transparent", color: mode === m ? "#0D0D0F" : C.muted, transition: "all 0.3s" }}>
            {m === "seeker" ? "I'm a Job Seeker" : "I'm a Company"}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── LANDING PAGE ───────────────────────────────────────────────────────────────
function LandingPage({ setView }) {
  const floatStyles = [
    { top: "15%", left: "5%", animation: "floatCard1 4s ease-in-out infinite alternate" },
    { top: "55%", left: "2%", animation: "floatCard2 5s ease-in-out infinite alternate" },
    { top: "20%", right: "5%", animation: "floatCard3 4.5s ease-in-out infinite alternate" },
    { top: "60%", right: "2%", animation: "floatCard1 3.8s ease-in-out 1s infinite alternate" },
    { top: "40%", left: "50%", transform: "translateX(-50%)", opacity: 0.15, animation: "floatCard2 6s ease-in-out infinite alternate" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 70 }}>
        {/* Background gradient */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,166,35,0.08) 0%, transparent 60%)" }} />
        
        {/* Floating background cards */}
        {floatStyles.map((style, i) => {
          const p = PROFILES[i * 2];
          return (
            <div key={i} style={{ position: "absolute", ...C.card, borderRadius: 14, padding: "14px 16px", width: 200, zIndex: 1, pointerEvents: "none", ...style }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Avatar initials={p.initials} color={p.color} size={32} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.ivory }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{p.location}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {p.skills.slice(0, 3).map(s => <span key={s} style={{ fontSize: 10, background: `${p.color}20`, color: p.color, borderRadius: 10, padding: "2px 7px", border: `1px solid ${p.color}40` }}>{s}</span>)}
              </div>
            </div>
          );
        })}

        {/* Main hero content */}
        <div style={{ textAlign: "center", maxWidth: 800, padding: "0 24px", position: "relative", zIndex: 2 }}>
          <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 30, padding: "6px 18px", marginBottom: 32, fontSize: 13, color: C.accent }}>
            <Sparkles size={14} />
            The future of hiring is here
          </div>
          <h1 className="playfair animate-fade-up-1" style={{ fontSize: "clamp(44px, 8vw, 88px)", lineHeight: 1.05, fontWeight: 800, color: C.ivory, marginBottom: 16, letterSpacing: "-0.03em" }}>
            Get <span style={{ color: C.accent, fontStyle: "italic" }} className="animate-glow">Discovered</span>.<br />Not Lost.
          </h1>
          <p className="animate-fade-up-2" style={{ fontSize: 18, color: C.muted, marginBottom: 40, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
            TalentFirst flips the script. You post. Companies find you. Land your dream role without sending a single application.
          </p>
          <div className="animate-fade-up-3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <AmberBtn onClick={() => setView("create-profile")} style={{ fontSize: 16, padding: "14px 32px" }}>
              Post Your Profile <ArrowRight size={18} />
            </AmberBtn>
            <GhostBtn onClick={() => setView("company")} style={{ fontSize: 16, padding: "14px 32px" }}>
              <Building size={18} /> Find Talent
            </GhostBtn>
          </div>
          <div className="animate-fade-up-4" style={{ display: "flex", justifyContent: "center", gap: 36, marginTop: 52 }}>
            {[["2,400+", "Active Profiles"], ["340+", "Companies Hiring"], ["94%", "Match Rate"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div className="playfair" style={{ fontSize: 28, fontWeight: 700, color: C.accent }}>{n}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div style={{ padding: "16px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, overflow: "hidden", background: "rgba(245,166,35,0.03)" }}>
        <div style={{ display: "flex", animation: "marquee 25s linear infinite", width: "max-content" }}>
          {[...SKILL_TAGS, ...SKILL_TAGS].map((tag, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "0 24px", fontSize: 13, color: i % 3 === 0 ? C.accent : C.muted, whiteSpace: "nowrap" }}>
              {tag} <span style={{ color: C.border }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <section style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.15em", color: C.accent, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>How It Works</div>
            <h2 className="playfair" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: C.ivory }}>Three steps to your next chapter.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { icon: <Edit3 size={28} />, title: "Build Your Profile", desc: "Showcase your skills, experience, and what you're looking for. Be specific — companies love clarity.", step: "01" },
              { icon: <Building size={28} />, title: "Companies Discover You", desc: "Hiring teams search our pool of verified talent and reach out directly. No black holes, no ghosting.", step: "02" },
              { icon: <Zap size={28} />, title: "Get Hired Faster", desc: "Respond to relevant opportunities on your timeline. You're in control of your career journey.", step: "03" },
            ].map(({ icon, title, desc, step }) => (
              <GlassCard key={step}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(245,166,35,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: C.accent }}>
                    {icon}
                  </div>
                  <span className="playfair" style={{ fontSize: 48, fontWeight: 800, color: "rgba(245,166,35,0.12)", lineHeight: 1 }}>{step}</span>
                </div>
                <h3 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: C.ivory, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "60px 48px 100px", background: "rgba(245,166,35,0.03)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.15em", color: C.accent, fontWeight: 600, textTransform: "uppercase", marginBottom: 12 }}>Success Stories</div>
            <h2 className="playfair" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: C.ivory }}>Talent wins, every time.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <GlassCard key={i} style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -10, right: 16, fontSize: 80, color: "rgba(245,166,35,0.07)", fontFamily: "serif", lineHeight: 1 }}>"</div>
                <p style={{ fontSize: 15, color: "#D4CAB8", lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar initials={t.avatar} color={t.color} size={42} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: C.ivory }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.accent }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={C.accent} color={C.accent} />)}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "80px 48px", background: "linear-gradient(135deg, rgba(245,166,35,0.08) 0%, rgba(212,175,55,0.05) 100%)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 className="playfair" style={{ fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 700, color: C.ivory, marginBottom: 16 }}>Ready to be found?</h2>
          <p style={{ color: C.muted, marginBottom: 32, fontSize: 16 }}>Join thousands of professionals who let their talent do the talking.</p>
          <AmberBtn onClick={() => setView("create-profile")} style={{ margin: "0 auto", fontSize: 16, padding: "14px 40px" }}>
            Create Your Profile — It's Free <ArrowRight size={18} />
          </AmberBtn>
        </div>
      </section>
    </div>
  );
}

// ─── PROFILE CREATION (5-STEP FORM) ────────────────────────────────────────────
const DEFAULT_FORM = {
  name: "", headline: "", bio: "", city: "", country: "",
  photo: null, skills: [], projects: [], github: "", linkedin: "", portfolio: "",
  experience: [], education: { degree: "", institution: "", year: "" },
  yearsExp: 3,
  workType: [], employmentType: [], salaryMin: 80000, salaryMax: 150000,
  industries: [], availability: "immediate", contactPref: [], email: "", phone: "", linkedinContact: "",
};

const INDUSTRIES = ["AI / ML", "Fintech", "HealthTech", "EdTech", "CleanTech", "Web3 / Crypto", "SaaS", "E-commerce", "Gaming", "Cybersecurity", "Media", "Consulting"];
const AVAIL_OPTIONS = [
  { id: "immediate", label: "Immediate" },
  { id: "2-weeks", label: "2 Weeks" },
  { id: "1-month", label: "1 Month" },
  { id: "not-looking", label: "Not Looking" },
];

function ProfileCreation({ onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [skillInput, setSkillInput] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", desc: "", link: "" });
  const [newExp, setNewExp] = useState({ company: "", role: "", duration: "", desc: "" });

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      update("skills", [...form.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const toggleArr = (key, val) => {
    const arr = form[key];
    update(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const fireConfetti = () => {
    const colors = [C.accent, C.gold, "#fff", "#EC4899", "#6366F1", "#22C55E"];
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[i % colors.length],
      duration: `${1.5 + Math.random() * 2}s`,
      delay: `${Math.random() * 0.8}s`,
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }));
    setConfettiPieces(pieces);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handlePublish = () => {
    fireConfetti();
    setTimeout(() => {
      onComplete({ ...form, id: "created-seeker", initials: form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), color: C.accent, followedCompanies: [] });
    }, 1800);
  };

  const TOTAL_STEPS = 5;
  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingTop: 90, paddingBottom: 60 }}>
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
          {confettiPieces.map(p => (
            <div key={p.id} className="confetti-piece" style={{
              left: p.left, top: "-20px",
              background: p.color,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              width: p.shape === "circle" ? 8 : 10,
              height: p.shape === "circle" ? 8 : 6,
              "--duration": p.duration,
              "--delay": p.delay,
            }} />
          ))}
        </div>
      )}

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeInUp 0.5s ease both" }}>
          <h1 className="playfair" style={{ fontSize: 40, fontWeight: 700, color: C.ivory, marginBottom: 8 }}>
            Build Your <span style={{ color: C.accent, fontStyle: "italic" }}>Profile</span>
          </h1>
          <p style={{ color: C.muted, fontSize: 15 }}>Let the right companies find you.</p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            {["Personal", "Skills", "Experience", "Preferences", "Review"].map((s, i) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > i + 1 ? `linear-gradient(135deg, ${C.accent}, ${C.gold})` : step === i + 1 ? "rgba(245,166,35,0.2)" : "rgba(255,255,255,0.05)", border: step === i + 1 ? `2px solid ${C.accent}` : step > i + 1 ? "none" : `2px solid ${C.border}`, fontSize: 12, fontWeight: 700, color: step > i + 1 ? "#0D0D0F" : step === i + 1 ? C.accent : C.muted, transition: "all 0.4s", boxShadow: step === i + 1 ? `0 0 16px rgba(245,166,35,0.4)` : "none" }}>
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: 10, color: step === i + 1 ? C.accent : C.muted, fontWeight: step === i + 1 ? 600 : 400, display: "none" }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.accent}, ${C.gold})`, borderRadius: 2, width: `${progress}%`, transition: "width 0.5s ease" }} />
          </div>
          <div style={{ textAlign: "right", marginTop: 6, fontSize: 12, color: C.muted }}>Step {step} of {TOTAL_STEPS}</div>
        </div>

        <GlassCard>
          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ animation: "fadeInUp 0.4s ease both" }}>
              <h2 className="playfair" style={{ fontSize: 26, fontWeight: 700, color: C.ivory, marginBottom: 6 }}>Personal Information</h2>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>Make a powerful first impression.</p>
              <div style={{ display: "grid", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Full Name</label>
                    <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="e.g. Alex Johnson" style={{ width: "100%", borderRadius: 10, padding: "12px 14px", fontSize: 14 }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Location</label>
                    <input value={form.city} onChange={e => update("city", e.target.value)} placeholder="City, Country" style={{ width: "100%", borderRadius: 10, padding: "12px 14px", fontSize: 14 }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Headline</label>
                  <input value={form.headline} onChange={e => update("headline", e.target.value)} placeholder="e.g. Full Stack Dev | 5 YOE | Open to Remote" style={{ width: "100%", borderRadius: 10, padding: "12px 14px", fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Bio / Summary</label>
                  <textarea value={form.bio} onChange={e => e.target.value.length <= 300 && update("bio", e.target.value)} placeholder="Tell companies who you are and what drives you..." rows={4} style={{ width: "100%", borderRadius: 10, padding: "12px 14px", fontSize: 14, resize: "vertical" }} />
                  <div style={{ textAlign: "right", fontSize: 11, color: form.bio.length > 280 ? "#EF4444" : C.muted, marginTop: 4 }}>{form.bio.length}/300</div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Profile Photo (URL or Upload)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: form.photo ? `url(${form.photo})` : "rgba(245,166,35,0.1)", backgroundSize: "cover", backgroundPosition: "center", border: `2px dashed ${C.accent}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {!form.photo && <span style={{ fontSize: 22 }}>📷</span>}
                    </div>
                    <input value={form.photo || ""} onChange={e => update("photo", e.target.value)} placeholder="Paste image URL..." style={{ flex: 1, borderRadius: 10, padding: "10px 14px", fontSize: 13 }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ animation: "fadeInUp 0.4s ease both" }}>
              <h2 className="playfair" style={{ fontSize: 26, fontWeight: 700, color: C.ivory, marginBottom: 6 }}>Skills & Projects</h2>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>Show what you can do.</p>
              <div style={{ display: "grid", gap: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Skills (press Enter to add)</label>
                  <input value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill} placeholder="Type a skill and press Enter..." style={{ width: "100%", borderRadius: 10, padding: "12px 14px", fontSize: 14, marginBottom: 10 }} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {form.skills.map(s => <SkillChip key={s} skill={s} removable onRemove={() => update("skills", form.skills.filter(x => x !== s))} />)}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Projects (up to 4)</label>
                  {form.projects.map((p, i) => (
                    <div key={i} style={{ ...C.card, borderRadius: 12, padding: "14px", marginBottom: 10, position: "relative" }}>
                      <button onClick={() => update("projects", form.projects.filter((_, j) => j !== i))} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", color: C.muted }}>
                        <X size={14} />
                      </button>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.ivory, marginBottom: 2 }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{p.desc}</div>
                      {p.link && <a href={p.link} target="_blank" style={{ fontSize: 11, color: C.accent, display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}><ExternalLink size={10} /> {p.link}</a>}
                    </div>
                  ))}
                  {form.projects.length < 4 && (
                    <div style={{ ...C.card, borderRadius: 12, padding: "16px", border: `1px dashed rgba(245,166,35,0.2)` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                        <input value={newProject.title} onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))} placeholder="Project title" style={{ borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
                        <input value={newProject.link} onChange={e => setNewProject(p => ({ ...p, link: e.target.value }))} placeholder="Link (optional)" style={{ borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
                      </div>
                      <input value={newProject.desc} onChange={e => setNewProject(p => ({ ...p, desc: e.target.value }))} placeholder="Short description..." style={{ width: "100%", borderRadius: 8, padding: "9px 12px", fontSize: 13, marginBottom: 10 }} />
                      <button onClick={() => { if (newProject.title) { update("projects", [...form.projects, newProject]); setNewProject({ title: "", desc: "", link: "" }); } }} style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 8, padding: "7px 16px", fontSize: 12, color: C.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <Plus size={12} /> Add Project
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {[["github", <Github size={16} />, "GitHub URL"], ["linkedin", <Linkedin size={16} />, "LinkedIn URL"], ["portfolio", <Globe size={16} />, "Portfolio URL"]].map(([k, icon, ph]) => (
                    <div key={k} style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }}>{icon}</div>
                      <input value={form[k]} onChange={e => update(k, e.target.value)} placeholder={ph} style={{ width: "100%", borderRadius: 10, padding: "10px 12px 10px 36px", fontSize: 12 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ animation: "fadeInUp 0.4s ease both" }}>
              <h2 className="playfair" style={{ fontSize: 26, fontWeight: 700, color: C.ivory, marginBottom: 6 }}>Experience</h2>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>Your professional journey, told well.</p>
              <div style={{ display: "grid", gap: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Work Experience</label>
                  {form.experience.map((e, i) => (
                    <div key={i} style={{ ...C.card, borderRadius: 12, padding: "14px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: C.ivory }}>{e.role} <span style={{ color: C.accent }}>@ {e.company}</span></div>
                        <div style={{ fontSize: 12, color: C.muted }}>{e.duration} · {e.desc}</div>
                      </div>
                      <button onClick={() => update("experience", form.experience.filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}><X size={14} /></button>
                    </div>
                  ))}
                  <div style={{ ...C.card, borderRadius: 12, padding: "16px", border: `1px dashed rgba(245,166,35,0.2)` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      <input value={newExp.company} onChange={e => setNewExp(x => ({ ...x, company: e.target.value }))} placeholder="Company name" style={{ borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
                      <input value={newExp.role} onChange={e => setNewExp(x => ({ ...x, role: e.target.value }))} placeholder="Your role" style={{ borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10, marginBottom: 10 }}>
                      <input value={newExp.duration} onChange={e => setNewExp(x => ({ ...x, duration: e.target.value }))} placeholder="e.g. 2021–2023" style={{ borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
                      <input value={newExp.desc} onChange={e => setNewExp(x => ({ ...x, desc: e.target.value }))} placeholder="Brief description..." style={{ borderRadius: 8, padding: "9px 12px", fontSize: 13 }} />
                    </div>
                    <button onClick={() => { if (newExp.company && newExp.role) { update("experience", [...form.experience, newExp]); setNewExp({ company: "", role: "", duration: "", desc: "" }); } }} style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 8, padding: "7px 16px", fontSize: 12, color: C.accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                      <Plus size={12} /> Add Experience
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Education</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    {[["degree", "Degree / Certification"], ["institution", "Institution"], ["year", "Graduation Year"]].map(([k, ph]) => (
                      <input key={k} value={form.education[k]} onChange={e => update("education", { ...form.education, [k]: e.target.value })} placeholder={ph} style={{ borderRadius: 10, padding: "10px 14px", fontSize: 13 }} />
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Years of Experience: <span style={{ color: C.accent }}>{form.yearsExp === 20 ? "20+" : form.yearsExp}</span></label>
                  <input type="range" min={0} max={20} value={form.yearsExp} onChange={e => update("yearsExp", parseInt(e.target.value))} className="range-input" style={{ width: "100%", background: `linear-gradient(to right, ${C.accent} ${form.yearsExp * 5}%, rgba(255,255,255,0.1) ${form.yearsExp * 5}%)` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted, marginTop: 4 }}>
                    <span>0 yrs</span><span>5</span><span>10</span><span>15</span><span>20+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div style={{ animation: "fadeInUp 0.4s ease both" }}>
              <h2 className="playfair" style={{ fontSize: 26, fontWeight: 700, color: C.ivory, marginBottom: 6 }}>Job Preferences</h2>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>Tell companies exactly what you want.</p>
              <div style={{ display: "grid", gap: 24 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Work Type</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Remote", "Hybrid", "On-site"].map(t => (
                      <button key={t} onClick={() => toggleArr("workType", t)} style={{ borderRadius: 30, padding: "8px 20px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: form.workType.includes(t) ? `linear-gradient(135deg, ${C.accent}, ${C.gold})` : "rgba(255,255,255,0.06)", color: form.workType.includes(t) ? "#0D0D0F" : C.muted, transition: "all 0.25s" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Employment Type</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Full-time", "Part-time", "Contract", "Freelance"].map(t => (
                      <button key={t} onClick={() => toggleArr("employmentType", t)} style={{ borderRadius: 30, padding: "8px 20px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", background: form.employmentType.includes(t) ? `linear-gradient(135deg, ${C.accent}, ${C.gold})` : "rgba(255,255,255,0.06)", color: form.employmentType.includes(t) ? "#0D0D0F" : C.muted, transition: "all 0.25s" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Expected Salary: <span style={{ color: C.accent }}>${(form.salaryMin / 1000).toFixed(0)}k – ${(form.salaryMax / 1000).toFixed(0)}k</span></label>
                  <div style={{ display: "grid", gap: 8 }}>
                    {[["salaryMin", 30000, 300000, "Min"], ["salaryMax", 30000, 500000, "Max"]].map(([k, mn, mx, label]) => (
                      <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 11, color: C.muted, minWidth: 28 }}>{label}</span>
                        <input type="range" min={mn} max={mx} step={5000} value={form[k]} onChange={e => update(k, parseInt(e.target.value))} className="range-input" style={{ flex: 1, background: `linear-gradient(to right, ${C.accent} ${((form[k] - mn) / (mx - mn)) * 100}%, rgba(255,255,255,0.1) ${((form[k] - mn) / (mx - mn)) * 100}%)` }} />
                        <span style={{ fontSize: 12, color: C.ivory, minWidth: 50, textAlign: "right" }}>${(form[k] / 1000).toFixed(0)}k</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Preferred Industries</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {INDUSTRIES.map(ind => (
                      <button key={ind} onClick={() => toggleArr("industries", ind)} style={{ borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 500, border: "1px solid", cursor: "pointer", transition: "all 0.2s", borderColor: form.industries.includes(ind) ? C.accent : "rgba(255,255,255,0.1)", background: form.industries.includes(ind) ? "rgba(245,166,35,0.15)" : "transparent", color: form.industries.includes(ind) ? C.accent : C.muted }}>
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Availability</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {AVAIL_OPTIONS.map(({ id, label }) => (
                      <label key={id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 16px", borderRadius: 10, border: `1px solid ${form.availability === id ? C.accent : "rgba(255,255,255,0.1)"}`, background: form.availability === id ? "rgba(245,166,35,0.1)" : "transparent", transition: "all 0.2s" }}>
                        <input type="radio" name="availability" value={id} checked={form.availability === id} onChange={() => update("availability", id)} style={{ accentColor: C.accent, width: 14, height: 14 }} />
                        <span style={{ fontSize: 13, color: form.availability === id ? C.accent : C.muted }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>Contact Preference</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                    {[["Email", <Mail size={14} />], ["Phone", <Phone size={14} />], ["LinkedIn", <Linkedin size={14} />]].map(([pref, icon]) => (
                      <label key={pref} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 16px", borderRadius: 10, border: `1px solid ${form.contactPref.includes(pref) ? C.accent : "rgba(255,255,255,0.1)"}`, background: form.contactPref.includes(pref) ? "rgba(245,166,35,0.1)" : "transparent", transition: "all 0.2s" }}>
                        <input type="checkbox" checked={form.contactPref.includes(pref)} onChange={() => toggleArr("contactPref", pref)} style={{ accentColor: C.accent }} />
                        {icon}
                        <span style={{ fontSize: 13, color: form.contactPref.includes(pref) ? C.accent : C.muted }}>{pref}</span>
                      </label>
                    ))}
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {form.contactPref.includes("Email") && <input value={form.email} onChange={e => update("email", e.target.value)} placeholder="Your email address" style={{ borderRadius: 10, padding: "10px 14px", fontSize: 13 }} />}
                    {form.contactPref.includes("Phone") && <input value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="Your phone number" style={{ borderRadius: 10, padding: "10px 14px", fontSize: 13 }} />}
                    {form.contactPref.includes("LinkedIn") && <input value={form.linkedinContact} onChange={e => update("linkedinContact", e.target.value)} placeholder="Your LinkedIn URL" style={{ borderRadius: 10, padding: "10px 14px", fontSize: 13 }} />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 - REVIEW */}
          {step === 5 && (
            <div style={{ animation: "fadeInUp 0.4s ease both" }}>
              <h2 className="playfair" style={{ fontSize: 26, fontWeight: 700, color: C.ivory, marginBottom: 6 }}>Review & Publish</h2>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>You look great. Ready to go live?</p>

              {/* Profile Preview Card */}
              <div style={{ ...C.card, borderRadius: 20, padding: 28, marginBottom: 24, border: `1px solid rgba(245,166,35,0.2)` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 20 }}>
                  {form.photo ? (
                    <img src={form.photo} alt="Profile" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `3px solid ${C.accent}40` }} onError={(e) => { e.target.style.display = "none"; }} />
                  ) : (
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(245,166,35,0.15)", border: `3px solid ${C.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, color: C.accent }}>
                      {form.name ? form.name.split(" ").map(w => w[0]).join("").slice(0, 2) : "?"}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div className="playfair" style={{ fontSize: 22, fontWeight: 700, color: C.ivory, marginBottom: 4 }}>{form.name || "Your Name"}</div>
                    <div style={{ fontSize: 14, color: C.muted, marginBottom: 6 }}>{form.headline || "Your Headline"}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      {form.city && <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={11} />{form.city}</span>}
                      {form.workType[0] && <Badge variant="amber">{form.workType[0]}</Badge>}
                      {form.availability && <Badge variant="green">{AVAIL_OPTIONS.find(a => a.id === form.availability)?.label || form.availability}</Badge>}
                    </div>
                  </div>
                </div>
                {form.bio && <p style={{ fontSize: 14, color: "#C8C0B0", lineHeight: 1.7, marginBottom: 16, borderLeft: `3px solid ${C.accent}40`, paddingLeft: 14 }}>{form.bio}</p>}
                {form.skills.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {form.skills.map(s => <SkillChip key={s} skill={s} />)}
                  </div>
                )}
                {form.experience.length > 0 && (
                  <div style={{ marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Experience</div>
                    {form.experience.slice(0, 2).map((e, i) => (
                      <div key={i} style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>
                        <span style={{ color: C.ivory, fontWeight: 500 }}>{e.role}</span> at <span style={{ color: C.accent }}>{e.company}</span> · {e.duration}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                  <span style={{ fontSize: 12, color: C.accent, background: "rgba(245,166,35,0.1)", padding: "4px 12px", borderRadius: 20, border: "1px solid rgba(245,166,35,0.2)" }}>
                    ${(form.salaryMin / 1000).toFixed(0)}k – ${(form.salaryMax / 1000).toFixed(0)}k
                  </span>
                  {form.employmentType.slice(0, 2).map(t => <Badge key={t}>{t}</Badge>)}
                </div>
              </div>

              <AmberBtn onClick={handlePublish} style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "14px" }}>
                <Zap size={18} /> Go Live — Publish My Profile
              </AmberBtn>
            </div>
          )}

          {/* Nav Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
            <GhostBtn onClick={() => setStep(s => Math.max(1, s - 1))} style={{ visibility: step === 1 ? "hidden" : "visible" }}>
              <ChevronLeft size={16} /> Back
            </GhostBtn>
            {step < 5 && (
              <AmberBtn onClick={() => setStep(s => Math.min(5, s + 1))}>
                Continue <ChevronRight size={16} />
              </AmberBtn>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── COMPANY FOLLOW SECTION ─────────────────────────────────────────────────────
function CompanyFollow({ followedCompanies, onToggleFollow }) {
  return (
    <div style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h3 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: C.ivory, marginBottom: 4 }}>Discover Companies</h3>
          <p style={{ fontSize: 13, color: C.muted }}>Follow companies to appear first in their searches</p>
        </div>
        {followedCompanies.size > 0 && (
          <div style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", borderRadius: 30, padding: "6px 14px", fontSize: 12, color: C.accent, display: "flex", alignItems: "center", gap: 6 }}>
            <Zap size={12} /> You'll appear first for {followedCompanies.size} compan{followedCompanies.size !== 1 ? "ies" : "y"}
          </div>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {COMPANIES.map(co => {
          const isFollowed = followedCompanies.has(co.id);
          return (
            <GlassCard key={co.id} style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${co.color}22`, border: `2px solid ${co.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: co.color }}>{co.logo}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: C.ivory }}>{co.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{co.industry} · {co.size}</div>
                  </div>
                </div>
                <button onClick={() => onToggleFollow(co.id)} style={{ width: 34, height: 34, borderRadius: "50%", background: isFollowed ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${isFollowed ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", animation: isFollowed ? "heartBeat 0.6s ease" : "none" }}>
                  <Heart size={14} fill={isFollowed ? "#EF4444" : "none"} color={isFollowed ? "#EF4444" : C.muted} />
                </button>
              </div>
              <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 10 }}>{co.blurb}</p>
              <div style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} />{co.location}</div>
              {isFollowed && (
                <div style={{ marginTop: 10, fontSize: 11, color: "#22C55E", display: "flex", alignItems: "center", gap: 4, background: "rgba(34,197,94,0.08)", borderRadius: 8, padding: "4px 8px" }}>
                  <Check size={10} /> Following · You'll appear first in their searches
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── SEEKER DASHBOARD ────────────────────────────────────────────────────────────
function SeekerDashboard({ profile, followedCompanies, onToggleFollow, onEdit }) {
  const completeness = Math.min(100, Math.round(
    (profile.name ? 15 : 0) + (profile.headline ? 15 : 0) + (profile.bio ? 15 : 0) +
    (profile.skills?.length > 0 ? 15 : 0) + (profile.experience?.length > 0 ? 20 : 0) +
    (profile.workType?.length > 0 ? 10 : 0) + (profile.contactPref?.length > 0 ? 10 : 0)
  ));
  const totalViews = SPARKLINE_DATA.reduce((a, d) => a + d.views, 0);
  const circumference = 2 * Math.PI * 38;
  const offset = circumference - (completeness / 100) * circumference;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingTop: 90, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, animation: "fadeInUp 0.4s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Avatar initials={profile.initials || "?"} color={profile.color || C.accent} size={64} />
            <div>
              <h1 className="playfair" style={{ fontSize: 28, fontWeight: 700, color: C.ivory, marginBottom: 4 }}>Welcome back, {profile.name?.split(" ")[0] || "Talent"}</h1>
              <p style={{ fontSize: 14, color: C.muted }}>{profile.headline || "Your profile is live"}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <GhostBtn onClick={onEdit} small><Edit3 size={14} /> Edit Profile</GhostBtn>
            <AmberBtn small style={{ background: "linear-gradient(135deg, #F5A623, #D4AF37)" }}>
              <Zap size={14} /> Boost Profile
            </AmberBtn>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32, animation: "fadeInUp 0.4s ease 0.1s both" }}>
          {/* Profile Completeness Ring */}
          <GlassCard style={{ textAlign: "center" }} hover={false}>
            <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 12px" }}>
              <svg width="96" height="96" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle cx="48" cy="48" r="38" fill="none" stroke={C.accent} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 48 48)" style={{ transition: "stroke-dashoffset 1s ease" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <span className="playfair" style={{ fontSize: 22, fontWeight: 700, color: C.accent }}>{completeness}%</span>
              </div>
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, color: C.ivory, marginBottom: 2 }}>Profile Score</div>
            <div style={{ fontSize: 11, color: completeness === 100 ? "#22C55E" : C.muted }}>{completeness === 100 ? "Complete!" : "Add more to rank higher"}</div>
          </GlassCard>

          {/* Views Chart */}
          <GlassCard hover={false}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Profile Views</div>
                <div className="playfair" style={{ fontSize: 32, fontWeight: 700, color: C.ivory }}>{totalViews}</div>
              </div>
              <div style={{ fontSize: 11, color: "#22C55E", background: "rgba(34,197,94,0.12)", borderRadius: 20, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                <TrendingUp size={10} /> +24%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={52}>
              <BarChart data={SPARKLINE_DATA} barSize={8}>
                <Bar dataKey="views" radius={[3, 3, 0, 0]}>
                  {SPARKLINE_DATA.map((_, i) => (
                    <Cell key={i} fill={i === SPARKLINE_DATA.length - 1 ? C.accent : "rgba(245,166,35,0.35)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Quick Stats */}
          <GlassCard hover={false}>
            {[
              { label: "Shortlisted By", val: "4", icon: <Heart size={14} /> },
              { label: "Companies Viewed", val: `${MOCK_VIEWS.length}`, icon: <Eye size={14} /> },
              { label: "Followed Companies", val: `${followedCompanies.size}`, icon: <Building size={14} /> },
            ].map(({ label, val, icon }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.muted }}>{icon}{label}</div>
                <span className="playfair" style={{ fontSize: 20, fontWeight: 700, color: C.accent }}>{val}</span>
              </div>
            ))}
          </GlassCard>

          <GlassCard hover={false}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Recent Viewers</div>
            {MOCK_VIEWS.map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${v.color}22`, border: `1px solid ${v.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: v.color }}>{v.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.ivory }}>{v.company}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{v.time}</div>
                </div>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Profile Live Banner */}
        <GlassCard style={{ marginBottom: 32, border: "1px solid rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.05)" }} hover={false}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 10px #22C55E", animation: "pulse-amber 2s infinite" }} />
            <div>
              <span style={{ color: "#22C55E", fontWeight: 600, fontSize: 14 }}>Your profile is live</span>
              <span style={{ color: C.muted, fontSize: 13, marginLeft: 8 }}>Companies can find and contact you right now.</span>
            </div>
            {followedCompanies.size > 0 && (
              <div style={{ marginLeft: "auto", fontSize: 12, color: C.accent, background: "rgba(245,166,35,0.1)", borderRadius: 20, padding: "5px 14px", border: "1px solid rgba(245,166,35,0.25)" }}>
                ⚡ You appear first for {followedCompanies.size} followed compan{followedCompanies.size !== 1 ? "ies" : "y"}
              </div>
            )}
          </div>
        </GlassCard>

        {/* Skills snapshot */}
        {profile.skills?.length > 0 && (
          <GlassCard style={{ marginBottom: 32 }} hover={false}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Your Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {profile.skills.map(s => <SkillChip key={s} skill={s} />)}
            </div>
          </GlassCard>
        )}

        {/* Company Follow Section */}
        <CompanyFollow followedCompanies={followedCompanies} onToggleFollow={onToggleFollow} />
      </div>
    </div>
  );
}

// ─── CANDIDATE CARD ─────────────────────────────────────────────────────────────
function CandidateCard({ profile, shortlisted, onShortlist, onClick, followedThisCompany }) {
  const availColor = profile.availability === "immediate" ? "#22C55E" : profile.availability === "not-looking" ? "#EF4444" : C.accent;
  return (
    <GlassCard onClick={onClick} style={{ cursor: "pointer", position: "relative", paddingBottom: 18 }}>
      {followedThisCompany && (
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 600, color: "#F87171", display: "flex", alignItems: "center", gap: 4 }}>
          <Heart size={9} fill="#F87171" /> Followed Us
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        <Avatar initials={profile.initials} color={profile.color} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.ivory, marginBottom: 2, fontFamily: "'Playfair Display', serif" }}>{profile.name}</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{profile.headline}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 3 }}><MapPin size={10} />{profile.location}</span>
        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, color: availColor, background: `${availColor}18`, borderRadius: 20, padding: "2px 8px", border: `1px solid ${availColor}40` }}>
          {AVAIL_OPTIONS.find(a => a.id === profile.availability)?.label || profile.availability || "Open"}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
        {profile.skills.slice(0, 3).map(s => <SkillChip key={s} skill={s} />)}
        {profile.skills.length > 3 && <span style={{ fontSize: 11, color: C.muted, padding: "3px 8px" }}>+{profile.skills.length - 3}</span>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Badge variant={profile.workType === "Remote" ? "blue" : "default"}>{profile.workType || "Flexible"}</Badge>
        <span style={{ fontSize: 11, color: C.muted }}>{profile.yearsExp}y exp</span>
        <button
          onClick={e => { e.stopPropagation(); onShortlist(profile.id); }}
          style={{ marginLeft: "auto", width: 30, height: 30, borderRadius: "50%", background: shortlisted ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${shortlisted ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.25s" }}
        >
          <Heart size={12} fill={shortlisted ? "#EF4444" : "none"} color={shortlisted ? "#EF4444" : C.muted} />
        </button>
      </div>
    </GlassCard>
  );
}

// ─── CANDIDATE MODAL ─────────────────────────────────────────────────────────────
function CandidateModal({ profile, shortlisted, onShortlist, onClose }) {
  if (!profile) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "flex-end" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: "min(520px, 95vw)", height: "100vh", ...C.card, background: "#13131A", borderLeft: `1px solid ${C.border}`, overflowY: "auto", animation: "slideInRight 0.35s ease", zIndex: 501, padding: 32 }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.muted }}>
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 24 }}>
          <Avatar initials={profile.initials} color={profile.color} size={72} />
          <div>
            <h2 className="playfair" style={{ fontSize: 24, fontWeight: 700, color: C.ivory, marginBottom: 4 }}>{profile.name}</h2>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, marginBottom: 8 }}>{profile.headline}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={10} />{profile.location}</span>
              <Badge variant={profile.workType === "Remote" ? "blue" : "default"}>{profile.workType}</Badge>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>About</div>
            <p style={{ fontSize: 14, color: "#C8C0B0", lineHeight: 1.75 }}>{profile.bio}</p>
          </div>
        )}

        {/* Skills */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Skills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {profile.skills.map(s => <SkillChip key={s} skill={s} />)}
          </div>
        </div>

        {/* Experience */}
        {profile.experience?.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Experience</div>
            {profile.experience.map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: i < profile.experience.length - 1 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, marginTop: 6, minWidth: 8 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.ivory }}>{e.role} <span style={{ color: C.accent }}>@ {e.company}</span></div>
                  <div style={{ fontSize: 12, color: C.muted }}>{e.duration}</div>
                  {e.desc && <div style={{ fontSize: 12, color: "#A0987A", marginTop: 4 }}>{e.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preferences */}
        <div style={{ ...C.card, borderRadius: 14, padding: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Preferences</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Salary Range</div><div style={{ fontSize: 13, color: C.ivory, fontWeight: 600 }}>${(profile.salaryMin / 1000).toFixed(0)}k–${(profile.salaryMax / 1000).toFixed(0)}k</div></div>
            <div><div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Availability</div><div style={{ fontSize: 13, color: C.ivory, fontWeight: 600 }}>{AVAIL_OPTIONS.find(a => a.id === profile.availability)?.label || profile.availability}</div></div>
            <div><div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Work Type</div><div style={{ fontSize: 13, color: C.ivory, fontWeight: 600 }}>{profile.workType}</div></div>
            <div><div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>Experience</div><div style={{ fontSize: 13, color: C.ivory, fontWeight: 600 }}>{profile.yearsExp}+ years</div></div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Contact</div>
          {profile.contactPref === "Email" && profile.email && (
            <a href={`mailto:${profile.email}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 10, background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", color: C.accent, textDecoration: "none", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              <Mail size={16} /> Send Email
            </a>
          )}
          {profile.contactPref === "Phone" && profile.phone && (
            <a href={`tel:${profile.phone}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 10, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22C55E", textDecoration: "none", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              <Phone size={16} /> Call Now
            </a>
          )}
          {profile.contactPref === "LinkedIn" && profile.linkedin && (
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderRadius: 10, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60A5FA", textDecoration: "none", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              <Linkedin size={16} /> View LinkedIn <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <AmberBtn onClick={() => onShortlist(profile.id)} style={{ flex: 1, justifyContent: "center", background: shortlisted ? "rgba(239,68,68,0.2)" : undefined, color: shortlisted ? "#EF4444" : undefined }}>
            <Heart size={16} fill={shortlisted ? "#EF4444" : "none"} />
            {shortlisted ? "Shortlisted" : "Shortlist"}
          </AmberBtn>
          <GhostBtn style={{ flex: 1, justifyContent: "center" }}>
            <X size={16} /> Not a Fit
          </GhostBtn>
        </div>
      </div>
    </div>
  );
}

// ─── COMPANY DASHBOARD ────────────────────────────────────────────────────────────
function CompanyDashboard({ allProfiles, shortlisted, onShortlist }) {
  const [search, setSearch] = useState("");
  const [filterSkills, setFilterSkills] = useState([]);
  const [filterWork, setFilterWork] = useState("");
  const [filterAvail, setFilterAvail] = useState("");
  const [filterExpMin, setFilterExpMin] = useState(0);
  const [filterExpMax, setFilterExpMax] = useState(20);
  const [filterSalMax, setFilterSalMax] = useState(300);
  const [followedOnly, setFollowedOnly] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [skillSearch, setSkillSearch] = useState("");
  const CURRENT_COMPANY_ID = "comp-1";

  const commonSkills = ["React", "Python", "TypeScript", "Node.js", "AWS", "Figma", "Go", "Kubernetes", "LLMs"];

  const filtered = allProfiles.filter(p => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.bio?.toLowerCase().includes(q) && !p.skills.some(s => s.toLowerCase().includes(q)) && !p.headline?.toLowerCase().includes(q)) return false;
    }
    if (filterSkills.length && !filterSkills.every(s => p.skills.includes(s))) return false;
    if (filterWork && p.workType !== filterWork) return false;
    if (filterAvail && p.availability !== filterAvail) return false;
    if (p.yearsExp < filterExpMin || p.yearsExp > filterExpMax) return false;
    if ((p.salaryMin / 1000) > filterSalMax) return false;
    if (followedOnly && !p.followedCompanies?.includes(CURRENT_COMPANY_ID)) return false;
    return true;
  }).sort((a, b) => {
    const aF = a.followedCompanies?.includes(CURRENT_COMPANY_ID) ? 1 : 0;
    const bF = b.followedCompanies?.includes(CURRENT_COMPANY_ID) ? 1 : 0;
    return bF - aF;
  });

  const clearFilters = () => { setSearch(""); setFilterSkills([]); setFilterWork(""); setFilterAvail(""); setFilterExpMin(0); setFilterExpMax(20); setFilterSalMax(300); setFollowedOnly(false); };
  const hasFilters = search || filterSkills.length || filterWork || filterAvail || filterExpMin > 0 || filterExpMax < 20 || filterSalMax < 300 || followedOnly;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingTop: 90 }}>
      <div style={{ display: "flex", maxWidth: 1400, margin: "0 auto", padding: "0 24px", gap: 24 }}>
        {/* SIDEBAR */}
        <aside style={{ width: 280, minWidth: 280, paddingTop: 24, paddingBottom: 40 }}>
          <div style={{ ...C.card, borderRadius: 18, padding: 22, position: "sticky", top: 90 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, color: C.ivory }}><Sliders size={16} style={{ color: C.accent }} />Filters</div>
              {hasFilters && <button onClick={clearFilters} style={{ fontSize: 11, color: C.accent, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><RefreshCw size={10} /> Reset</button>}
            </div>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: 18 }}>
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, skill, bio..." style={{ width: "100%", borderRadius: 10, padding: "10px 12px 10px 34px", fontSize: 13 }} />
            </div>

            {/* Followed Only */}
            <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: `1px solid ${followedOnly ? "rgba(245,166,35,0.4)" : "rgba(255,255,255,0.08)"}`, background: followedOnly ? "rgba(245,166,35,0.08)" : "transparent", cursor: "pointer", marginBottom: 18, transition: "all 0.2s" }}>
              <input type="checkbox" checked={followedOnly} onChange={e => setFollowedOnly(e.target.checked)} style={{ accentColor: C.accent }} />
              <Heart size={13} color={followedOnly ? "#EF4444" : C.muted} fill={followedOnly ? "#EF4444" : "none"} />
              <span style={{ fontSize: 12, fontWeight: 600, color: followedOnly ? C.accent : C.muted }}>Followed Us</span>
            </label>

            {/* Skills */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {commonSkills.map(s => (
                  <button key={s} onClick={() => setFilterSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} style={{ borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 600, border: "1px solid", cursor: "pointer", borderColor: filterSkills.includes(s) ? C.accent : "rgba(255,255,255,0.08)", background: filterSkills.includes(s) ? "rgba(245,166,35,0.15)" : "transparent", color: filterSkills.includes(s) ? C.accent : C.muted, transition: "all 0.2s" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Type */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Work Type</div>
              {["", "Remote", "Hybrid", "On-site"].map(t => (
                <label key={t || "any"} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer" }}>
                  <input type="radio" name="worktype" checked={filterWork === t} onChange={() => setFilterWork(t)} style={{ accentColor: C.accent }} />
                  <span style={{ fontSize: 12, color: filterWork === t ? C.ivory : C.muted }}>{t || "Any"}</span>
                </label>
              ))}
            </div>

            {/* Availability */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Availability</div>
              {[{ id: "", label: "Any" }, ...AVAIL_OPTIONS].map(({ id, label }) => (
                <label key={id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer" }}>
                  <input type="radio" name="avail" checked={filterAvail === id} onChange={() => setFilterAvail(id)} style={{ accentColor: C.accent }} />
                  <span style={{ fontSize: 12, color: filterAvail === id ? C.ivory : C.muted }}>{label}</span>
                </label>
              ))}
            </div>

            {/* Experience Range */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Experience: <span style={{ color: C.accent }}>{filterExpMin}–{filterExpMax === 20 ? "20+" : filterExpMax}y</span></div>
              {[["Min", filterExpMin, setFilterExpMin], ["Max", filterExpMax, setFilterExpMax]].map(([lbl, val, setter]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: C.muted, minWidth: 24 }}>{lbl}</span>
                  <input type="range" min={0} max={20} value={val} onChange={e => setter(parseInt(e.target.value))} className="range-input" style={{ flex: 1, background: `linear-gradient(to right, ${C.accent} ${val * 5}%, rgba(255,255,255,0.1) ${val * 5}%)` }} />
                  <span style={{ fontSize: 10, color: C.muted, minWidth: 24, textAlign: "right" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Max Salary */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Max Salary: <span style={{ color: C.accent }}>${filterSalMax}k</span></div>
              <input type="range" min={50} max={300} step={5} value={filterSalMax} onChange={e => setFilterSalMax(parseInt(e.target.value))} className="range-input" style={{ width: "100%", background: `linear-gradient(to right, ${C.accent} ${((filterSalMax - 50) / 250) * 100}%, rgba(255,255,255,0.1) ${((filterSalMax - 50) / 250) * 100}%)` }} />
            </div>
          </div>
        </aside>

        {/* MAIN GRID */}
        <main style={{ flex: 1, paddingTop: 24, paddingBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h1 className="playfair" style={{ fontSize: 30, fontWeight: 700, color: C.ivory, marginBottom: 4 }}>Discover Talent</h1>
              <p style={{ fontSize: 13, color: C.muted }}>{filtered.length} candidate{filtered.length !== 1 ? "s" : ""} found{hasFilters ? " (filtered)" : ""}</p>
            </div>
            {shortlisted.size > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "8px 16px", fontSize: 13, color: "#EF4444" }}>
                <Heart size={14} fill="#EF4444" /> {shortlisted.size} shortlisted
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
            {filtered.map(p => (
              <CandidateCard
                key={p.id}
                profile={p}
                shortlisted={shortlisted.has(p.id)}
                onShortlist={onShortlist}
                onClick={() => setSelectedProfile(p)}
                followedThisCompany={p.followedCompanies?.includes(CURRENT_COMPANY_ID)}
              />
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <h3 className="playfair" style={{ fontSize: 22, color: C.ivory, marginBottom: 8 }}>No candidates found</h3>
                <p style={{ color: C.muted, marginBottom: 20 }}>Try adjusting your filters or search terms</p>
                <GhostBtn onClick={clearFilters} style={{ margin: "0 auto" }}><RefreshCw size={14} /> Clear Filters</GhostBtn>
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedProfile && (
        <CandidateModal
          profile={selectedProfile}
          shortlisted={shortlisted.has(selectedProfile.id)}
          onShortlist={onShortlist}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState("seeker");
  const [view, setView] = useState("landing");
  const [seekerProfile, setSeekerProfile] = useState(null);
  const [followedCompanies, setFollowedCompanies] = useState(new Set());
  const [shortlisted, setShortlisted] = useState(new Set());

  // Inject styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_STYLES;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const handleProfileComplete = useCallback((profile) => {
    setSeekerProfile({ ...profile, followedCompanies: Array.from(followedCompanies) });
    setView("seeker-dashboard");
  }, [followedCompanies]);

  const handleToggleFollow = useCallback((companyId) => {
    setFollowedCompanies(prev => {
      const next = new Set(prev);
      if (next.has(companyId)) next.delete(companyId);
      else next.add(companyId);
      return next;
    });
  }, []);

  const handleShortlist = useCallback((profileId) => {
    setShortlisted(prev => {
      const next = new Set(prev);
      if (next.has(profileId)) next.delete(profileId);
      else next.add(profileId);
      return next;
    });
  }, []);

  // Merge created profile into searchable pool for company view
  const allProfiles = seekerProfile
    ? [...PROFILES, { ...seekerProfile, followedCompanies: Array.from(followedCompanies) }]
    : PROFILES;

  // Update seekerProfile's followedCompanies when they change
  const enrichedSeekerProfile = seekerProfile
    ? { ...seekerProfile, followedCompanies: Array.from(followedCompanies) }
    : null;

  return (
    <div style={{ background: "#0D0D0F", minHeight: "100vh" }}>
      <Navbar mode={mode} setMode={setMode} view={view} setView={setView} />

      {view === "landing" && <LandingPage setView={setView} />}
      {view === "create-profile" && (
        <ProfileCreation onComplete={handleProfileComplete} />
      )}
      {view === "seeker-dashboard" && (
        seekerProfile ? (
          <SeekerDashboard
            profile={enrichedSeekerProfile}
            followedCompanies={followedCompanies}
            onToggleFollow={handleToggleFollow}
            onEdit={() => setView("create-profile")}
          />
        ) : (
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, paddingTop: 70 }}>
            <div style={{ fontSize: 48 }}>👤</div>
            <h2 className="playfair" style={{ fontSize: 24, color: "#F5F0E8" }}>You haven't created a profile yet</h2>
            <AmberBtn onClick={() => setView("create-profile")}><Edit3 size={16} /> Create Your Profile</AmberBtn>
          </div>
        )
      )}
      {view === "company" && (
        <CompanyDashboard
          allProfiles={allProfiles}
          shortlisted={shortlisted}
          onShortlist={handleShortlist}
        />
      )}

      <ChatBot mode={mode} />
    </div>
  );
}