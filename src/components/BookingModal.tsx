import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be valid'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  service: z.string().min(1, 'Please select a service'),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          reset();
          onClose();
        }, 3000);
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-text/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto">
              
              <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>

              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-text-muted hover:text-text transition-colors bg-surface p-2 rounded-full"
              >
                <X size={20} />
              </button>
              
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-2 pr-8">Request Appointment</h2>
              <p className="text-text-muted text-sm mb-8">Please fill out your details below and our scheduling team will contact you shortly.</p>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="py-12 text-center"
                >
                  <div className="flex items-center justify-center mb-6">
                    <CheckCircle2 size={64} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-2 text-text">Request Confirmed</h3>
                  <p className="text-text-muted">Thank you. We will be in touch within 24 hours to confirm your exact appointment time.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Full Name</label>
                      <input 
                        {...register('name')}
                        placeholder="John Doe" 
                        className={`w-full bg-surface border ${errors.name ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Phone Number</label>
                      <input 
                        {...register('phone')}
                        placeholder="(555) 000-0000" 
                        className={`w-full bg-surface border ${errors.phone ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      {...register('email')}
                      placeholder="john@example.com" 
                      type="email"
                      className={`w-full bg-surface border ${errors.email ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Service</label>
                      <select 
                        {...register('service')}
                        className={`w-full bg-surface border ${errors.service ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text`}
                      >
                        <option value="">Select Service</option>
                        <option value="General Consultation">General Checkup</option>
                        <option value="Teeth Whitening">Teeth Whitening</option>
                        <option value="Dental Implants">Dental Implants</option>
                        <option value="Invisalign">Invisalign</option>
                        <option value="Emergency">Emergency</option>
                      </select>
                      {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Date</label>
                      <input 
                        {...register('date')}
                        type="date"
                        className={`w-full bg-surface border ${errors.date ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text`}
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Time</label>
                      <div className="flex overflow-x-auto gap-2 pb-2">
                        {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setValue('time', t, { shouldValidate: true })}
                            className={`shrink-0 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${watch('time') === t ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-text hover:border-primary/50'}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" {...register('time')} />
                      {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Medical Notes (Optional)</label>
                    <textarea 
                      {...register('notes')}
                      placeholder="Please mention any allergies, current medications, or specific concerns." 
                      rows={3}
                      className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-xl text-sm font-bold hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg hover:shadow-primary/30"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={18} className="animate-spin" /> Processing...</>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
