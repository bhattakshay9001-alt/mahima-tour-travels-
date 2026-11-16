import React, { useState, useRef, useEffect } from 'react';
import { Lock, ShieldCheck, X, AlertCircle, KeyRound, ArrowRight } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen) {
      setPinDigits(['', '', '', '']);
      setErrorMsg('');
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const verifyPin = (enteredPin: string) => {
    if (enteredPin === '9928') {
      setErrorMsg('');
      onSuccess();
    } else {
      setErrorMsg('Incorrect Security PIN. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPinDigits(['', '', '', '']);
      inputRefs[0].current?.focus();
    }
  };

  const handleDigitChange = (index: number, val: string) => {
    const char = val.slice(-1).replace(/[^0-9]/g, '');
    const nextDigits = [...pinDigits];
    nextDigits[index] = char;
    setPinDigits(nextDigits);
    setErrorMsg('');

    if (char && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    const fullCode = nextDigits.join('');
    if (fullCode.length === 4) {
      verifyPin(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
    if (!pasted) return;

    const nextDigits = ['', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      nextDigits[i] = pasted[i];
    }
    setPinDigits(nextDigits);

    if (pasted.length === 4) {
      verifyPin(pasted);
    } else if (pasted.length < 4) {
      inputRefs[pasted.length].current?.focus();
    }
  };

  const handleNumPadClick = (num: string) => {
    const nextIndex = pinDigits.findIndex((d) => d === '');
    if (nextIndex === -1) return;

    const nextDigits = [...pinDigits];
    nextDigits[nextIndex] = num;
    setPinDigits(nextDigits);
    setErrorMsg('');

    if (nextIndex < 3) {
      inputRefs[nextIndex + 1].current?.focus();
    }

    const fullCode = nextDigits.join('');
    if (fullCode.length === 4) {
      verifyPin(fullCode);
    }
  };

  const handleBackspacePad = () => {
    for (let i = 3; i >= 0; i--) {
      if (pinDigits[i] !== '') {
        const nextDigits = [...pinDigits];
        nextDigits[i] = '';
        setPinDigits(nextDigits);
        inputRefs[i].current?.focus();
        break;
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`bg-slate-900 border border-slate-700/80 rounded-2xl max-w-sm w-full p-6 sm:p-7 shadow-2xl text-slate-100 transition-transform ${
          shake ? 'animate-shake' : ''
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-5 h-5 text-amber-400" />
            <span className="font-spiritual text-base font-bold text-white">
              Operations Security
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Lock Graphic */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <KeyRound className="w-7 h-7" />
          </div>
          <h3 className="font-spiritual text-lg font-bold text-white mb-1">
            Enter Admin PIN
          </h3>
          <p className="text-xs text-slate-400">
            Authorized personnel only · Enter 4-digit master PIN
          </p>
        </div>

        {/* 4 Digit Boxes */}
        <div className="flex justify-center gap-3 mb-5">
          {pinDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className={`w-12 h-14 text-center text-xl font-bold rounded-xl border transition-all outline-none bg-slate-800/90 text-white ${
                errorMsg
                  ? 'border-rose-500 bg-rose-950/20 text-rose-300'
                  : digit
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500'
                  : 'border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
              }`}
            />
          ))}
        </div>

        {/* Error Notice */}
        {errorMsg ? (
          <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-800/60 text-xs text-rose-300 text-center flex items-center justify-center gap-1.5 mb-5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 text-center mb-5">
            Default Master PIN is <span className="font-mono text-amber-400/80 font-bold">9928</span>
          </div>
        )}

        {/* On-screen Keypad for quick mobile/touch access */}
        <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumPadClick(num)}
              className="py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer border border-slate-700/60 shadow-sm"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setPinDigits(['', '', '', '']);
              setErrorMsg('');
              inputRefs[0].current?.focus();
            }}
            className="py-2.5 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/40"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleNumPadClick('0')}
            className="py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl text-sm font-bold text-white transition-colors cursor-pointer border border-slate-700/60 shadow-sm"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspacePad}
            className="py-2.5 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/40"
          >
            ⌫
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Back to Website
          </button>

          <button
            type="button"
            onClick={() => verifyPin(pinDigits.join(''))}
            disabled={pinDigits.join('').length < 4}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 text-white font-semibold rounded-lg shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Unlock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
