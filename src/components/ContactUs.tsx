import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import {

  Mail, Phone, Clock, Send, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp, ArrowLeft, Instagram, Facebook,
  MessageSquare, Globe, Headphones, BookOpen

} from 'lucide-react';



interface ContactUsProps {
  onBack: () => void;
  onStartQuiz: () => void;
  onNavigate?: (section: string) => void;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const subjectOptions = [
  { value: '', label: 'Select a subject...' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'consultation', label: 'Consultation Question' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'billing', label: 'Billing & Subscriptions' },
  { value: 'feedback', label: 'Feedback & Suggestions' },
];

const faqItems = [
  {
    question: 'How does the Elemental Color Quiz work?',
    answer: 'Our quiz consists of 12 thoughtful questions about your personality, preferences, and energy patterns. Based on your answers, we determine your primary element (Fire, Water, Earth, or Air). You can then take a 6-question subtype quiz to discover your specific elemental subtype out of 16 possibilities. The quiz is free and takes about 5 minutes.',
  },
  {
    question: 'How do I explore the online content?',
    answer: 'If you purchased your profile, you can view your subtype online with your color palettes, and use the Camera Color Analyzer, and Wardrobe Analyzer through the color tools page. If you participate in the workshop, you have the full experience of all guides for the 16 elemental types including: the Celebrity Gallery, Comparison Tool, Hair Color Guide, Jewelry Guide, Decor Guide, Spiritual Essence, Community Forum, and 15+ additional elemental insights.',
  },

  {
    question: 'Can I retake the quiz if my results don\'t feel right?',
    answer: 'Absolutely! You can retake the quiz as many times as you like. Your quiz history is saved to your profile so you can track how your results evolve over time. Many people find that their results become more consistent as they answer more authentically rather than aspirationally.',
  },
  {
    question: 'How does the Camera Color Analyzer work?',
    answer: 'Our camera color analyzer uses your device\'s camera to detect colors in real-time and match them to your elemental palette. Simply point your camera at any color—clothing, paint swatches, fabrics—and the tool will tell you how well it aligns with your elemental type. For best results, use good lighting and hold the camera steady.',
  },

  {
    question: 'What are one-on-one consultations like?',
    answer: 'Our consultations are personalized sessions with the founder who specializes and created the Elemental Color system. Sessions are conducted via video call and typically last 90 minutes.',
  },

  {
    question: 'Is my data and photos secure?',
    answer: 'Yes, we take privacy seriously. Photos uploaded for the wardrobe analyzer are processed securely and are not stored permanently unless you explicitly save them. Your quiz results and profile data are encrypted and stored securely. We never share your personal information with third parties.',
  },
];


const ContactUs: React.FC<ContactUsProps> = ({ onBack, onStartQuiz }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [charCount, setCharCount] = useState(0);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'message') {
      setCharCount(value.length);
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject || 'general',
          message: formData.message.trim(),
        },
      });

      if (error) {
        console.error('Edge function invocation error:', error);
        setSubmitStatus('error');
      } else if (data?.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setCharCount(0);
        // Reset success message after 10 seconds
        setTimeout(() => setSubmitStatus('idle'), 10000);
      } else {
        console.error('Contact form failed:', data?.error || 'Unknown error');
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Failed to send contact form:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };



  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 text-white">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-40 right-40 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Home</span>
          </button>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-indigo-300" />
              <span className="text-sm text-indigo-200">We'd Love to Hear From You</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
              Get in <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
              Have a question about what we offer, need technical support, or want to explore a partnership?
              We're here to help you on your elemental color journey.
            </p>

          </div>

          {/* Quick contact cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
              <Mail className="w-5 h-5 text-indigo-300 mb-3" />
              <p className="text-sm text-white/60 mb-1">Email Us</p>
              <p className="text-white font-medium text-sm">info@elementalcoloridentity.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
              <Clock className="w-5 h-5 text-violet-300 mb-3" />
              <p className="text-sm text-white/60 mb-1">Response Time</p>
              <p className="text-white font-medium text-sm">Within 24 hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
              <Headphones className="w-5 h-5 text-purple-300 mb-3" />
              <p className="text-sm text-white/60 mb-1">Support</p>
              <p className="text-white font-medium text-sm">Mon–Fri, 9am–6pm EST</p>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form + Info Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10">
                <h2 className="text-2xl font-serif text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                {submitStatus === 'success' && (
                  <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-800">Message sent successfully!</p>
                      <p className="text-sm text-emerald-600 mt-1">
                        Thank you for reaching out. We'll respond to your inquiry within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Something went wrong</p>
                      <p className="text-sm text-red-600 mt-1">
                        Please try again or email us directly at info@elementalcoloridentity.com

                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.subject ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 bg-white appearance-none cursor-pointer`}
                    >
                      {subjectOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      maxLength={2000}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.message ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-colors text-gray-900 placeholder-gray-400 resize-none`}
                    />
                    <div className="flex justify-between mt-1.5">
                      {errors.message ? (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <p className={`text-xs ${charCount > 1800 ? 'text-amber-500' : 'text-gray-400'}`}>
                        {charCount}/2000
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-white transition-all ${
                      isSubmitting
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 border border-indigo-100">
                <h3 className="text-lg font-serif text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">info@elementalcoloridentity.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium">912-816-0075</p>
                    </div>
                  </div>


                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="text-gray-900 font-medium">www.elementalcoloridentity.com</p>
                    </div>
                  </div>

                </div>
              </div>




              {/* Social Media */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
                <h3 className="text-lg font-serif mb-2">Follow Us</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Stay connected for daily color inspiration, tips, and community highlights.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: Instagram,
                      label: 'Instagram',
                      handle: '@elementalcoloridentity',
                      color: 'from-pink-500 to-purple-500',
                      href: 'https://www.instagram.com/elementalcoloridentity/',
                    },
                    {
                      icon: Facebook,
                      label: 'Facebook',
                      handle: 'ElementalColorIdentity',
                      color: 'from-blue-600 to-blue-700',
                      href: 'https://www.facebook.com/ElementalColorIdentity/',
                    },
                    {
                      icon: BookOpen,
                      label: 'Substack',
                      handle: 'sarahjengen',
                      color: 'from-orange-500 to-amber-600',
                      href: 'https://sarahjengen.substack.com/?r=rfa96&utm_campaign=profile&utm_medium=profile-page',
                    },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center flex-shrink-0`}>
                        <social.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white text-xs font-medium">{social.label}</p>
                        <p className="text-gray-400 text-xs truncate">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>


              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Common Questions</span>
            </div>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to the most common questions about Elemental Color Identity, 
              our quiz, memberships, and consultations.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl border transition-all duration-300 ${
                  expandedFaq === index
                    ? 'border-indigo-200 shadow-md shadow-indigo-500/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <span className={`font-medium pr-4 transition-colors ${
                    expandedFaq === index ? 'text-indigo-700' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    expandedFaq === index ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-3">Still have questions?</p>
            <button
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Us a Message
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Ready to Discover Your Elemental Color Identity?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Take our free quiz. Takes just 3 minutes.
          </p>
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
          >
            Take the Quiz
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
