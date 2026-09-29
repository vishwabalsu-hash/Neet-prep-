import React from 'react';
import { Wifi, WifiOff, Download, CheckCircle2, HardDrive, ShieldCheck, X, RefreshCw } from 'lucide-react';
import { OfflinePackage } from '../services/offlineStorage';

interface OfflineModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  packages: OfflinePackage[];
  onTogglePackage: (id: string) => void;
}

export const OfflineModal: React.FC<OfflineModalProps> = ({
  isOpen,
  onClose,
  isOfflineMode,
  onToggleOfflineMode,
  packages,
  onTogglePackage,
}) => {
  if (!isOpen) return null;

  const totalDownloadedMb = packages
    .filter(p => p.downloaded)
    .reduce((acc, p) => acc + p.sizeMb, 0)
    .toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Offline Study & Downloads Manager</h3>
              <p className="text-xs text-slate-400">Study for NEET without internet interruptions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline Mode Toggle Bar */}
        <div className="p-5 border-b border-slate-800 bg-slate-800/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOfflineMode ? (
                <WifiOff className="w-5 h-5 text-amber-400" />
              ) : (
                <Wifi className="w-5 h-5 text-emerald-400" />
              )}
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  {isOfflineMode ? 'Simulated Offline Mode: ACTIVE' : 'Network Mode: ONLINE'}
                </p>
                <p className="text-xs text-slate-400">
                  {isOfflineMode 
                    ? 'Using locally cached 30k+ questions, mock tests, and NCERT chapters.'
                    : 'Real-time syncing enabled with mentor servers.'}
                </p>
              </div>
            </div>
            <button
              onClick={onToggleOfflineMode}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isOfflineMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              {isOfflineMode ? 'Switch to Online' : 'Go Offline'}
            </button>
          </div>
        </div>

        {/* Downloaded Storage Summary */}
        <div className="px-5 py-4 bg-slate-950/40 flex items-center justify-between border-b border-slate-800/60 text-xs">
          <span className="text-slate-400">
            Total Cached Locally: <strong className="text-emerald-400">{totalDownloadedMb} MB</strong>
          </span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>IndexedDB & LocalStorage Safe</span>
          </div>
        </div>

        {/* Packages List */}
        <div className="p-5 space-y-3 max-h-80 overflow-y-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                pkg.downloaded
                  ? 'bg-slate-800/40 border-slate-700/60'
                  : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex-1 pr-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-200">{pkg.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {pkg.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{pkg.sizeMb} MB</span>
                  <span>&bull;</span>
                  <span>{pkg.itemCount.toLocaleString()} Questions/Units</span>
                  {pkg.downloaded && pkg.downloadedAt && (
                    <>
                      <span>&bull;</span>
                      <span className="text-emerald-400/80">Saved {pkg.downloadedAt}</span>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => onTogglePackage(pkg.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  pkg.downloaded
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {pkg.downloaded ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Mocks & results sync automatically when back online</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
