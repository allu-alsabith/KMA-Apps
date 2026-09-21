import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Smartphone, 
  ScanFace, 
  Columns, 
  Store,
  Wifi,
  Clock,
  QrCode,
  Download,
  Building2,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import { AppPortal, Company } from '../types';

interface NavigationHeaderProps {
  currentPortal: AppPortal;
  onSelectPortal: (portal: AppPortal) => void;
  liveTime: string;
  totalPunchesToday: number;
  onOpenInstallModal?: () => void;
  isFirebaseConnected?: boolean;
  activeCompany?: Company;
  companies?: Company[];
  onSelectCompany?: (companyId: string) => void;
  onOpenCreateCompany?: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentPortal,
  onSelectPortal,
  liveTime,
  totalPunchesToday,
  onOpenInstallModal,
  isFirebaseConnected = true,
  activeCompany,
  companies = [],
  onSelectCompany,
  onOpenCreateCompany,
}) => {
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const displaySupermarketName = activeCompany?.supermarketName?.trim() || 'KMA';
  const displayCompanyName = activeCompany?.name?.trim() || 'KMA Supermarket';

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3">
      {/* Liquid Glass Shell */}
      <div className="max-w-7xl mx-auto rounded-3xl liquid-glass px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl">
        
        {/* Brand & Market Identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5 relative">
            <div className="w-10 h-10 rounded-2xl liquid-glass-accent flex items-center justify-center text-emerald-400 shadow-inner">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {displaySupermarketName.toUpperCase()} SUPERMARKET
                </span>
                <button
                  id="btn-header-company-menu"
                  onClick={() => setShowCompanyDropdown(!showCompanyDropdown)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                  title="Switch Company or Add New Company"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCompanyDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <span>{displayCompanyName}</span>
                {activeCompany?.code && (
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-emerald-300 font-mono text-[10px]">
                    {activeCompany.code}
                  </span>
                )}
                {companies.length > 1 && (
                  <span className="text-[10px] text-amber-300/80">({companies.length} Co.)</span>
                )}
              </p>
            </div>

            {/* Quick Company Switcher Dropdown */}
            {showCompanyDropdown && (
              <div className="absolute top-12 left-0 z-50 w-72 liquid-glass-card rounded-2xl p-2.5 border border-white/20 shadow-2xl space-y-1.5 animate-scale-in">
                <div className="flex items-center justify-between px-2 py-1">
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Supermarket Companies ({companies.length})</span>
                  </p>
                  {onOpenCreateCompany && (
                    <button
                      onClick={() => {
                        onOpenCreateCompany();
                        setShowCompanyDropdown(false);
                      }}
                      className="text-[11px] text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer"
                      title="Add a new company"
                    >
                      <span>+ Add</span>
                    </button>
                  )}
                </div>

                <div className="max-h-56 overflow-y-auto space-y-1 pr-0.5">
                  {companies.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        if (onSelectCompany) onSelectCompany(c.id);
                        setShowCompanyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        activeCompany?.id === c.id
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-bold flex items-center gap-1.5">
                          <Store className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                          <span className="truncate">{c.supermarketName} Supermarket</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate pl-5">{c.name} &bull; <span className="text-amber-300 font-mono">{c.code}</span></div>
                      </div>
                      {activeCompany?.id === c.id ? (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400 text-slate-950 font-extrabold shrink-0">ACTIVE</span>
                      ) : (
                        <span className="text-[10px] text-slate-500 shrink-0">Switch</span>
                      )}
                    </button>
                  ))}
                </div>

                {onOpenCreateCompany && (
                  <button
                    onClick={() => {
                      onOpenCreateCompany();
                      setShowCompanyDropdown(false);
                    }}
                    className="w-full pt-2 border-t border-white/10 text-center text-xs text-amber-300 hover:text-amber-200 font-bold py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>+ Add New Company</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick status on mobile */}
          <div className="md:hidden flex items-center gap-2 text-xs">
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="px-2 py-1 rounded-xl liquid-pill text-[11px] text-emerald-300 font-semibold flex items-center gap-1"
                title="Download Standalone Apps for Android (APK) & iOS"
              >
                <Download className="w-3 h-3" />
                <span>APK / iOS</span>
              </button>
            )}
            <div className="flex items-center gap-1 font-mono text-emerald-400 text-xs">
              <Clock className="w-3 h-3" />
              <span>{liveTime}</span>
            </div>
          </div>
        </div>

        {/* Liquid Portal Switcher (3 Apps + Split View) */}
        <nav className="flex items-center gap-1 p-1 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 w-full md:w-auto overflow-x-auto">
          <button
            id="portal-btn-admin"
            onClick={() => onSelectPortal('ADMIN_PORTAL')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              currentPortal === 'ADMIN_PORTAL'
                ? 'bg-gradient-to-b from-white/20 to-white/5 text-white shadow-lg border border-white/25 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${currentPortal === 'ADMIN_PORTAL' ? 'text-emerald-400' : ''}`} />
            <span>Admin Portal</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/10 text-slate-300 hidden sm:inline-block">
              Desktop
            </span>
          </button>

          <button
            id="portal-btn-kiosk"
            onClick={() => onSelectPortal('KIOSK_FACE')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              currentPortal === 'KIOSK_FACE'
                ? 'bg-gradient-to-b from-emerald-500/30 to-emerald-500/10 text-emerald-300 shadow-lg border border-emerald-500/30 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ScanFace className={`w-4 h-4 ${currentPortal === 'KIOSK_FACE' ? 'text-emerald-400 animate-pulse' : ''}`} />
            <span>{displaySupermarketName} Face</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 hidden sm:inline-block">
              Kiosk Tablet
            </span>
          </button>

          <button
            id="portal-btn-employee"
            onClick={() => onSelectPortal('EMPLOYEE_APP')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              currentPortal === 'EMPLOYEE_APP'
                ? 'bg-gradient-to-b from-sky-500/30 to-sky-500/10 text-sky-300 shadow-lg border border-sky-500/30 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className={`w-4 h-4 ${currentPortal === 'EMPLOYEE_APP' ? 'text-sky-400' : ''}`} />
            <span>Staff App</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 hidden sm:inline-block">
              Mobile View
            </span>
          </button>

          <button
            id="portal-btn-apps-manager"
            onClick={() => onSelectPortal('APPS_MANAGER')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              currentPortal === 'APPS_MANAGER'
                ? 'bg-gradient-to-b from-amber-500/30 to-amber-500/10 text-amber-300 shadow-lg border border-amber-500/30 scale-[1.02]'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="Apps & Companies Provisioning Manager"
          >
            <LayoutGrid className={`w-4 h-4 ${currentPortal === 'APPS_MANAGER' ? 'text-amber-400' : ''}`} />
            <span>Apps Manager</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 hidden sm:inline-block">
              Companies &amp; Apps
            </span>
          </button>

          <button
            id="portal-btn-split"
            onClick={() => onSelectPortal('SPLIT_VIEW')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
              currentPortal === 'SPLIT_VIEW'
                ? 'bg-gradient-to-b from-purple-500/30 to-purple-500/10 text-purple-300 shadow-lg border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="Kiosk + Admin Real-Time Split Mode"
          >
            <Columns className="w-4 h-4" />
            <span className="hidden lg:inline">Live Split</span>
          </button>
        </nav>

        {/* Live System Indicator & Install Button */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Firebase Real-Time Cloud Sync Badge */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold"
            title="Firebase Firestore real-time cloud database connected"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isFirebaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span>Firebase Cloud</span>
          </div>

          {onOpenInstallModal && (
            <button
              id="btn-header-install-phone"
              onClick={onOpenInstallModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-button bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-emerald-300 hover:text-white border border-emerald-400/30 text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
              title="Download Standalone APK / iOS Packages for each app"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download Apps (APK / iOS)</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-pill text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-slate-200 text-[11px]">{liveTime}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-[11px]">
              <strong className="text-emerald-400 font-semibold">{totalPunchesToday}</strong> logs
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
