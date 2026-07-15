import React, { useState } from 'react';
import { Send, CheckCircle, Building2, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    message: '',
    reportScam: false,
    govPilot: false,
    volunteer: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: language === 'hi' ? 'संदेश भेजा गया!' : language === 'gu' ? 'સંદેશ મોકલાયો!' : 'Message Sent!',
      description: language === 'hi' 
        ? 'हम जल्द ही आपसे संपर्क करेंगे।'
        : language === 'gu'
        ? 'અમે ટૂંક સમયમાં તમારો સંપર્ક કરીશું.'
        : 'We will get back to you soon.',
    });

    setFormData({
      name: '',
      email: '',
      org: '',
      message: '',
      reportScam: false,
      govPilot: false,
      volunteer: false,
    });
    setIsSubmitting(false);
  };

  const steps = [
    { icon: <Shield className="h-8 w-8" />, title: t('contact.step1'), desc: t('contact.step1.desc') },
    { icon: <Users className="h-8 w-8" />, title: t('contact.step2'), desc: t('contact.step2.desc') },
    { icon: <CheckCircle className="h-8 w-8" />, title: t('contact.step3'), desc: t('contact.step3.desc') },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground">{t('contact.subtitle')}</p>
          </div>

          {/* Mission Statement */}
          <div className="bg-card rounded-2xl shadow-card p-8 border border-border mb-12">
            <p className="text-lg text-foreground leading-relaxed text-center">
              {t('contact.mission')}
            </p>
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-card rounded-xl p-6 border border-border text-center hover-lift">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Government Section */}
          <div className="bg-accent/10 rounded-2xl p-8 border border-accent/30 mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="h-6 w-6 text-accent-foreground" />
              <h2 className="text-2xl font-bold text-foreground">{t('contact.govt.title')}</h2>
            </div>
            <p className="text-foreground/80">{t('contact.govt.desc')}</p>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl shadow-card p-8 border border-border mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'hi' ? 'आपका नाम' : language === 'gu' ? 'તમારું નામ' : 'Your name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={language === 'hi' ? 'आपका ईमेल' : language === 'gu' ? 'તમારો ઈમેલ' : 'your@email.com'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.org')}
                </label>
                <Input
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  placeholder={language === 'hi' ? 'संगठन का नाम (वैकल्पिक)' : language === 'gu' ? 'સંસ્થાનું નામ (વૈકલ્પિક)' : 'Organization name (optional)'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('contact.form.message')} *
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'hi' ? 'आपका संदेश...' : language === 'gu' ? 'તમારો સંદેશ...' : 'Your message...'}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="reportScam"
                    checked={formData.reportScam}
                    onCheckedChange={(checked) => setFormData({ ...formData, reportScam: !!checked })}
                  />
                  <label htmlFor="reportScam" className="text-sm text-foreground cursor-pointer">
                    {t('contact.form.scam')}
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="govPilot"
                    checked={formData.govPilot}
                    onCheckedChange={(checked) => setFormData({ ...formData, govPilot: !!checked })}
                  />
                  <label htmlFor="govPilot" className="text-sm text-foreground cursor-pointer">
                    {t('contact.form.pilot')}
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="volunteer"
                    checked={formData.volunteer}
                    onCheckedChange={(checked) => setFormData({ ...formData, volunteer: !!checked })}
                  />
                  <label htmlFor="volunteer" className="text-sm text-foreground cursor-pointer">
                    {t('contact.form.volunteer')}
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>{language === 'hi' ? 'भेज रहा है...' : language === 'gu' ? 'મોકલી રહ્યા છે...' : 'Sending...'}</span>
                  </span>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Tech Credits */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              {language === 'hi' 
                ? 'बनाया गया: React, Tailwind CSS, Claude API, ओपन-सोर्स ML मॉडल'
                : language === 'gu'
                ? 'આનાથી બનાવેલ: React, Tailwind CSS, Claude API, ઓપન-સોર્સ ML મોડેલ્સ'
                : 'Built with: React, Tailwind CSS, Claude API, open-source ML models'}
            </p>
            <p>{language === 'hi' ? 'लागत: MVP के लिए ₹0, लाखों तक स्केल' : language === 'gu' ? 'ખર્ચ: MVP માટે ₹0, લાખો સુધી સ્કેલ' : 'Cost: ₹0 for MVP, scales to millions'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
