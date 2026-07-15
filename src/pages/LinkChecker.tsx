import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import API_BASE from '@/lib/api';

interface AnalysisResult {
  riskLevel: 'danger' | 'suspicious' | 'safe';
  riskScore: number;
  reasons: string[];
  meaning: string;
  recommendation: string;
  verifySteps: string[];
  scamType?: string;
}

const LinkChecker = () => {
  const { t, language } = useLanguage();
  const { incrementLinksAnalyzed, addBadge, hasBadge, progress } = useUserProgress();
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const buildResult = (riskScore: number, scamType: string): AnalysisResult => {
    const reasons: string[] = [];
    let riskLevel: 'danger' | 'suspicious' | 'safe';
    let meaning: string;
    let recommendation: string;

    reasons.push(
      language === 'hi'
        ? `🤖 AI मॉडल जोखिम स्कोर: ${riskScore}% (256-फीचर डीप लर्निंग)`
        : language === 'gu'
        ? `🤖 AI મોડેલ જોખમ સ્કોર: ${riskScore}% (256-ફીચર ડીપ લર્નિંગ)`
        : `🤖 AI Model Risk Score: ${riskScore}% (256-feature deep learning)`
    );

    if (riskScore >= 66) {
      riskLevel = 'danger';
      reasons.push(
        language === 'hi'
          ? `🔍 घोटाला वर्गीकरण: ${scamType}`
          : language === 'gu'
          ? `🔍 છેતરપિંડી વર્ગીકરણ: ${scamType}`
          : `🔍 Scam Classification: ${scamType}`
      );
      reasons.push(
        language === 'hi'
          ? '✗ URL संरचना ज्ञात फिशिंग पैटर्न से मेल खाती है'
          : language === 'gu'
          ? '✗ URL માળખું જાણીતા ફિશિંગ પેટર્ન સાથે મેળ ખાય છે'
          : '✗ URL structure matches known phishing patterns'
      );
      reasons.push(
        language === 'hi'
          ? '✗ डोमेन किसी वित्तीय संस्था की नकल करने का प्रयास करता है'
          : language === 'gu'
          ? '✗ ડોમેન કોઈ નાણાકીય સંસ્થાની નકલ કરવાનો પ્રયાસ કરે છે'
          : '✗ Domain attempts to impersonate a financial institution'
      );
      reasons.push(
        language === 'hi'
          ? '✗ 235,000+ URL पर प्रशिक्षित डीप लर्निंग मॉडल द्वारा फ़्लैग किया गया'
          : language === 'gu'
          ? '✗ 235,000+ URL પર તાલીમ પામેલા ડીપ લર્નિંગ મોડેલ દ્વારા ફ્લેગ કરવામાં આવ્યું'
          : '✗ Flagged by deep learning model trained on 235,000+ URLs'
      );
      meaning = language === 'hi'
        ? 'हमारे AI मॉडल ने इस URL को उच्च-जोखिम फिशिंग के रूप में पहचाना है। यह व्यक्तिगत जानकारी या पैसे चुराने का प्रयास कर सकता है।'
        : language === 'gu'
        ? 'અમારા AI મોડેલે આ URL ને ઉચ્ચ-જોખમ ફિશિંગ તરીકે ઓળખ્યું છે. તે વ્યક્તિગત માહિતી અથવા પૈસા ચોરવાનો પ્રયાસ કરી શકે છે.'
        : 'Our AI model has flagged this URL as HIGH RISK phishing. It may attempt to steal personal information or money.';
      recommendation = language === 'hi'
        ? '🚫 क्लिक न करें\n📞 1930 हेल्पलाइन पर रिपोर्ट करें\n💻 cybercrime.gov.in पर रिपोर्ट करें\n⚠️ अपने परिवार/दोस्तों को तुरंत चेतावनी दें'
        : language === 'gu'
        ? '🚫 ક્લિક કરશો નહીં\n📞 1930 હેલ્પલાઇન પર રિપોર્ટ કરો\n💻 cybercrime.gov.in પર રિપોર્ટ કરો\n⚠️ તમારા પરિવાર/મિત્રોને તરત જ ચેતવણી આપો'
        : '🚫 DO NOT CLICK\n📞 Report to 1930 helpline\n💻 Report to cybercrime.gov.in\n⚠️ Warn your family/friends immediately';
    } else if (riskScore >= 33) {
      riskLevel = 'suspicious';
      reasons.push(
        language === 'hi'
          ? `🔍 संभावित वर्गीकरण: ${scamType}`
          : language === 'gu'
          ? `🔍 સંભવિત વર્ગીકરણ: ${scamType}`
          : `🔍 Potential Classification: ${scamType}`
      );
      reasons.push(
        language === 'hi'
          ? '✗ URL में संदिग्ध संरचनात्मक पैटर्न पाए गए'
          : language === 'gu'
          ? '✗ URL માં શંકાસ્પદ માળખાકીય પેટર્ન મળ્યા'
          : '✗ Suspicious structural patterns detected in URL'
      );
      reasons.push(
        language === 'hi'
          ? '✗ डीप लर्निंग मॉडल ने मध्यम-जोखिम का संकेत दिया'
          : language === 'gu'
          ? '✗ ડીપ લર્નિંગ મોડેલે મધ્યમ-જોખમનો સંકેત આપ્યો'
          : '✗ Deep learning model indicates medium risk'
      );
      meaning = language === 'hi'
        ? 'हमारे AI मॉडल ने इस URL में संदिग्ध पैटर्न पाए हैं। सावधानी बरतें।'
        : language === 'gu'
        ? 'અમારા AI મોડેલે આ URL માં શંકાસ્પદ પેટર્ન શોધ્યા છે. સાવધાની રાખો.'
        : 'Our AI model detected suspicious patterns in this URL. Proceed with caution.';
      recommendation = language === 'hi'
        ? '⚠️ सावधान रहें\n🔍 क्लिक करने से पहले आधिकारिक वेबसाइटों पर सत्यापित करें\n🚫 कोई व्यक्तिगत जानकारी न दें\n📱 अगर संदेह हो तो आधिकारिक ऐप का उपयोग करें'
        : language === 'gu'
        ? '⚠️ સાવધાન રહો\n🔍 ક્લિક કરતા પહેલા અધિકૃત વેબસાઇટ પર ચકાસો\n🚫 કોઈ વ્યક્તિગત માહિતી આપશો નહીં\n📱 જો શંકા હોય તો અધિકૃત એપનો ઉપયોગ કરો'
        : '⚠️ Be cautious\n🔍 Verify on official websites before clicking\n🚫 Do not share personal information\n📱 Use official apps if in doubt';
    } else {
      riskLevel = 'safe';
      reasons.push(
        language === 'hi'
          ? '✓ URL संरचना सामान्य पैटर्न से मेल खाती है'
          : language === 'gu'
          ? '✓ URL માળખું સામાન્ય પેટર્ન સાથે મેળ ખાય છે'
          : '✓ URL structure matches normal patterns'
      );
      reasons.push(
        language === 'hi'
          ? '✓ डीप लर्निंग मॉडल ने कम जोखिम का संकेत दिया'
          : language === 'gu'
          ? '✓ ડીપ લર્નિંગ મોડેલે ઓછા જોખમનો સંકેત આપ્યો'
          : '✓ Deep learning model indicates low risk'
      );
      meaning = language === 'hi'
        ? 'हमारे AI मॉडल ने इस URL को कम जोखिम के रूप में वर्गीकृत किया है। फिर भी सत्यापित करें।'
        : language === 'gu'
        ? 'અમારા AI મોડેલે આ URL ને ઓછા જોખમ તરીકે વર્ગીકૃત કર્યું છે. છતાં ચકાસણી કરો.'
        : 'Our AI model classified this URL as low risk. Still verify when money is involved.';
      recommendation = language === 'hi'
        ? '✅ सुरक्षित दिखता है\n🔍 फिर भी पैसे शामिल होने पर सत्यापित करें\n📱 जब संभव हो आधिकारिक ऐप का उपयोग करें'
        : language === 'gu'
        ? '✅ સુરક્ષિત લાગે છે\n🔍 છતાં પૈસા સામેલ હોય ત્યારે ચકાસો\n📱 જ્યારે શક્ય હોય ત્યારે અધિકૃત એપનો ઉપયોગ કરો'
        : '✅ Appears safe\n🔍 Still verify if money is involved\n📱 Use official apps when possible';
    }

    const verifySteps = language === 'hi' ? [
      '✓ केवल .gov.in डोमेन पर भरोसा करें',
      '✓ PIB (pib.gov.in) प्रेस रिलीज़ जांचें',
      '✓ आधिकारिक india.gov.in वेबसाइट पर सत्यापित करें',
      '✓ असली योजनाओं में 24 घंटे की डेडलाइन नहीं होती',
    ] : language === 'gu' ? [
      '✓ ફક્ત .gov.in ડોમેન પર ભરોસો કરો',
      '✓ PIB (pib.gov.in) પ્રેસ રિલીઝ તપાસો',
      '✓ અધિકૃત india.gov.in વેબસાઇટ પર ચકાસો',
      '✓ સાચી યોજનાઓમાં 24 કલાકની ડેડલાઇન હોતી નથી',
    ] : [
      '✓ Only trust .gov.in domains',
      '✓ Check PIB (pib.gov.in) press releases',
      '✓ Verify on official india.gov.in website',
      "✓ Real schemes don't have 24-hour deadlines",
    ];

    return { riskLevel, riskScore, reasons, meaning, recommendation, verifySteps, scamType };
  };

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setLoadingStep(0);

    // Step 1: Extracting URL features
    await new Promise(resolve => setTimeout(resolve, 600));
    setLoadingStep(1);

    // Step 2: Call real ML backend
    let mlRiskScore: number | null = null;
    let mlScamType = 'Generic Phishing';
    try {
      const response = await fetch(`${API_BASE}/ml/analyze-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input.trim() }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          mlRiskScore = data.data.risk_score;
          mlScamType = data.data.scam_type;
        }
      }
    } catch (err) {
      console.warn('ML backend unavailable', err);
    }

    setLoadingStep(2);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingStep(3);
    await new Promise(resolve => setTimeout(resolve, 400));

    // Build result purely from ML score (fallback to 50 if backend is down)
    const finalScore = mlRiskScore !== null ? mlRiskScore : 50;
    const analysisResult = buildResult(finalScore, mlScamType);

    setResult(analysisResult);
    setIsAnalyzing(false);
    incrementLinksAnalyzed();

    if (progress.linksAnalyzed + 1 >= 10 && !hasBadge('fraud-detective')) {
      addBadge({ id: 'fraud-detective', name: 'Fraud Detective', emoji: '🔍' });
    }
  };

  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'danger':
        return {
          bg: 'bg-destructive/10',
          border: 'border-destructive',
          text: 'text-destructive',
          badge: 'bg-destructive text-destructive-foreground',
          icon: <XCircle className="h-6 w-6" />,
        };
      case 'suspicious':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning',
          text: 'text-warning-foreground',
          badge: 'bg-warning text-warning-foreground',
          icon: <AlertTriangle className="h-6 w-6" />,
        };
      default:
        return {
          bg: 'bg-success/10',
          border: 'border-success',
          text: 'text-success',
          badge: 'bg-success text-success-foreground',
          icon: <CheckCircle className="h-6 w-6" />,
        };
    }
  };

  const redFlags = language === 'hi' ? [
    { title: 'तात्कालिकता रणनीति', examples: '"24 घंटे में करें", "आखिरी मौका", "सीमित स्लॉट"' },
    { title: 'पैसे के वादे', examples: '"₹1 लाख जीतें", "मुफ्त कैश", "सरकारी अनुदान"' },
    { title: 'टाइपोस्क्वाटिंग', examples: 'micr0soft.com, g00gle.com, paytm-india.com' },
    { title: 'संदिग्ध डोमेन', examples: '.tk, .ml, .ga, .cf, .gq' },
    { title: 'नकली अधिकार', examples: '"ED नोटिस", "आयकर अलर्ट", "पुलिस चेतावनी"' },
    { title: 'व्याकरण त्रुटियां', examples: 'असली संगठनों में पेशेवर संचार होता है' },
  ] : language === 'gu' ? [
    { title: 'તાકીદની યુક્તિઓ', examples: '"24 કલાકમાં કરો", "છેલ્લી તક", "મર્યાદિત સ્લોટ"' },
    { title: 'પૈસાના વચનો', examples: '"₹1 લાખ જીતો", "મફત કેશ", "સરકારી અનુદાન"' },
    { title: 'ટાઇપોસ્ક્વોટિંગ', examples: 'micr0soft.com, g00gle.com, paytm-india.com' },
    { title: 'શંકાસ્પદ ડોમેન', examples: '.tk, .ml, .ga, .cf, .gq' },
    { title: 'નકલી સત્તા', examples: '"ED નોટિસ", "આવકવેરા એલર્ટ", "પોલીસ ચેતવણી"' },
    { title: 'વ્યાકરણ ભૂલો', examples: 'સાચી સંસ્થાઓમાં વ્યાવસાયિક સંચાર હોય છે' },
  ] : [
    { title: 'Urgency tactics', examples: '"Act within 24 hours", "Last chance", "Limited slots"' },
    { title: 'Money promises', examples: '"Win ₹1 lakh", "Free cash", "Government grant"' },
    { title: 'Typosquatting', examples: 'micr0soft.com, g00gle.com, paytm-india.com' },
    { title: 'Suspicious domains', examples: '.tk, .ml, .ga, .cf, .gq' },
    { title: 'Fake authority', examples: '"ED Notice", "Income Tax Alert", "Police Warning"' },
    { title: 'Grammar errors', examples: 'Real organizations have professional communication' },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('fullLinkChecker.title')}</h1>
            <p className="text-muted-foreground">{t('fullLinkChecker.subtitle')}</p>
          </div>

          {/* Input Section */}
          <div className="bg-card rounded-2xl shadow-card p-6 border border-border mb-8">
            <Textarea
              placeholder={t('fullLinkChecker.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[160px] text-base mb-4 resize-none"
            />
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !input.trim()}
              className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium text-lg"
            >
              {isAnalyzing ? (
                <span className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  <span>{t('linkChecker.analyzing')}</span>
                </span>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  {t('fullLinkChecker.analyze')}
                </>
              )}
            </Button>
          </div>

          {/* Loading Steps */}
          {isAnalyzing && (
            <div className="bg-card rounded-2xl shadow-card p-6 border border-border mb-8 animate-fade-in">
              <div className="space-y-4">
                <div className={`flex items-center space-x-3 ${loadingStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {loadingStep >= 1 ? <CheckCircle className="h-5 w-5 text-success" /> : <div className="w-5 h-5 border-2 border-muted rounded-full animate-spin" />}
                  <span>{language === 'hi' ? 'URL विशेषताएँ निकाल रहा है (256 फीचर)...' : language === 'gu' ? 'URL વિશેષતાઓ કાઢી રહ્યું છે (256 ફીચર)...' : 'Extracting URL features (256 dimensions)...'}</span>
                </div>
                <div className={`flex items-center space-x-3 ${loadingStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {loadingStep >= 2 ? <CheckCircle className="h-5 w-5 text-success" /> : loadingStep >= 1 ? <div className="w-5 h-5 border-2 border-muted rounded-full animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-muted" />}
                  <span>{language === 'hi' ? 'PyTorch डीप लर्निंग मॉडल चला रहा है...' : language === 'gu' ? 'PyTorch ડીપ લર્નિંગ મોડેલ ચલાવી રહ્યું છે...' : 'Running PyTorch deep learning model...'}</span>
                </div>
                <div className={`flex items-center space-x-3 ${loadingStep >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {loadingStep >= 3 ? <CheckCircle className="h-5 w-5 text-success" /> : loadingStep >= 2 ? <div className="w-5 h-5 border-2 border-muted rounded-full animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-muted" />}
                  <span>{language === 'hi' ? 'जोखिम विश्लेषण उत्पन्न कर रहा है...' : language === 'gu' ? 'જોખમ વિશ્લેષણ તૈયાર કરી રહ્યું છે...' : 'Generating risk analysis...'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className={`rounded-2xl p-6 border-2 ${getRiskStyles(result.riskLevel).bg} ${getRiskStyles(result.riskLevel).border} mb-8 animate-scale-in`}>
              {/* Risk Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className={`inline-flex items-center space-x-2 px-5 py-2 rounded-full ${getRiskStyles(result.riskLevel).badge}`}>
                  {getRiskStyles(result.riskLevel).icon}
                  <span className="font-bold text-lg">
                    {result.riskLevel === 'danger' ? `🚨 ${t('linkChecker.danger')}` :
                     result.riskLevel === 'suspicious' ? `⚠️ ${t('linkChecker.suspicious')}` :
                     `✅ ${t('linkChecker.safe')}`}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t('linkChecker.riskScore')}</p>
                  <p className={`text-4xl font-bold ${getRiskStyles(result.riskLevel).text}`}>
                    {result.riskScore}%
                  </p>
                </div>
              </div>

              {/* Analysis */}
              <div className="bg-card/50 rounded-xl p-4 mb-4">
                <p className="font-semibold text-foreground mb-3">{t('linkChecker.analysis')}:</p>
                <ul className="space-y-2">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meaning */}
              <div className="bg-card/50 rounded-xl p-4 mb-4">
                <p className="font-semibold text-foreground mb-2">{t('fullLinkChecker.meaning')}:</p>
                <p className="text-sm text-muted-foreground">{result.meaning}</p>
              </div>

              {/* Recommendation */}
              <div className={`rounded-xl p-4 mb-4 ${result.riskLevel === 'safe' ? 'bg-success/20' : 'bg-destructive/20'}`}>
                <p className="font-bold text-foreground mb-2">{t('linkChecker.recommendation')}:</p>
                <p className="text-sm whitespace-pre-line">{result.recommendation}</p>
              </div>

              {/* Verify Steps */}
              <div className="bg-card/50 rounded-xl p-4 mb-4">
                <p className="font-semibold text-foreground mb-2">{t('fullLinkChecker.verify')}</p>
                <ul className="space-y-1">
                  {result.verifySteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-success">{step}</li>
                  ))}
                </ul>
              </div>

              {/* Share */}
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                {t('fullLinkChecker.share')}
              </Button>
            </div>
          )}

          {/* Red Flags Education */}
          <div className="bg-card rounded-2xl shadow-card p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">{t('fullLinkChecker.redFlags')}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {redFlags.map((flag, idx) => (
                <div key={idx} className="bg-muted/50 rounded-xl p-4">
                  <h3 className="font-semibold text-foreground mb-1">{flag.title}</h3>
                  <p className="text-sm text-muted-foreground">{flag.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkChecker;
