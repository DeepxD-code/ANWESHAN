import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useTTS } from '@/hooks/useTTS';

interface Question {
  id: number;
  scenario: { en: string; hi: string; gu: string };
  options: { en: string; hi: string; gu: string; isCorrect: boolean; isPartiallyCorrect?: boolean }[];
  feedbackCorrect: { en: string; hi: string; gu: string };
  feedbackWrong: { en: string; hi: string; gu: string };
}

const questions: Question[] = [
  {
    id: 1,
    scenario: {
      en: "You receive a WhatsApp video call from someone in police uniform showing an ED badge. They say you're involved in a ₹15 lakh money laundering case and must transfer ₹5 lakhs to a 'secure account' in 2 hours or face arrest. What do you do?",
      hi: "आपको पुलिस वर्दी में किसी से WhatsApp वीडियो कॉल आती है जो ED बैज दिखा रहा है। वे कहते हैं कि आप ₹15 लाख मनी लॉन्ड्रिंग मामले में शामिल हैं और 2 घंटे में ₹5 लाख 'सुरक्षित खाते' में ट्रांसफर करना होगा या गिरफ्तारी का सामना करना होगा। आप क्या करते हैं?",
      gu: "તમને પોલીસ ગણવેશ પહેરેલી અને ED બેજ બતાવતી કોઈ વ્યક્તિનો WhatsApp વીડિયો કૉલ આવે છે. તેઓ કહે છે કે તમે ₹15 લાખના મની લોન્ડરિંગ કેસમાં સામેલ છો અને 2 કલાકમાં ₹5 લાખ 'સુરક્ષિત ખાતા' માં ટ્રાન્સફર કરવા પડશે અથવા ધરપકડનો સામનો કરવો પડશે. તમે શું કરશો?"
    },
    options: [
      { en: "Start arranging the money immediately", hi: "तुरंत पैसे की व्यवस्था शुरू करें", gu: "તરત જ પૈસાની વ્યવસ્થા કરવાનું શરૂ કરો", isCorrect: false },
      { en: "Hang up and call ED's official number from their website", hi: "फोन काटें और ED की आधिकारिक वेबसाइट से उनका नंबर कॉल करें", gu: "ફોન કાપી નાખો અને ED ની સત્તાવાર વેબસાઇટ પરથી તેમના નંબર પર કૉલ કરો", isCorrect: true },
      { en: "Ask the caller for their badge number", hi: "कॉलर से उनका बैज नंबर पूछें", gu: "કૉલ કરનારને તેમનો બેજ નંબર પૂછો", isCorrect: false },
      { en: "Forward the call to family WhatsApp group", hi: "कॉल को फैमिली WhatsApp ग्रुप में फॉरवर्ड करें", gu: "કૉલ ફેમિલી WhatsApp ગ્રુપમાં ફોરવર્ડ કરો", isCorrect: false }
    ],
    feedbackCorrect: {
      en: "✅ Good instinct! But 87% of Indians would panic here. Remember: No law enforcement demands immediate money transfer.",
      hi: "✅ अच्छी सूझ! लेकिन 87% भारतीय यहाँ घबरा जाते। याद रखें: कोई भी कानून प्रवर्तन तुरंत पैसे ट्रांसफर की मांग नहीं करता।",
      gu: "✅ સારી સુઝ! પરંતુ 87% ભારતીયો અહીં ગભરાઈ જશે. યાદ રાખો: કોઈ પણ કાયદા અમલીકરણ સંસ્થા તાત્કાલિક નાણાં ટ્રાન્સફર કરવાની માંગ કરતી નથી।"
    },
    feedbackWrong: {
      en: "❌ This is how the scam succeeds. ED never conducts investigations via video call. They send legal notices through post.",
      hi: "❌ इस तरह घोटाला सफल होता है। ED कभी वीडियो कॉल से जांच नहीं करता। वे डाक से कानूनी नोटिस भेजते हैं।",
      gu: "❌ આ રીતે કૌભાંડ સફળ થાય છે. ED ક્યારેય વીડિયો કૉલ દ્વારા તપાસ કરતું નથી. તેઓ પોસ્ટ દ્વારા કાનૂની નોટિસ મોકલે છે."
    }
  },
  {
    id: 2,
    scenario: {
      en: "A voice that sounds EXACTLY like your college friend calls asking for urgent ₹50,000. The voice, accent, speaking style - everything matches. They say 'emergency, can't explain now, will return tomorrow.' What do you do FIRST?",
      hi: "एक आवाज जो बिल्कुल आपके कॉलेज मित्र जैसी लगती है, तुरंत ₹50,000 मांगती है। आवाज, लहजा, बोलने का तरीका - सब मिलता है। वे कहते हैं 'आपातकाल है, अभी समझा नहीं सकता, कल लौटा दूंगा।' आप पहले क्या करते हैं?",
      gu: "બિલકુલ તમારા કૉલેજના મિત્ર જેવો જ અવાજ ધરાવતી વ્યક્તિ તમને તાત્કાલિક ₹50,000 માંગવા માટે કૉલ કરે છે. અવાજ, લહેકો, બોલવાની શૈલી - બધું જ મેચ થાય છે. તેઓ કહે છે 'ઇમરજન્સી છે, અત્યારે સમજાવી શકતો નથી, કાલે પાછા આપી દઈશ.' તમે સૌથી પહેલાં શું કરશો?"
    },
    options: [
      { en: "Send the money immediately - it's my friend", hi: "तुरंत पैसे भेज दें - यह मेरा दोस्त है", gu: "તરત જ પૈસા મોકલો - તે મારો મિત્ર છે", isCorrect: false },
      { en: "Ask a personal question only the real friend would know", hi: "एक व्यक्तिगत सवाल पूछें जो केवल असली दोस्त को पता हो", gu: "એવો અંગત સવાલ પૂછો જે ફક્ત સાચા મિત્રને જ ખબર હોય", isCorrect: true },
      { en: "Call them back on their saved number", hi: "उनके सेव नंबर पर वापस कॉल करें", gu: "તેમના સેવ કરેલા નંબર પર પાછા કૉલ કરો", isCorrect: true },
      { en: "Ignore the call - might be fake", hi: "कॉल इग्नोर करें - नकली हो सकती है", gu: "કૉલને અવગણો - નકલી હોઈ શકે છે", isCorrect: false }
    ],
    feedbackCorrect: {
      en: "✅ This is a deepfake voice scam. AI can clone voices from 15 seconds of audio (Instagram reels, old calls). Always verify with personal questions or callback.",
      hi: "✅ यह डीपफेक वॉइस घोटाला है। AI 15 सेकंड के ऑडियो से आवाज क्लोन कर सकता है। हमेशा व्यक्तिगत प्रश्नों या कॉलबैक से सत्यापित करें।",
      gu: "✅ આ એક ડીપફેક વૉઇસ સ્કેમ છે. AI 15 સેકન્ડના ઑડિયો (ઇન્સ્ટાગ્રામ રીલ્સ, જૂના કૉલ્સ) પરથી અવાજ ક્લોન કરી શકે છે. હંમેશા અંગત પ્રશ્નો અથવા પાછા કૉલ કરીને ચકાસો।"
    },
    feedbackWrong: {
      en: "❌ This is a deepfake voice scam. AI can clone voices from 15 seconds of audio. Never send money without verification.",
      hi: "❌ यह डीपफेक वॉइस घोटाला है। AI 15 सेकंड के ऑडियो से आवाज क्लोन कर सकता है। सत्यापन के बिना कभी पैसे न भेजें।",
      gu: "❌ આ એક ડીપફેક વૉઇસ સ્કેમ છે. AI 15 સેકન્ડના ઑડિયો પરથી અવાજ ક્લોન કરી શકે છે. ચકાસણી વિના ક્યારેય પૈસા મોકલશો નહીં."
    }
  },
  {
    id: 3,
    scenario: {
      en: "You see this WhatsApp forward: 'Government of India giving ₹5,000 to every citizen. Register at gov-india-relief.com within 24 hours.' What do you check FIRST?",
      hi: "आप यह WhatsApp फॉरवर्ड देखते हैं: 'भारत सरकार हर नागरिक को ₹5,000 दे रही है। 24 घंटे में gov-india-relief.com पर रजिस्टर करें।' आप पहले क्या जांचते हैं?",
      gu: "તમે આ WhatsApp ફોરવર્ડ જુઓ છો: 'ભારત સરકાર દરેક નાગરિકને ₹5,000 આપી રહી છે. 24 કલાકમાં gov-india-relief.com પર નોંધણી કરો.' તમે સૌથી પહેલાં શું તપાસશો?"
    },
    options: [
      { en: "Click the link to register quickly", hi: "जल्दी रजिस्टर करने के लिए लिंक क्लिक करें", gu: "ઝડપથી નોંધણી કરવા માટે લિંક પર ક્લિક કરો", isCorrect: false },
      { en: "Verify on the official india.gov.in website", hi: "आधिकारिक india.gov.in वेबसाइट पर सत्यापित करें", gu: "સત્તાવાર india.gov.in વેબસાઇટ પર ચકાસો", isCorrect: true },
      { en: "Forward to friends to spread awareness", hi: "जागरूकता फैलाने के लिए दोस्तों को फॉरवर्ड करें", gu: "જાગૃતિ ફેલાવવા માટે મિત્રોને ફોરવર્ડ કરો", isCorrect: false },
      { en: "Google search the scheme name", hi: "योजना का नाम गूगल सर्च करें", gu: "યોજનાનું નામ ગૂગલ સર્ચ કરો", isCorrect: false, isPartiallyCorrect: true }
    ],
    feedbackCorrect: {
      en: "✅ Real government schemes are announced on official .gov.in domains, PIB press releases, and mainstream media. Typosquatting like 'gov-india-relief.com' is a red flag.",
      hi: "✅ असली सरकारी योजनाएं .gov.in डोमेन, PIB प्रेस रिलीज़ और मुख्यधारा मीडिया पर घोषित होती हैं। 'gov-india-relief.com' जैसी टाइपोस्क्वाटिंग लाल झंडा है।",
      gu: "✅ વાસ્તવિક સરકારી યોજનાઓ સત્તાવાર .gov.in ડોમેન્સ, PIB પ્રેસ રીલીઝ અને મુખ્ય પ્રવાહના માધ્યમો પર જાહેર કરવામાં આવે છે. 'gov-india-relief.com' જેવી ટાઇપોસ્ક્વેટિંગ લાલ ઝંડી (જોખમ) છે."
    },
    feedbackWrong: {
      en: "❌ Never click unknown links! Real schemes are on .gov.in domains. Typosquatting like 'gov-india-relief.com' is a major red flag.",
      hi: "❌ अज्ञात लिंक कभी क्लिक न करें! असली योजनाएं .gov.in डोमेन पर होती हैं।",
      gu: "❌ અજાણી લિંક્સ પર ક્યારેય ક્લિક કરશો નહીં! સાચી યોજનાઓ .gov.in ડોમેન પર હોય છે. 'gov-india-relief.com' જેવી ટાઇપોસ્ક્વેટિંગ મોટી લાલ ઝંડી છે."
    }
  },
  {
    id: 4,
    scenario: {
      en: "You get a job offer email from 'hr@micr0soft.com' (with zero instead of 'o') for a software role. They ask for ₹5,000 registration fee and Aadhaar PDF. This is:",
      hi: "आपको 'hr@micr0soft.com' (o की जगह zero) से सॉफ्टवेयर रोल के लिए नौकरी ऑफर ईमेल मिलता है। वे ₹5,000 रजिस्ट्रेशन फीस और आधार PDF मांगते हैं। यह है:",
      gu: "તમને સોફ્ટવેર રોલ માટે 'hr@micr0soft.com' (જેમાં 'o' ની જગ્યાએ ઝીરો છે) તરફથી નોકરીની ઓફરનો ઇમેઇલ મળે છે. તેઓ ₹5,000 નોંધણી ફી અને આધાર PDF માંગે છે. આ છે:"
    },
    options: [
      { en: "Normal corporate procedure", hi: "सामान्य कॉर्पोरेट प्रक्रिया", gu: "સામાન્ય કોર્પોરેટ પ્રક્રિયા", isCorrect: false },
      { en: "Obvious scam - typosquatting + money demand", hi: "स्पष्ट घोटाला - टाइपोस्क्वाटिंग + पैसे की मांग", gu: "સ્પષ્ટ કૌભાંડ - ટાઇપોસ્ક્વેટિંગ + પૈસાની માંગ", isCorrect: true },
      { en: "Depends on the position offered", hi: "ऑफर की गई पोजीशन पर निर्भर", gu: "ઑફર કરવામાં આવેલી પદ પર આધાર રાખે છે", isCorrect: false },
      { en: "Need to research Microsoft's policies", hi: "Microsoft की नीतियों पर शोध करना होगा", gu: "માઈક્રોસોફ્ટની નીતિઓ પર સંશોધન કરવાની જરૂર છે", isCorrect: false }
    ],
    feedbackCorrect: {
      en: "✅ No legitimate company charges registration fees. Typosquatting (micr0soft vs microsoft) is a major red flag. Microsoft's real domain is @microsoft.com.",
      hi: "✅ कोई वैध कंपनी रजिस्ट्रेशन फीस नहीं लेती। टाइपोस्क्वाटिंग (micr0soft vs microsoft) बड़ा लाल झंडा है। Microsoft का असली डोमेन @microsoft.com है।",
      gu: "✅ કોઈ કાયદેસર કંપની નોંધણી ફી લેતી નથી. ટાઇપોસ્ક્વેટિંગ (micr0soft વિ microsoft) એક મોટી લાલ ઝંડી છે. માઇક્રોસોફ્ટનું સાચું ડોમેન @microsoft.com છે."
    },
    feedbackWrong: {
      en: "❌ This is a classic job scam. No company charges registration fees. Notice 'micr0soft' uses zero instead of 'o' - this is typosquatting.",
      hi: "❌ यह क्लासिक नौकरी घोटाला है। कोई कंपनी रजिस्ट्रेशन फीस नहीं लेती। 'micr0soft' में 'o' की जगह zero है - यह टाइपोस्क्वाटिंग है।",
      gu: "❌ આ એક ક્લાસિક જોબ સ્કેમ છે. કોઈ કંપની નોંધણી ફી લેતી નથી. નોંધ લો કે 'micr0soft' 'o' ની જગ્યાએ ઝીરો વાપરે છે - આ ટાઇપોસ્ક્વેટિંગ છે."
    }
  },
  {
    id: 5,
    scenario: {
      en: "Before clicking ANY link sent via SMS, WhatsApp, or email, what do you verify?",
      hi: "SMS, WhatsApp, या ईमेल से भेजे गए किसी भी लिंक पर क्लिक करने से पहले, आप क्या सत्यापित करते हैं?",
      gu: "SMS, WhatsApp અથવા ઇમેઇલ દ્વારા મોકલેલી કોઈ પણ લિંક પર ક્લિક કરતા પહેલાં, તમે શું ચકાસો છો?"
    },
    options: [
      { en: "Never verify - I trust the sender", hi: "कभी सत्यापित नहीं करता - मुझे भेजने वाले पर भरोसा है", gu: "ક્યારેય ચકાસતો નથી - મને મોકલનાર પર વિશ્વાસ છે", isCorrect: false },
      { en: "Check if it's from an official domain and doesn't use urgency tactics", hi: "जांचें कि यह आधिकारिक डोमेन से है और तात्कालिकता रणनीति का उपयोग नहीं करता", gu: "તપાસો કે તે સત્તાવાર ડોમેન પરથી છે અને તે તાત્કાલિક ઉતાવળ કરાવવાની રણનીતિનો ઉપયોગ કરતું નથી", isCorrect: true },
      { en: "Click first, then check if it looks suspicious", hi: "पहले क्लिक करें, फिर देखें कि संदिग्ध लगता है या नहीं", gu: "પહેલાં ક્લિક કરો, પછી તપાસો કે તે શંકાસ્પદ લાગે છે કે નહીં", isCorrect: false },
      { en: "I don't click links at all", hi: "मैं लिंक बिल्कुल क्लिक नहीं करता", gu: "હું લિંક્સ પર બિલકુલ ક્લિક કરતો નથી", isCorrect: false, isPartiallyCorrect: true }
    ],
    feedbackCorrect: {
      en: "✅ 175% increase in phishing attacks (2024). Always verify: Is domain official? Does it use urgency? Is sender verified?",
      hi: "✅ 2024 में फिशिंग हमलों में 175% वृद्धि। हमेशा सत्यापित करें: क्या डोमेन आधिकारिक है? क्या तात्कालिकता का उपयोग है? क्या भेजने वाला सत्यापित है?",
      gu: "✅ ફિશિંગ હુમલાઓમાં 175% નો વધારો થયો છે (2024). હંમેશા ચકાસો: શું ડોમેન સત્તાવાર છે? શું તે તાત્કાલિક ઉતાવળ કરાવે છે? શું મોકલનાર ચકાસાયેલ છે?"
    },
    feedbackWrong: {
      en: "❌ 92% of scams succeed because people click without verifying. Always check the domain and be wary of urgency tactics.",
      hi: "❌ 92% घोटाले सफल होते हैं क्योंकि लोग सत्यापित किए बिना क्लिक करते हैं। हमेशा डोमेन जांचें।",
      gu: "❌ 92% કૌભાંડો સફળ થાય છે કારણ કે લોકો ચકાસણી કર્યા વિના ક્લિક કરે છે. હંમેશા ડોમેન તપાસો અને ઉતાવળ કરાવવાની રણનીતિઓથી સાવધ રહો."
    }
  }
];

const Learn = () => {
  const { t, language } = useLanguage();
  const { addQuizResult, addBadge, hasBadge } = useUserProgress();
  const navigate = useNavigate();
  const { speak, stop, speaking } = useTTS();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [readingSection, setReadingSection] = useState<'scenario' | 'options' | 'feedback' | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (idx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = question.options[selectedAnswer].isCorrect;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    stop();
    setReadingSection(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz complete
      const finalScore = score + (question.options[selectedAnswer!].isCorrect ? 1 : 0);
      const total = questions.length;
      
      // Calculate vulnerability scores
      const authorityScore = Math.max(1, 10 - Math.floor((finalScore / total) * 10));
      const urgencyScore = Math.max(1, 10 - Math.floor((finalScore / total) * 8));
      const technicalScore = Math.min(10, Math.floor((finalScore / total) * 10) + 2);
      
      addQuizResult({
        score: finalScore,
        total,
        authorityScore,
        urgencyScore,
        technicalScore,
      });
      
      // Award badges
      if (!hasBadge('quick-learner')) {
        addBadge({ id: 'quick-learner', name: 'Quick Learner', emoji: '🏆' });
      }
      if (finalScore === total && !hasBadge('perfect-score')) {
        addBadge({ id: 'perfect-score', name: 'Perfect Score', emoji: '💯' });
      }
      if (finalScore >= 4 && !hasBadge('pattern-master')) {
        addBadge({ id: 'pattern-master', name: 'Pattern Master', emoji: '🧠' });
      }
      
      setQuizComplete(true);
    }
  };

  // Auto-play TTS when question changes or feedback shows
  useEffect(() => {
    if (!autoPlay || quizComplete) return;
    
    const playSequence = async () => {
      if (!showFeedback) {
        // Play scenario
        setReadingSection('scenario');
        speak(getScenario(), language);
      } else {
        // Play feedback
        setReadingSection('feedback');
        speak(getFeedbackText(), language);
      }
    };
    
    playSequence();
    
    return () => {
      stop();
    };
  }, [currentQuestion, showFeedback, autoPlay, language, speak, stop, quizComplete]);

  const getScenario = () => {
    if (language === 'hi') return question.scenario.hi;
    if (language === 'gu') return question.scenario.gu;
    return question.scenario.en;
  };

  const getOptionText = (option: any) => {
    if (language === 'hi') return option.hi;
    if (language === 'gu') return option.gu;
    return option.en;
  };

  const getFeedbackText = () => {
    const isCorrect = question.options[selectedAnswer!].isCorrect;
    if (isCorrect) {
      if (language === 'hi') return question.feedbackCorrect.hi;
      if (language === 'gu') return question.feedbackCorrect.gu;
      return question.feedbackCorrect.en;
    } else {
      if (language === 'hi') return question.feedbackWrong.hi;
      if (language === 'gu') return question.feedbackWrong.gu;
      return question.feedbackWrong.en;
    }
  };

  if (quizComplete) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-8 border border-border animate-scale-in">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '📚'}
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {t('results.vulnerability')}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {t('quiz.results.youScored')} {finalScore}/{questions.length}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('results.authority')}</span>
                    <span className="text-sm text-muted-foreground">{Math.max(1, 10 - Math.floor((finalScore / questions.length) * 10))}/10</span>
                  </div>
                  <Progress value={(10 - Math.floor((finalScore / questions.length) * 10)) * 10} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('results.urgency')}</span>
                    <span className="text-sm text-muted-foreground">{Math.max(1, 10 - Math.floor((finalScore / questions.length) * 8))}/10</span>
                  </div>
                  <Progress value={(10 - Math.floor((finalScore / questions.length) * 8)) * 10} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t('results.technical')}</span>
                    <span className="text-sm text-muted-foreground">{Math.min(10, Math.floor((finalScore / questions.length) * 10) + 2)}/10</span>
                  </div>
                  <Progress value={Math.min(100, Math.floor((finalScore / questions.length) * 100) + 20)} className="h-3" />
                </div>
              </div>

              <div className="bg-muted rounded-xl p-6 mb-8">
                <h3 className="font-bold text-foreground mb-3">
                  {t('quiz.results.path')}
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>{t('quiz.results.digitalArrest')}</li>
                  <li>{t('quiz.results.deepfake')}</li>
                  <li>{t('quiz.results.urlSpoofing')}</li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/simulate')} 
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  {t('quiz.results.startSimulation')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                    setScore(0);
                    setAnswers([]);
                    setQuizComplete(false);
                  }} 
                  variant="outline"
                  className="flex-1"
                >
                  {t('quiz.results.retake')}
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('quiz.title')}</h1>
            <p className="text-muted-foreground">{t('quiz.subtitle')}</p>
            
            {/* TTS Controls */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={(e) => setAutoPlay(e.target.checked)}
                  className="rounded border-input"
                />
                Auto-read questions
              </label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => speak(getScenario(), language)}
                  disabled={speaking && readingSection === 'scenario'}
                  className="gap-1"
                >
                  {speaking && readingSection === 'scenario' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const optionTexts = question.options.map(getOptionText).join('. ');
                    speak(optionTexts, language);
                  }}
                  disabled={speaking && readingSection === 'options'}
                  className="gap-1"
                >
                  {speaking && readingSection === 'options' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stop}
                  disabled={!speaking}
                  className="gap-1"
                >
                  <VolumeX className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <div className="bg-card rounded-2xl shadow-card p-8 border border-border animate-fade-in">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              {t('quiz.question')} {currentQuestion + 1}
            </div>
            
            <div className="relative">
              <p className="text-lg text-foreground mb-8 leading-relaxed pr-12">
                {getScenario()}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0"
                onClick={() => speak(getScenario(), language)}
                disabled={speaking && readingSection === 'scenario'}
              >
                {speaking && readingSection === 'scenario' ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selectedAnswer === idx;
                const isCorrect = option.isCorrect;
                
                let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-start space-x-3 ';
                
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass += 'border-success bg-success/10 text-success';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'border-destructive bg-destructive/10 text-destructive';
                  } else {
                    buttonClass += 'border-border bg-muted/50 text-muted-foreground opacity-60';
                  }
                } else if (isSelected) {
                  buttonClass += 'border-primary bg-primary/10 text-primary';
                } else {
                  buttonClass += 'border-border hover:border-primary/50 hover:bg-muted/50 text-foreground';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                       isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {letter}
                    </span>
                    <span className="flex-1 pt-1 pr-8 relative">
                      {getOptionText(option)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(getOptionText(option), language);
                        }}
                        disabled={speaking && readingSection === 'options'}
                      >
                        {speaking && readingSection === 'options' ? (
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </Button>
                    </span>
                    {showFeedback && isCorrect && (
                      <CheckCircle className="h-6 w-6 text-success shrink-0" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="h-6 w-6 text-destructive shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`mt-6 p-4 rounded-xl animate-fade-in relative ${
                question.options[selectedAnswer!].isCorrect 
                  ? 'bg-success/10 border border-success' 
                  : 'bg-destructive/10 border border-destructive'
              }`}>
                <p className="text-foreground pr-10">
                  {getFeedbackText()}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => speak(getFeedbackText(), language)}
                  disabled={speaking && readingSection === 'feedback'}
                >
                  {speaking && readingSection === 'feedback' ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-end">
              {!showFeedback ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="bg-primary hover:bg-primary/90 px-8"
                >
                  {t('quiz.submit')}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90 px-8"
                >
                  {currentQuestion < questions.length - 1 ? t('quiz.next') : t('quiz.results.seeResults')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
