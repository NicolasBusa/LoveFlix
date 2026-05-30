'use client';

import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Cropper from 'react-easy-crop';
import { Camera, Check, Upload, X } from 'lucide-react';
import { getCroppedImg } from '@/utils/cropImage';

interface PhotoUploaderProps {
  src: string | null;
  onUpload: (blob: Blob) => Promise<string | null>;
  aspectRatio?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  disabled?: boolean;
  isCircular?: boolean;
}

export default function PhotoUploader({
  src,
  onUpload,
  aspectRatio = 16 / 9,
  label = "Upload Foto",
  sublabel,
  className = "",
  disabled = false,
  isCircular = false
}: PhotoUploaderProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = URL.createObjectURL(file);
      setImageSrc(imageDataUrl);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImageBlob) {
        await onUpload(croppedImageBlob);
        setImageSrc(null); // Clear cropper to show final image
      }
    } catch (e) {
      console.error(e);
      alert('Erro ao cortar imagem');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
  };

  if (imageSrc) {
    const modalContent = (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8">
        <div className="relative w-full max-w-lg h-[75vh] bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="relative flex-1 bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              cropShape={isCircular ? "round" : "rect"}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="p-4 sm:p-5 bg-neutral-950 border-t border-white/10 flex gap-3">
            <button 
              type="button"
              onClick={handleCancelCrop} 
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 bg-neutral-800 text-white rounded-2xl hover:bg-neutral-700 disabled:opacity-50 font-medium transition-colors"
            >
              <X size={18} /> Cancelar
            </button>
            <button 
              type="button"
              onClick={handleConfirmCrop} 
              disabled={isProcessing}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 disabled:opacity-50 font-semibold transition-colors"
            >
              {isProcessing ? 'Salvando...' : <><Check size={18} /> Confirmar</>}
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <div className={`relative bg-neutral-800 flex items-center justify-center border border-white/10 ${isCircular ? 'rounded-full' : 'rounded-lg'} ${className}`}>
           <span className="text-sm text-neutral-500 animate-pulse">Recortando...</span>
        </div>
        {typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent}
      </>
    );
  }

  return (
    <div className={`relative bg-neutral-800 flex items-center justify-center border-2 border-dashed border-white/20 hover:border-red-500/50 transition-colors group overflow-hidden ${isCircular ? 'rounded-full' : 'rounded-lg'} ${className}`}>
      {src ? (
        <>
          <img src={src} alt="Uploaded" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <label className="relative cursor-pointer flex items-center gap-2 text-white bg-white/20 backdrop-blur px-4 py-2 rounded-full hover:bg-white/30 text-sm overflow-hidden">
              <Camera size={16} /> Trocar Foto
              <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onFileChange} disabled={disabled} />
            </label>
          </div>
        </>
      ) : (
        <label className="cursor-pointer flex flex-col items-center gap-2 text-neutral-500 hover:text-white absolute inset-0 justify-center">
          <Upload size={24} />
          <span className="text-sm font-medium">{label}</span>
          {sublabel && <span className="text-xs text-center max-w-[80%] text-neutral-600">{sublabel}</span>}
          <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={onFileChange} disabled={disabled} />
        </label>
      )}
    </div>
  );
}
