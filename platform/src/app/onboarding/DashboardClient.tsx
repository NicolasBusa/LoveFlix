'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteSite } from './actions';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, QrCode, Trash2, X, Download, Share2, Loader2, Check, ExternalLink } from 'lucide-react';

interface Site {
  id: string;
  slug: string;
  created_at: string;
  access_token?: string;
}

export default function DashboardClient({ initialSites }: { initialSites: Site[] }) {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // States for Modals
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [activeSite, setActiveSite] = useState<Site | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  // Delete State
  const [password, setPassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Use the window origin for full URLs
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopy = (site: Site) => {
    const tokenParams = site.access_token ? `?token=${site.access_token}` : '';
    const url = `${origin}/sites/${site.slug}${tokenParams}`;
    navigator.clipboard.writeText(url);
    setCopiedId(site.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openQrModal = (site: Site) => {
    setActiveSite(site);
    setQrModalOpen(true);
  };

  const openDeleteModal = (site: Site) => {
    setActiveSite(site);
    setPassword('');
    setDeleteError('');
    setDeleteModalOpen(true);
  };

  const handleDownloadQr = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qrcode-${activeSite?.slug}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleNativeShare = async () => {
    if (activeSite && navigator.share) {
      try {
        const tokenParams = activeSite.access_token ? `?token=${activeSite.access_token}` : '';
        await navigator.share({
          title: 'Meu Presente',
          text: 'Veja o nosso site surpresa!',
          url: `${origin}/sites/${activeSite.slug}${tokenParams}`,
        });
      } catch (err) {
        console.log('Compartilhamento cancelado ou falhou', err);
      }
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSite) return;
    
    setDeleting(true);
    setDeleteError('');

    const result = await deleteSite(activeSite.id, password);

    if (result.success) {
      setSites(sites.filter(s => s.id !== activeSite.id));
      setDeleteModalOpen(false);
    } else {
      setDeleteError(result.error || 'Erro ao excluir o site.');
    }
    
    setDeleting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 p-6 md:p-12 pt-28 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meus Presentes</h1>
            <p className="text-neutral-400">Gerencie todos os sites surpresa que você já criou.</p>
          </div>
          <Link 
            href="/builder" 
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-full transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] inline-block"
          >
            + Criar Novo
          </Link>
        </div>

        {sites.length === 0 ? (
          <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Nenhum presente ainda</h2>
            <p className="text-neutral-400 mb-6">Você ainda não criou nenhum site surpresa. Comece agora!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sites.map((site) => (
              <div key={site.id} className="bg-neutral-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-white/20 transition-all group flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold truncate pr-4">/sites/{site.slug}</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      Criado em {new Date(site.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <button 
                    onClick={() => openDeleteModal(site)}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Excluir Site"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <a 
                    href={`/sites/${site.slug}${site.access_token ? `?token=${site.access_token}` : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-medium transition-colors"
                  >
                    <ExternalLink size={16}/> Ver Site
                  </a>
                  <button 
                    onClick={() => handleCopy(site)}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-medium transition-colors"
                  >
                    {copiedId === site.id ? <><Check size={16} className="text-green-400"/> Copiado</> : <><Copy size={16}/> Copiar Link</>}
                  </button>
                  <button 
                    onClick={() => openQrModal(site)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-700 rounded-xl text-sm font-medium transition-all shadow-[0_0_10px_rgba(225,29,72,0.2)] mt-1"
                  >
                    <QrCode size={16}/> Ver QR Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal do QR Code */}
        {qrModalOpen && activeSite && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-sm w-full relative animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setQrModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-black/50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="text-center mb-6 mt-2">
                <h3 className="text-xl font-bold">Compartilhar Presente</h3>
                <p className="text-sm text-neutral-400 mt-1">/sites/{activeSite.slug}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl flex justify-center items-center mb-6 w-max mx-auto shadow-xl">
                <QRCodeSVG 
                  id="qr-code-svg"
                  value={`${origin}/sites/${activeSite.slug}${activeSite.access_token ? `?token=${activeSite.access_token}` : ''}`} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleDownloadQr}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-medium transition-colors"
                >
                  <Download size={18} /> Baixar QR Code
                </button>
                
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button 
                    onClick={handleNativeShare}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Share2 size={18} /> Compartilhar Link
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Exclusão (com validação de senha) */}
        {deleteModalOpen && activeSite && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-neutral-900 border border-red-500/30 rounded-3xl p-6 md:p-8 max-w-sm w-full relative shadow-[0_0_40px_rgba(239,68,68,0.1)]">
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mb-6 mt-2">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Excluir Site?</h3>
                <p className="text-sm text-neutral-400">
                  Esta ação é irreversível. Todas as fotos e mensagens atreladas a <strong>/sites/{activeSite.slug}</strong> serão perdidas.
                </p>
              </div>

              {deleteError && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">
                  {deleteError}
                </div>
              )}

              <form onSubmit={handleDelete} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300 ml-1">Confirme sua senha para excluir</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha de login"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-red-500/50 transition-all text-white placeholder:text-neutral-600"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setDeleteModalOpen(false)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    disabled={deleting || !password}
                    className="flex-1 flex justify-center items-center gap-2 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-xl font-medium transition-colors text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  >
                    {deleting ? <Loader2 size={18} className="animate-spin" /> : 'Sim, excluir'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
