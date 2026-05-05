import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Tampilkan prompt selalu saat available tanpa cache/localStorage (Sesuai request)
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setIsVisible(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm w-full relative">
                {/* Header pattern/color */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-32 w-full absolute top-0 left-0" />
                
                <button 
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 p-2 rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="relative pt-20 px-8 pb-8 flex flex-col items-center text-center">
                    {/* Logo Box */}
                    <div className="bg-white p-4 rounded-2xl shadow-xl w-24 h-24 flex items-center justify-center mb-6">
                        <img 
                            src="https://lh3.googleusercontent.com/d/1n5CE1ey6jzlmYWZ1KLQOIjs7bBnxw3u8" 
                            alt="PINTAR Logo" 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Pasang PINTAR</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Nikmati pengalaman ujian yang lebih cepat, mulus, dan layar penuh (Fullscreen) langsung dari perangkatmu!
                    </p>

                    <button 
                        onClick={handleInstallClick}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2 animate-bounce hover:animate-none"
                    >
                        <Download size={20} />
                        <span>Install Sekarang</span>
                    </button>
                    
                    <button
                        onClick={handleDismiss}
                        className="mt-4 text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
                    >
                        Nanti Saja
                    </button>
                </div>
            </div>
        </div>
    );
};
