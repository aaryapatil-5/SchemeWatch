import React, { useMemo, useState } from "react";
import {
  AlertTriangle, BarChart3, Bell, CheckCircle2, ChevronRight,
  CircleDollarSign, ClipboardCheck, Clock3, FileSearch, Filter,
  LayoutDashboard, Map, Menu, Search, Settings, ShieldAlert,
  SlidersHorizontal, Users, X, RefreshCw
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie,
  PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { stats, anomalies, works, districtData, monthlyFlags, typeBreakdown } from "./data/mockData";

const money = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function Badge({ children, tone = "gray" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function StatCard({ title, value, subtitle, icon: Icon, tone }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={21} /></div>
      <div className="stat-copy">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  const items = [
    ["dashboard", "Dashboard", LayoutDashboard],
    ["anomalies", "Anomaly Review", ShieldAlert],
    ["works", "Works Explorer", FileSearch],
    ["districts", "District Analysis", Map],
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><ShieldAlert size={22} /></div>
        <div>
          <div className="brand-name">SchemeWatch</div>
          <div className="brand-sub">Public Works Review</div>
        </div>
        <button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={20}/></button>
      </div>

      <div className="nav-label">WORKSPACE</div>
      <nav>
        {items.map(([key, label, Icon]) => (
          <button
            key={key}
            className={`nav-item ${page === key ? "active" : ""}`}
            onClick={() => { setPage(key); setMobileOpen(false); }}
          >
            <Icon size={18} />
            <span>{label}</span>
            {key === "anomalies" && <span className="nav-count">186</span>}
          </button>
        ))}
      </nav>

      <div className="nav-label secondary">SYSTEM</div>
      <nav>
        <button className="nav-item"><Bell size={18}/><span>Notifications</span><span className="dot"></span></button>
        <button className="nav-item"><Settings size={18}/><span>Settings</span></button>
      </nav>

      <div className="sidebar-footer">
        <div className="reviewer-avatar">AR</div>
        <div className="reviewer-info">
          <strong>Audit Reviewer</strong>
          <span>Reviewer workspace</span>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ page, setMobileOpen }) {
  const titles = {
    dashboard: ["Dashboard", "Scheme-wide anomaly overview"],
    anomalies: ["Anomaly Review", "Review and explain detected outliers"],
    works: ["Works Explorer", "Search published scheme works"],
    districts: ["District Analysis", "Compare utilisation and completion patterns"],
  };
  const [title, sub] = titles[page];

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={() => setMobileOpen(true)}><Menu size={22}/></button>
      <div>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <div className="topbar-actions">
        <div className="data-status"><span></span> Static demo data</div>
        <button className="icon-btn"><Bell size={19}/><i></i></button>
      </div>
    </header>
  );
}

function Dashboard({ setPage, selectAnomaly }) {
  return (
    <>
      <div className="page-head">
        <div>
          <h2>Scheme overview</h2>
          <p>Outlier detection across published works data. Flags require human review.</p>
        </div>
        <button className="secondary-btn" onClick={() => setPage("anomalies")}><FileSearch size={16}/> Review flags</button>
      </div>

      <div className="stats-grid">
        <StatCard title="Published works" value={stats.totalWorks.toLocaleString("en-IN")} subtitle="Across monitored districts" icon={ClipboardCheck} tone="blue"/>
        <StatCard title="Anomalies flagged" value={stats.flaggedWorks} subtitle="1.45% of published works" icon={ShieldAlert} tone="red"/>
        <StatCard title="Execution stalls" value={stats.stalledWorks} subtitle="Long-running / no progress" icon={Clock3} tone="amber"/>
        <StatCard title="Reviewed" value={stats.reviewed} subtitle="60.2% of current queue" icon={CheckCircle2} tone="green"/>
      </div>

      <div className="dashboard-grid">
        <div className="panel large">
          <div className="panel-head">
            <div><h3>Flags detected over time</h3><span>Monthly anomaly volume</span></div>
            <Badge tone="blue">Apr–Sep 2026</Badge>
          </div>
          <div className="chart-wrap"><ResponsiveContainer width="100%" height={270}>
            <AreaChart data={monthlyFlags}>
              <defs><linearGradient id="fillFlags" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopOpacity={0.22}/><stop offset="95%" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="#e7edf4"/>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"#718096",fontSize:12}}/>
              <YAxis axisLine={false} tickLine={false} tick={{fill:"#718096",fontSize:12}}/>
              <Tooltip contentStyle={{borderRadius:10,border:"1px solid #e4eaf1",boxShadow:"0 8px 24px rgba(15,23,42,.08)"}}/>
              <Area type="monotone" dataKey="flags" stroke="#2563eb" strokeWidth={3} fill="url(#fillFlags)" />
            </AreaChart>
          </ResponsiveContainer></div>
        </div>

        <div className="panel">
          <div className="panel-head"><div><h3>Flag composition</h3><span>By detection pattern</span></div></div>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={typeBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={78} paddingAngle={3}>
                  {typeBreakdown.map((_, i) => <Cell key={i} fill={["#2563eb","#7c3aed","#f59e0b","#0f766e"][i]} />)}
                </Pie>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center"><strong>186</strong><span>flags</span></div>
          </div>
          <div className="legend">
            {typeBreakdown.map((x,i)=><div key={x.name}><span className={`legend-dot c${i}`}></span>{x.name}<strong>{x.value}</strong></div>)}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div><h3>Priority review queue</h3><span>Recent anomalies requiring attention</span></div>
          <button className="text-btn" onClick={() => setPage("anomalies")}>View all <ChevronRight size={15}/></button>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>Work</th><th>Type</th><th>District</th><th>Signal</th><th>Severity</th><th></th></tr></thead>
            <tbody>
              {anomalies.slice(0,5).map(a=>(
                <tr key={a.id} onClick={()=>selectAnomaly(a)} className="click-row">
                  <td><div className="work-cell"><strong>{a.work}</strong><span>{a.id} · {a.date}</span></div></td>
                  <td><Badge tone={a.type === "Cost Outlier" ? "red" : a.type === "Execution Stall" ? "amber" : "purple"}>{a.type}</Badge></td>
                  <td>{a.district}</td>
                  <td className="signal">{a.deviation}</td>
                  <td><Badge tone={a.severity === "High" ? "red" : "amber"}>{a.severity}</Badge></td>
                  <td><ChevronRight size={16} className="muted"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Anomalies({ selectAnomaly, selected, setSelected }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => anomalies.filter(a => {
    const q = query.toLowerCase();
    return (!q || `${a.work} ${a.district} ${a.id}`.toLowerCase().includes(q))
      && (type === "All" || a.type === type)
      && (severity === "All" || a.severity === severity)
      && (status === "All" || a.status === status);
  }), [query,type,severity,status]);

  return (
    <>
      <div className="page-head">
        <div><h2>Detected anomalies</h2><p>Each flag is an outlier signal, not a finding of fraud.</p></div>
        <button className="secondary-btn"><RefreshCw size={16}/> Refresh dataset</button>
      </div>
      <div className="notice"><AlertTriangle size={18}/><div><strong>Interpretation rule:</strong> An anomaly means the observed pattern differs from its comparison group. Reviewers determine whether the underlying record requires action.</div></div>

      <div className="filter-bar">
        <div className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search work, district or ID..."/></div>
        <div className="select"><SlidersHorizontal size={15}/><select value={type} onChange={e=>setType(e.target.value)}><option>All</option><option>Cost Outlier</option><option>Potential Duplicate</option><option>Execution Stall</option><option>Utilisation Pattern</option></select></div>
        <select className="plain-select" value={severity} onChange={e=>setSeverity(e.target.value)}><option>All</option><option>High</option><option>Medium</option></select>
        <select className="plain-select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Pending Review</option><option>Needs Investigation</option><option>Reviewed</option></select>
      </div>

      <div className="panel">
        <div className="table-scroll">
          <table>
            <thead><tr><th>ID</th><th>Work</th><th>Detection</th><th>District</th><th>Signal</th><th>Confidence</th><th>Severity</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(a=>(
                <tr key={a.id} className="click-row" onClick={()=>selectAnomaly(a)}>
                  <td className="mono">{a.id}</td>
                  <td><div className="work-cell"><strong>{a.work}</strong><span>{a.agency}</span></div></td>
                  <td><Badge tone={a.type==="Cost Outlier"?"red":a.type==="Execution Stall"?"amber":"purple"}>{a.type}</Badge></td>
                  <td>{a.district}</td><td className="signal">{a.deviation}</td><td>{a.confidence}%</td>
                  <td><Badge tone={a.severity==="High"?"red":"amber"}>{a.severity}</Badge></td>
                  <td><Badge tone={a.status==="Reviewed"?"green":a.status==="Needs Investigation"?"amber":"blue"}>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 && <div className="empty">No anomalies match your filters.</div>}
        </div>
      </div>

      {selected && <DetailDrawer anomaly={selected} onClose={()=>setSelected(null)}/>}
    </>
  );
}

function DetailDrawer({ anomaly, onClose }) {
  const [reviewed, setReviewed] = useState(anomaly.status === "Reviewed");
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={e=>e.stopPropagation()}>
        <div className="drawer-head"><div><span className="eyebrow">{anomaly.id}</span><h2>{anomaly.type}</h2></div><button className="icon-btn" onClick={onClose}><X size={20}/></button></div>
        <div className="drawer-body">
          <div className="drawer-work"><div className="work-icon"><FileSearch size={20}/></div><div><strong>{anomaly.work}</strong><span>{anomaly.district} · {anomaly.agency}</span></div></div>
          <div className="reason-card"><div className="reason-title"><ShieldAlert size={17}/> Why was this flagged?</div><p>{anomaly.reason}</p></div>
          <div className="detail-section"><h4>Comparison evidence</h4><div className="evidence-list">{anomaly.evidence.map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div></div>
          <div className="detail-section"><h4>Detection signal</h4><div className="confidence"><div><span>Detection confidence</span><strong>{anomaly.confidence}%</strong></div><div className="progress"><span style={{width:`${anomaly.confidence}%`}}></span></div></div></div>
          <div className="review-note"><ClipboardCheck size={17}/><span>Use this panel to record a human review outcome. The anomaly itself is not a fraud determination.</span></div>
        </div>
        <div className="drawer-footer">
          <button className="secondary-btn" onClick={onClose}>Close</button>
          <button className={`primary-btn ${reviewed ? "done" : ""}`} onClick={()=>setReviewed(true)}>{reviewed ? <><CheckCircle2 size={16}/> Reviewed</> : <><ClipboardCheck size={16}/> Mark as reviewed</>}</button>
        </div>
      </aside>
    </div>
  );
}

function Works() {
  const [query,setQuery]=useState("");
  const [district,setDistrict]=useState("All");
  const [status,setStatus]=useState("All");
  const filtered=works.filter(w=>{
    const q=query.toLowerCase();
    return (!q||`${w.name} ${w.id} ${w.agency}`.toLowerCase().includes(q))
      && (district==="All"||w.district===district)
      && (status==="All"||w.status===status);
  });
  return (
    <>
      <div className="page-head"><div><h2>Published works</h2><p>Static demonstration dataset for the scheme's published works.</p></div><button className="secondary-btn"><Filter size={16}/> Filters</button></div>
      <div className="filter-bar">
        <div className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search works..."/></div>
        <select className="plain-select" value={district} onChange={e=>setDistrict(e.target.value)}><option>All</option>{[...new Set(works.map(w=>w.district))].map(d=><option key={d}>{d}</option>)}</select>
        <select className="plain-select" value={status} onChange={e=>setStatus(e.target.value)}><option>All</option><option>Flagged</option><option>Stalled</option><option>Normal</option><option>Completed</option><option>Reviewed</option></select>
      </div>
      <div className="panel"><div className="table-scroll"><table><thead><tr><th>Work ID</th><th>Work</th><th>District</th><th>Agency</th><th>Cost</th><th>Progress</th><th>Status</th></tr></thead><tbody>
        {filtered.map(w=><tr key={w.id}><td className="mono">{w.id}</td><td><strong>{w.name}</strong></td><td>{w.district}</td><td>{w.agency}</td><td>{money(w.cost)}</td><td><div className="mini-progress"><span style={{width:`${w.progress}%`}}></span></div><small>{w.progress}%</small></td><td><Badge tone={w.status==="Flagged"||w.status==="Stalled"?"red":w.status==="Completed"?"green":"gray"}>{w.status}</Badge></td></tr>)}
      </tbody></table></div></div>
    </>
  );
}

function Districts() {
  return (
    <>
      <div className="page-head"><div><h2>District analysis</h2><p>Peer comparison of utilisation and completion behaviour.</p></div><Badge tone="blue">6 districts shown</Badge></div>
      <div className="dashboard-grid">
        <div className="panel large"><div className="panel-head"><div><h3>Utilisation vs completion</h3><span>Percentage of funded works</span></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height={310}><BarChart data={districtData} margin={{top:10,right:10,left:0,bottom:10}}><CartesianGrid vertical={false} stroke="#e7edf4"/><XAxis dataKey="district" axisLine={false} tickLine={false} tick={{fill:"#718096",fontSize:11}}/><YAxis domain={[0,100]} axisLine={false} tickLine={false} tick={{fill:"#718096",fontSize:11}}/><Tooltip/><Bar dataKey="utilisation" name="Utilisation" fill="#2563eb" radius={[5,5,0,0]}/><Bar dataKey="completion" name="Completion" fill="#0f766e" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></div>
        <div className="panel"><div className="panel-head"><div><h3>Peer signals</h3><span>Relative comparison</span></div></div><div className="peer-list">{districtData.map(d=><div className="peer-row" key={d.district}><div><strong>{d.district}</strong><span>{d.works.toLocaleString()} works</span></div><div className={d.utilisation<65?"peer-alert":"peer-ok"}>{d.utilisation}%</div></div>)}</div></div>
      </div>
      <div className="panel"><div className="panel-head"><div><h3>District comparison table</h3><span>Signals are relative to peer districts, not accusations</span></div></div><div className="table-scroll"><table><thead><tr><th>District</th><th>Published works</th><th>Utilisation</th><th>Completion</th><th>Peer signal</th></tr></thead><tbody>{districtData.map(d=><tr key={d.district}><td><strong>{d.district}</strong></td><td>{d.works.toLocaleString()}</td><td>{d.utilisation}%</td><td>{d.completion}%</td><td>{d.utilisation<65?<Badge tone="amber">Below peer range</Badge>:<Badge tone="green">Within peer range</Badge>}</td></tr>)}</tbody></table></div></div>
    </>
  );
}

export default function App() {
  const [page,setPage]=useState("dashboard");
  const [mobileOpen,setMobileOpen]=useState(false);
  const [selected,setSelected]=useState(null);

  const selectAnomaly=(a)=>{setSelected(a); if(page!=="anomalies") setPage("anomalies");};

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <main className="main">
        <Topbar page={page} setMobileOpen={setMobileOpen}/>
        <div className="content">
          {page==="dashboard" && <Dashboard setPage={setPage} selectAnomaly={selectAnomaly}/>}
          {page==="anomalies" && <Anomalies selectAnomaly={selectAnomaly} selected={selected} setSelected={setSelected}/>}
          {page==="works" && <Works/>}
          {page==="districts" && <Districts/>}
        </div>
      </main>
    </div>
  );
}