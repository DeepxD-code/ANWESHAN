import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Button } from '@/components/ui/button';

interface Message {
  sender: 'scammer' | 'user' | 'system';
  text: { en: string; hi: string; gu: string };
}

interface Choice {
  text: { en: string; hi: string; gu: string };
  scoreChange: number;
  isCorrect: boolean;
  nextScene: number;
}

interface Scene {
  id: number;
  scammerMessage: { en: string; hi: string; gu: string };
  choices: Choice[];
}

const scenes: Scene[] = [
  {
    id: 1,
    scammerMessage: {
      en: "Hello, this is Inspector Rajesh Kumar from Enforcement Directorate. Am I speaking with you?",
      hi: "नमस्ते, मैं प्रवर्तन निदेशालय से इंस्पेक्टर राजेश कुमार बोल रहा हूं। क्या मैं आपसे बात कर रहा हूं?",
      gu: "નમસ્તે, હું એન્ફોર્સમેન્ટ ડિરેક્ટોરેટમાંથી ઇન્સ્પેક્ટર રાજેશ કુમાર બોલી રહ્યો છું. શું હું તમારી સાથે વાત કરી રહ્યો છું?"
    },
    choices: [
      { text: { en: "Yes, that's me", hi: "हां, मैं ही हूं", gu: "હા, હું જ છું" }, scoreChange: -10, isCorrect: false, nextScene: 2 },
      { text: { en: "Who is this? How did you get my number?", hi: "आप कौन हैं? आपको मेरा नंबर कैसे मिला?", gu: "તમે કોણ છો? તમને મારો નંબર કેવી રીતે મળ્યો?" }, scoreChange: 25, isCorrect: true, nextScene: 2 },
      { text: { en: "What do you want?", hi: "आप क्या चाहते हैं?", gu: "તમારે શું જોઈએ છે?" }, scoreChange: -5, isCorrect: false, nextScene: 2 }
    ]
  },
  {
    id: 2,
    scammerMessage: {
      en: "Your Aadhaar number is linked to a money laundering investigation. ₹15 lakhs transferred to suspicious accounts. We need to verify your innocence immediately.",
      hi: "आपका आधार नंबर एक मनी लॉन्ड्रिंग जांच से जुड़ा है। ₹15 लाख संदिग्ध खातों में ट्रांसफर किए गए। हमें तुरंत आपकी बेगुनाही सत्यापित करनी होगी।",
      gu: "તમારો આધાર નંબર મની લોન્ડરિંગ તપાસ સાથે જોડાયેલો છે. ₹15 લાખ શંકાસ્પદ ખાતામાં ટ્રાન્સફર કરવામાં આવ્યા છે. અમારે તાત્કાલિક તમારી નિર્દોષતા ચકાસવાની જરૂર છે."
    },
    choices: [
      { text: { en: "This must be a mistake. What do I need to do?", hi: "यह गलती होगी। मुझे क्या करना होगा?", gu: "આ ભૂલ હશે. મારે શું કરવું પડશે?" }, scoreChange: -15, isCorrect: false, nextScene: 3 },
      { text: { en: "Send me official documentation via email to your verified ED address", hi: "अपने सत्यापित ED पते पर ईमेल से आधिकारिक दस्तावेज भेजें", gu: "તમારા ચકાસાયેલ ED સરનામા પરથી ઇમેઇલ દ્વારા સત્તાવાર દસ્તાવેજ મોકલો" }, scoreChange: 25, isCorrect: true, nextScene: 3 },
      { text: { en: "I didn't do anything wrong!", hi: "मैंने कुछ गलत नहीं किया!", gu: "મેં કંઈ ખોટું કર્યું નથી!" }, scoreChange: -10, isCorrect: false, nextScene: 3 }
    ]
  },
  {
    id: 3,
    scammerMessage: {
      en: "I understand your concern, but this is urgent. I'll connect you to my senior officer via video call RIGHT NOW. You have 2 hours to transfer ₹5 lakhs to a secure government account or we'll issue an arrest warrant.",
      hi: "मैं आपकी चिंता समझता हूं, लेकिन यह जरूरी है। मैं आपको अभी वीडियो कॉल से अपने वरिष्ठ अधिकारी से जोड़ूंगा। आपके पास 2 घंटे हैं ₹5 लाख सरकारी सुरक्षित खाते में ट्रांसफर करने के लिए वरना गिरफ्तारी वारंट जारी होगा।",
      gu: "હું તમારી ચિંતા સમજું છું, પણ આ તાત્કાલિક છે. હું તમને અત્યારે જ વિડિયો કૉલ દ્વારા મારા વરિષ્ઠ અધિકારી સાથે જોડીશ. તમારી પાસે ₹5 લાખ સરકારી સુરક્ષિત ખાતામાં ટ્રાન્સફર કરવા માટે 2 કલાક છે નહીંતર ધરપકડ વૉરંટ જારી થશે."
    },
    choices: [
      { text: { en: "Okay, I'll arrange the money", hi: "ठीक है, मैं पैसे की व्यवस्था करता हूं", gu: "ઠીક છે, હું પૈસાની વ્યવસ્થા કરું છું" }, scoreChange: -50, isCorrect: false, nextScene: -1 },
      { text: { en: "Hang up and call ED's official number from website", hi: "फोन काटें और ED की वेबसाइट से आधिकारिक नंबर पर कॉल करें", gu: "ફોન મૂકો અને ED ની વેબસાઇટ પરથી સત્તાવાર નંબર પર કૉલ કરો" }, scoreChange: 50, isCorrect: true, nextScene: 0 },
      { text: { en: "Can I come to your office instead?", hi: "क्या मैं आपके ऑफिस आ सकता हूं?", gu: "શું હું તમારી ઑફિસે આવી શકું?" }, scoreChange: 10, isCorrect: false, nextScene: 4 },
      { text: { en: "Let me talk to my lawyer first", hi: "मुझे पहले अपने वकील से बात करने दीजिए", gu: "મને પહેલાં મારા વકીલ સાથે વાત કરવા દો" }, scoreChange: 40, isCorrect: true, nextScene: 0 }
    ]
  },
  {
    id: 4,
    scammerMessage: {
      en: "Our office is under renovation. This is a FINAL WARNING - transfer the money NOW or face immediate arrest. Officers are already on their way to your location!",
      hi: "हमारा ऑफिस नवीनीकरण के अधीन है। यह अंतिम चेतावनी है - अभी पैसे ट्रांसफर करें या तुरंत गिरफ्तारी का सामना करें। अधिकारी पहले से आपके स्थान पर आ रहे हैं!",
      gu: "અમારી ઑફિસ રિનોવેશન હેઠળ છે. આ અંતિમ ચેતવણી છે - હમણાં જ પૈસા ટ્રાન્સફર કરો નહીંતર તાત્કાલિક ધરપકડનો સામનો કરો. અધિકારીઓ પહેલેથી જ તમારા સ્થળે આવી રહ્યા છે!"
    },
    choices: [
      { text: { en: "I'm scared. Okay, I'll transfer", hi: "मुझे डर लग रहा है। ठीक है, मैं ट्रांसफर करता हूं", gu: "મને ડર લાગે છે. ઠીક છે, હું ટ્રાન્સફર કરું છું" }, scoreChange: -50, isCorrect: false, nextScene: -1 },
      { text: { en: "This is clearly a scam. Hanging up now.", hi: "यह स्पष्ट रूप से घोटाला है। अब फोन काट रहा हूं।", gu: "આ સ્પષ્ટ રીતે છેતરપિંડી છે. હવે ફોન મૂકું છું." }, scoreChange: 50, isCorrect: true, nextScene: 0 },
      { text: { en: "I'm calling 100 to verify", hi: "मैं सत्यापित करने के लिए 100 पर कॉल कर रहा हूं", gu: "હું ચકાસવા માટે 100 પર કૉલ કરી રહ્યો છું" }, scoreChange: 40, isCorrect: true, nextScene: 0 }
    ]
  }
];

/** Helper to pick the right translation string based on current language */
const getText = (obj: { en: string; hi: string; gu: string }, language: string): string => {
  if (language === 'hi') return obj.hi;
  if (language === 'gu') return obj.gu;
  return obj.en;
};

const Simulate = () => {
  const { t, language } = useLanguage();
  const { incrementSimulations, addBadge, hasBadge } = useUserProgress();
  const navigate = useNavigate();

  const [currentScene, setCurrentScene] = useState(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [score, setScore] = useState(50);
  const [isTyping, setIsTyping] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [survived, setSurvived] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  const scene = scenes.find(s => s.id === currentScene);

  useEffect(() => {
    if (scene && !gameOver) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'scammer', 
          text: scene.scammerMessage 
        }]);
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentScene, gameOver]);

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setScore(prev => Math.max(0, Math.min(100, prev + choice.scoreChange)));
    
    setMessages(prev => [...prev, { 
      sender: 'user', 
      text: choice.text 
    }]);

    setTimeout(() => {
      if (choice.nextScene === 0) {
        // Survived!
        setSurvived(true);
        setGameOver(true);
        incrementSimulations(true);
        if (!hasBadge('scam-survivor')) {
          addBadge({ id: 'scam-survivor', name: 'Scam Survivor', emoji: '🎖️' });
        }
        if (score + choice.scoreChange >= 80 && !hasBadge('quick-thinker')) {
          addBadge({ id: 'quick-thinker', name: 'Quick Thinker', emoji: '🧠' });
        }
      } else if (choice.nextScene === -1) {
        // Scammed
        setSurvived(false);
        setGameOver(true);
        incrementSimulations(false);
      } else {
        setCurrentScene(choice.nextScene);
      }
      setSelectedChoice(null);
    }, 1000);
  };

  const restartSimulation = () => {
    setCurrentScene(1);
    setMessages([]);
    setScore(50);
    setGameOver(false);
    setSurvived(false);
    setIsTyping(true);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className={`rounded-2xl p-8 border-2 animate-scale-in ${
              survived 
                ? 'bg-success/10 border-success' 
                : 'bg-destructive/10 border-destructive'
            }`}>
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {survived ? '✅' : '🚨'}
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {survived 
                    ? (language === 'hi' ? 'आपने घोटाले का विरोध किया!' : language === 'gu' ? 'તમે છેતરપિંડીનો પ્રતિકાર કર્યો!' : 'You Resisted the Scam!')
                    : (language === 'hi' ? 'आपने ₹5 लाख खो दिए' : language === 'gu' ? 'તમે ₹5 લાખ ગુમાવ્યા' : 'You Lost ₹5 Lakhs')
                  }
                </h2>
                {survived && (
                  <p className="text-xl text-muted-foreground">
                    {language === 'hi' ? `आपका स्कोर: ${score}/100` : language === 'gu' ? `તમારો સ્કોર: ${score}/100` : `Your score: ${score}/100`}
                  </p>
                )}
              </div>

              <div className="bg-card rounded-xl p-6 mb-6">
                <h3 className="font-bold text-foreground mb-3">
                  {survived 
                    ? (language === 'hi' ? 'आपने क्या सही किया:' : language === 'gu' ? 'તમે શું સાચું કર્યું:' : 'What you did right:')
                    : (language === 'hi' ? 'क्या गलत हुआ:' : language === 'gu' ? 'શું ખોટું થયું:' : 'What went wrong:')
                  }
                </h3>
                <ul className="space-y-2">
                  {survived ? (
                    <>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span>{language === 'hi' ? 'आपने कार्य करने से पहले सत्यापित किया' : language === 'gu' ? 'તમે કાર્ય કરતાં પહેલાં ચકાસણી કરી' : 'You verified before acting'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span>{language === 'hi' ? 'आप दबाव में घबराए नहीं' : language === 'gu' ? 'તમે દબાણમાં ગભરાયા નહીં' : "You didn't panic under pressure"}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span>{language === 'hi' ? 'आप जानते थे कि ED फोन पर जांच नहीं करता' : language === 'gu' ? 'તમે જાણતા હતા કે ED ફોન પર તપાસ કરતું નથી' : "You knew ED doesn't conduct phone investigations"}</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start space-x-2">
                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <span>{language === 'hi' ? 'आपने सत्यापन के बिना अधिकारी पर भरोसा किया' : language === 'gu' ? 'તમે ચકાસણી વિના અધિકારી પર ભરોસો કર્યો' : 'You trusted the authority figure without verification'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <span>{language === 'hi' ? 'आपने सोचने के बजाय घबराहट में काम किया' : language === 'gu' ? 'તમે વિચારવાને બદલે ગભરાટમાં કામ કર્યું' : 'You acted under panic instead of pausing to think'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <span>{language === 'hi' ? 'आप नहीं जानते थे कि ED कॉल नहीं, कानूनी नोटिस भेजता है' : language === 'gu' ? 'તમે જાણતા ન હતા કે ED કૉલ નહીં, કાનૂની નોટિસ મોકલે છે' : "You didn't know that ED sends legal notices, not calls"}</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {!survived && (
                <div className="bg-muted rounded-xl p-6 mb-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>{language === 'hi' ? 'वास्तविक प्रभाव:' : language === 'gu' ? 'વાસ્તવિક અસર:' : 'Real impact:'}</strong>{' '}
                    {language === 'hi' 
                      ? '15,000 भारतीय रोजाना इस घोटाले का शिकार होते हैं। 2024 में ₹2,000 करोड़ का नुकसान।'
                      : language === 'gu'
                        ? '15,000 ભારતીયો દરરોજ આ છેતરપિંડીનો ભોગ બને છે. 2024 માં ₹2,000 કરોડનું નુકસાન.'
                        : '15,000 Indians fall for this daily. ₹2,000 crore lost in 2024.'
                    }
                  </p>
                </div>
              )}

              {survived && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center space-x-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm badge-pop">
                    <span>🎖️</span>
                    <span>{language === 'hi' ? 'घोटाला उत्तरजीवी' : language === 'gu' ? 'છેતરપિંડી સર્વાઇવર' : 'Scam Survivor'}</span>
                  </span>
                  {score >= 80 && (
                    <span className="inline-flex items-center space-x-1 bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm badge-pop" style={{ animationDelay: '200ms' }}>
                      <span>🧠</span>
                      <span>{language === 'hi' ? 'तेज विचारक' : language === 'gu' ? 'ઝડપી વિચારક' : 'Quick Thinker'}</span>
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={restartSimulation} variant="outline" className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t('simulate.restart')}
                </Button>
                <Button onClick={() => navigate('/results')} className="flex-1 bg-primary hover:bg-primary/90">
                  {t('simulate.continue')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{t('simulate.title')}</h1>
            <p className="text-muted-foreground">{t('simulate.subtitle')}</p>
          </div>

          {/* Score Bar */}
          <div className="mb-6 bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{language === 'hi' ? 'आपका स्कोर' : language === 'gu' ? 'તમારો સ્કોર' : 'Your Score'}</span>
              <span className={`text-lg font-bold ${score >= 60 ? 'text-success' : score >= 30 ? 'text-warning-foreground' : 'text-destructive'}`}>
                {score}/100
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${score >= 60 ? 'bg-success' : score >= 30 ? 'bg-warning' : 'bg-destructive'}`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            {/* Chat Header */}
            <div className="bg-destructive/10 border-b border-border p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {language === 'hi' ? 'अज्ञात कॉलर' : language === 'gu' ? 'અજાણ્યો કૉલર' : 'Unknown Caller'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'hi' ? 'वीडियो कॉल' : language === 'gu' ? 'વિડિયો કૉલ' : 'Video Call'}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-md' 
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    <p className="text-sm">
                      {getText(msg.text, language)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="typing-indicator flex space-x-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                      <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                      <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Choices */}
            {scene && !isTyping && !selectedChoice && (
              <div className="border-t border-border p-4 space-y-2 animate-fade-in">
                <p className="text-xs text-muted-foreground mb-3">{t('simulate.yourChoice')}:</p>
                {scene.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(choice)}
                    className="w-full text-left p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm"
                  >
                    <span className="font-medium text-primary mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {getText(choice.text, language)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulate;
