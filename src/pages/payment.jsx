import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle2, Lock, QrCode, Smartphone, XCircle } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [fee, setFee] = useState(50);
  const [upiId, setUpiId] = useState('dentivaclinic@upi');
  const [customQr, setCustomQr] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('qr');
  
  // Mandatory Verification Input
  const [txnRef, setTxnRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem('dentiva_pending_booking'));
    const settings = JSON.parse(localStorage.getItem('dentiva_settings'));

    if (!pending) {
      navigate('/book');
      return;
    }
    setBookingData(pending);

    if (settings) {
      if (settings.consultationFee) setFee(Number(settings.consultationFee));
      if (settings.upiId) setUpiId(settings.upiId);
      if (settings.qrImageUrl) setCustomQr(settings.qrImageUrl);
    }
  }, [navigate]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!txnRef.trim()) {
      alert("Please enter the UTR / Transaction Reference ID after payment.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('dentiva_appointments')) || [];
      const newAppointment = {
        ...bookingData,
        id: Date.now(),
        fee: fee,
        paymentMethod: paymentMethod.toUpperCase(),
        txnRef: txnRef,
        paymentStatus: 'Unpaid (Pending Verification)', // Marked Unpaid/Pending until staff verifies
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('dentiva_appointments', JSON.stringify([newAppointment, ...existing]));
      localStorage.removeItem('dentiva_pending_booking');

      setIsProcessing(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleCancelBooking = () => {
    if (window.confirm("Are you sure you want to cancel? Your appointment will be saved as Unpaid/Cancelled.")) {
      const existing = JSON.parse(localStorage.getItem('dentiva_appointments')) || [];
      const cancelledAppointment = {
        ...bookingData,
        id: Date.now(),
        fee: fee,
        paymentMethod: 'NONE',
        txnRef: 'N/A',
        paymentStatus: 'Unpaid',
        status: 'Cancelled',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('dentiva_appointments', JSON.stringify([cancelledAppointment, ...existing]));
      localStorage.removeItem('dentiva_pending_booking');
      navigate('/');
    }
  };

  if (!bookingData) return null;

  const activeQrCodeUrl = customQr || `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=${encodeURIComponent(upiId)}%26pn=Dentiva%20Clinic%26am=${fee}`;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl">
        {isSubmitted ? (
          <div className="text-center space-y-4 py-8">
            <CheckCircle2 size={64} className="text-amber-500 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-900">Payment Details Submitted!</h2>
            <p className="text-slate-600 text-sm">
              Your appointment request and Transaction Ref (<span className="font-mono font-bold text-slate-800">{txnRef}</span>) have been received.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs text-left space-y-1">
              <p className="font-bold">Status: Unpaid (Verification Pending)</p>
              <p>Our staff will verify the payment against bank records and update status to **Paid** shortly.</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="mt-6 bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              Return to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-[#5b7c65] uppercase bg-[#eaf2ec] px-3 py-1 rounded-full">
                  Step 2 of 2
                </span>
                <h1 className="text-2xl font-bold text-slate-900 mt-2">Complete Payment</h1>
                <p className="text-slate-500 text-sm">Pay consultation fee to complete your booking.</p>
              </div>
              <button
                type="button"
                onClick={handleCancelBooking}
                className="text-xs text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-50"
              >
                <XCircle size={14} /> Cancel
              </button>
            </div>

            {/* Fee Summary */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-slate-800">Consultation Fee</p>
                <p className="text-xs text-slate-500">Patient: {bookingData.name}</p>
              </div>
              <span className="text-2xl font-extrabold text-[#5b7c65]">${fee}</span>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition ${
                    paymentMethod === 'qr'
                      ? 'border-[#5b7c65] bg-[#eaf2ec] text-[#5b7c65]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <QrCode size={20} />
                  QR Code
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition ${
                    paymentMethod === 'upi'
                      ? 'border-[#5b7c65] bg-[#eaf2ec] text-[#5b7c65]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone size={20} />
                  UPI ID
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-2 transition ${
                    paymentMethod === 'card'
                      ? 'border-[#5b7c65] bg-[#eaf2ec] text-[#5b7c65]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard size={20} />
                  Card Payment
                </button>
              </div>
            </div>

            {/* Display QR / UPI details */}
            {paymentMethod === 'qr' && (
              <div className="text-center p-5 border border-slate-200 rounded-xl bg-slate-50 space-y-3">
                <p className="text-xs font-semibold text-slate-600">Scan QR Code using GPay, PhonePe, or Paytm</p>
                <div className="bg-white p-3 border rounded-xl inline-block shadow-sm">
                  <img src={activeQrCodeUrl} alt="UPI QR Code" className="w-40 h-40 mx-auto object-contain" />
                </div>
                <p className="text-xs text-slate-500 font-mono">UPI ID: <span className="font-bold text-slate-800">{upiId}</span></p>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="p-4 bg-slate-50 border rounded-xl space-y-1 text-center">
                <p className="text-xs text-slate-500">Pay directly to Clinic UPI ID:</p>
                <p className="text-base font-bold text-slate-900 font-mono">{upiId}</p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 bg-slate-50 border rounded-xl space-y-2 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">Card Payment Instructions:</p>
                <p>Please transfer ${fee} to Clinic Account or pay at reception counter.</p>
              </div>
            )}

            {/* Mandatory UTR / Txn Ref Input */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase text-slate-700">
                Enter UTR / Transaction Ref No. / Payment ID <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. 423156789012 or UPI Ref No."
                value={txnRef}
                onChange={(e) => setTxnRef(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5b7c65]"
              />
              <p className="text-[11px] text-slate-500">
                Required for staff verification. Appointments without valid payment reference will remain Unpaid.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#5b7c65] text-white py-3.5 rounded-lg font-semibold hover:bg-[#4a6753] transition flex items-center justify-center gap-2 shadow-md"
            >
              <Lock size={16} />
              {isProcessing ? 'Submitting Details...' : `Submit Payment Details ($${fee})`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}