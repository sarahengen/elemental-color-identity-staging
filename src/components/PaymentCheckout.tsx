import React, { useState, useEffect } from 'react';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@/lib/supabase';
import { stripePromise } from '@/lib/stripe';
import { CreditCard, Lock, Check, AlertCircle, Loader2, Receipt, Mail, Calendar, Clock, MapPin, Video, X } from 'lucide-react';



interface ClassDetails {
  id: string;
  title: string;
  description: string;
  instructor_name: string;
  class_date: string;
  start_time: string;
  end_time: string;
  price: number;
  is_virtual: boolean;
  location: string | null;
  element_focus: string | null;
}

interface PaymentCheckoutProps {
  classDetails: ClassDetails;
  user: any;
  onSuccess: (receipt: BookingReceipt) => void;
  onCancel: () => void;
}

interface BookingReceipt {
  bookingId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  classDetails: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    instructor: string;
  };
  paidAt: string;
  confirmationSent: boolean;
}

const elementColors: Record<string, string> = {
  fire: 'from-red-500 to-orange-500',
  water: 'from-blue-400 to-indigo-500',
  earth: 'from-amber-600 to-orange-700',
  air: 'from-cyan-400 to-blue-400'
};

// Checkout Form Component
const CheckoutForm: React.FC<{
  classDetails: ClassDetails;
  user: any;
  onSuccess: (receipt: BookingReceipt) => void;
  onCancel: () => void;
  paymentIntentId: string;
}> = ({ classDetails, user, onSuccess, onCancel, paymentIntentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [receipt, setReceipt] = useState<BookingReceipt | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Confirm the payment
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-success',
          receipt_email: user.email,
        },
        redirect: 'if_required'
      });

      if (paymentError) {
        setError(paymentError.message || 'Payment failed. Please try again.');
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm booking in our system
        const { data, error: confirmError } = await supabase.functions.invoke('confirm-class-booking', {
          body: {
            paymentIntentId: paymentIntent.id,
            classId: classDetails.id,
            userId: user.id,
            customerEmail: user.email,
            customerName: user.user_metadata?.full_name || user.email
          }
        });

        if (confirmError || !data?.success) {
          setError('Payment succeeded but booking confirmation failed. Please contact support.');
          setLoading(false);
          return;
        }

        setReceipt(data.receipt);
        setPaymentSucceeded(true);
        onSuccess(data.receipt);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (paymentSucceeded && receipt) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-serif text-gray-900 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">Your booking has been confirmed</p>
        
        {/* Receipt */}
        <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
            <Receipt className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-900">Booking Receipt</span>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Class</span>
              <span className="font-medium text-gray-900">{receipt.classDetails?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-900">{receipt.classDetails?.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time</span>
              <span className="text-gray-900">{receipt.classDetails?.startTime} - {receipt.classDetails?.endTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Instructor</span>
              <span className="text-gray-900">{receipt.classDetails?.instructor}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-gray-900">${receipt.amount} {receipt.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="text-gray-600 text-xs font-mono">{receipt.paymentIntentId.slice(-12)}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-green-600 text-sm">
            <Mail className="w-4 h-4" />
            <span>Confirmation email sent to {receipt.customerEmail}</span>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{classDetails.title}</span>
            <span className="font-medium">${(Number(classDetails.price) || 0).toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(classDetails.class_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{formatTime(classDetails.start_time)} - {formatTime(classDetails.end_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            {classDetails.is_virtual ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
            <span>{classDetails.is_virtual ? 'Online via Zoom' : classDetails.location}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
          <span className="font-medium text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">${(Number(classDetails.price) || 0).toFixed(2)}</span>
        </div>

      </div>

      {/* Payment Element */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Payment Details</span>
        </div>
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <PaymentElement 
            options={{
              layout: 'tabs'
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Security Note */}
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Lock className="w-4 h-4" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              Pay ${(Number(classDetails.price) || 0).toFixed(2)}
            </>
          )}

        </button>
      </div>
    </form>
  );
};

// Main Payment Checkout Component
const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({ classDetails, user, onSuccess, onCancel }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent();
  }, [classDetails.id]);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fnError } = await supabase.functions.invoke('create-class-payment', {
        body: {
          classId: classDetails.id,
          className: classDetails.title,
          amount: classDetails.price,
          currency: 'usd',
          customerEmail: user.email,
          customerName: user.user_metadata?.full_name || user.email,
          userId: user.id
        }
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to initialize payment');
      }

      if (!data?.clientSecret) {
        throw new Error('Failed to create payment session');
      }

      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
    } catch (err: any) {
      console.error('Payment initialization error:', err);
      setError(err.message || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || undefined,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#111827',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#dc2626',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '12px',
        spacingUnit: '4px'
      },
      rules: {
        '.Input': {
          border: '1px solid #e5e7eb',
          boxShadow: 'none'
        },
        '.Input:focus': {
          border: '1px solid #111827',
          boxShadow: '0 0 0 1px #111827'
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`h-2 bg-gradient-to-r ${
          classDetails.element_focus 
            ? elementColors[classDetails.element_focus] 
            : 'from-gray-400 to-gray-500'
        }`} />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-serif text-gray-900">Complete Your Booking</h3>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-4" />
              <p className="text-gray-500">Initializing secure payment...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Payment Error</h4>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createPaymentIntent}
                  className="px-4 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : clientSecret && paymentIntentId ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                classDetails={classDetails}
                user={user}
                onSuccess={onSuccess}
                onCancel={onCancel}
                paymentIntentId={paymentIntentId}
              />
            </Elements>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
