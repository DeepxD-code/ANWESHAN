import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Gamepad2, Search, Clock, TrendingUp, Award, ArrowRight, ArrowLeft, Share2, CheckCircle, XCircle, AlertTriangle, ShieldAlert, Eye, Heart, DollarSign, Brain, Lightbulb, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProgress } from '@/contexts/UserProgressContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

/* ─── Trilingual text helper ─── */
interface T3 { en: string; hi: string; gu: string }
const getText = (obj: T3, lang: string) =>
  lang === 'hi' ? obj.hi : lang === 'gu' ? obj.gu : obj.en;

/* ─── Quiz question type ─── */
interface ModuleQuizQuestion {
  question: T3;
  options: { text: T3; isCorrect: boolean }[];
  explanation: T3;
  tag: T3; // weakness tag if user gets it wrong
}

/* ─── Module data type ─── */
interface ModuleData {
  id: string;
  title: T3;
  subtitle: T3;
  emoji: string;
  color: string;
  insights: { title: T3; points: T3[] }[];
  cheatSheet: T3[];
  quiz: ModuleQuizQuestion[];
}

/* ═══════════════════════════════════════════
   MODULE DATA — Deepfake, Investment, Romance
   ═══════════════════════════════════════════ */

const modules: Record<string, ModuleData> = {
  deepfake: {
    id: 'deepfake',
    title: { en: 'Advanced Deepfake Detection', hi: 'उन्नत डीपफेक डिटेक्शन', gu: 'અદ્યતન ડીપફેક ડિટેક્શન' },
    subtitle: { en: 'Learn to spot AI-generated fake videos, voice cloning, and impersonation attacks', hi: 'AI-जनित नकली वीडियो, वॉयस क्लोनिंग और प्रतिरूपण हमलों को पहचानना सीखें', gu: 'AI-જનરેટેડ નકલી વિડિયો, વૉઇસ ક્લોનિંગ અને ઓળખચોરી હુમલાઓ ઓળખતા શીખો' },
    emoji: '🎭',
    color: 'from-purple-500/20 to-indigo-500/20',
    insights: [
      {
        title: { en: 'How Deepfakes Work', hi: 'डीपफेक कैसे काम करता है', gu: 'ડીપફેક કેવી રીતે કામ કરે છે' },
        points: [
          { en: 'AI neural networks can generate realistic face swaps in real-time video calls', hi: 'AI न्यूरल नेटवर्क रियल-टाइम वीडियो कॉल में यथार्थवादी फेस स्वैप उत्पन्न कर सकते हैं', gu: 'AI ન્યુરલ નેટવર્ક્સ રિયલ-ટાઇમ વિડિયો કૉલમાં વાસ્તવિક ફેસ સ્વેપ જનરેટ કરી શકે છે' },
          { en: 'Voice cloning technology can replicate someone\'s voice with just 3 seconds of sample audio', hi: 'वॉयस क्लोनिंग तकनीक केवल 3 सेकंड के ऑडियो से किसी की आवाज की नकल कर सकती है', gu: 'વૉઇસ ક્લોનિંગ ટેક્નોલોજી માત્ર 3 સેકન્ડના ઑડિયોથી કોઈની અવાજની નકલ કરી શકે છે' },
          { en: 'Scammers use deepfake video of police officers, bank officials, and even family members', hi: 'ठग पुलिस अधिकारियों, बैंक अधिकारियों और परिवार के सदस्यों के डीपफेक वीडियो का उपयोग करते हैं', gu: 'છેતરપિંડીકારો પોલીસ અધિકારીઓ, બેંક અધિકારીઓ અને પરિવારના સભ્યોના ડીપફેક વિડિયોનો ઉપયોગ કરે છે' },
        ]
      },
      {
        title: { en: 'Red Flags to Watch', hi: 'सावधान रहने के संकेत', gu: 'સાવધાન રહેવાના સંકેતો' },
        points: [
          { en: 'Unnatural blinking patterns or frozen facial expressions during video calls', hi: 'वीडियो कॉल के दौरान अप्राकृतिक पलक झपकना या जमे हुए चेहरे के भाव', gu: 'વિડિયો કૉલ દરમિયાન અકુદરતી પલકારા અથવા જામેલા ચહેરાના હાવભાવ' },
          { en: 'Audio-video sync issues — lips don\'t perfectly match the words being spoken', hi: 'ऑडियो-वीडियो सिंक समस्याएं — होंठ बोले जा रहे शब्दों से मेल नहीं खाते', gu: 'ઑડિયો-વિડિયો સિંક સમસ્યાઓ — હોઠ બોલાતા શબ્દો સાથે મેળ ખાતા નથી' },
          { en: 'Unusual lighting or skin texture changes around the face edges', hi: 'चेहरे के किनारों के आसपास असामान्य प्रकाश या त्वचा की बनावट में परिवर्तन', gu: 'ચહેરાની કિનારીઓ આસપાસ અસામાન્ય પ્રકાશ અથવા ત્વચાની રચનામાં ફેરફાર' },
          { en: 'Ask a question only the real person would know — deepfakes can\'t improvise', hi: 'एक ऐसा सवाल पूछें जो केवल असली व्यक्ति ही जानता हो — डीपफेक सुधार नहीं कर सकते', gu: 'એવો પ્રશ્ન પૂછો જે ફક્ત સાચી વ્યક્તિ જ જાણતી હોય — ડીપફેક ઇમ્પ્રોવાઇઝ કરી શકતા નથી' },
        ]
      }
    ],
    cheatSheet: [
      { en: '🔍 Always verify via a separate channel (call back on known number)', hi: '🔍 हमेशा अलग चैनल से सत्यापित करें (ज्ञात नंबर पर वापस कॉल करें)', gu: '🔍 હંમેશા અલગ ચેનલ દ્વારા ચકાસો (જાણીતા નંબર પર પાછા કૉલ કરો)' },
      { en: '🚫 Never transfer money based on a video call alone', hi: '🚫 केवल वीडियो कॉल के आधार पर कभी पैसे ट्रांसफर न करें', gu: '🚫 ફક્ત વિડિયો કૉલના આધારે ક્યારેય પૈસા ટ્રાન્સફર કરશો નહીં' },
      { en: '🤔 Ask personal questions only the real person can answer', hi: '🤔 व्यक्तिगत प्रश्न पूछें जो केवल असली व्यक्ति ही उत्तर दे सके', gu: '🤔 વ્યક્તિગત પ્રશ્નો પૂછો જે ફક્ત સાચી વ્યક્તિ જ જવાબ આપી શકે' },
      { en: '📱 Report deepfake scams to cybercrime.gov.in and call 1930', hi: '📱 डीपफेक घोटालों की रिपोर्ट cybercrime.gov.in पर करें और 1930 पर कॉल करें', gu: '📱 ડીપફેક છેતરપિંડીની ફરિયાદ cybercrime.gov.in પર કરો અને 1930 પર કૉલ કરો' },
    ],
    quiz: [
      {
        question: { en: 'You receive a video call from your "bank manager" asking you to share OTP for account verification. The face and voice seem real. What should you do?', hi: 'आपको अपने "बैंक मैनेजर" से खाता सत्यापन के लिए OTP साझा करने का वीडियो कॉल आता है। चेहरा और आवाज असली लगती है। आपको क्या करना चाहिए?', gu: 'તમને તમારા "બેંક મેનેજર" તરફથી ખાતા ચકાસણી માટે OTP શેર કરવા વિડિયો કૉલ આવે છે. ચહેરો અને અવાજ સાચા લાગે છે. તમારે શું કરવું જોઈએ?' },
        options: [
          { text: { en: 'Share the OTP since the video call looks real', hi: 'OTP साझा करें क्योंकि वीडियो कॉल असली लगती है', gu: 'OTP શેર કરો કારણ કે વિડિયો કૉલ સાચો લાગે છે' }, isCorrect: false },
          { text: { en: 'Hang up and call the bank\'s official number to verify', hi: 'फोन काटें और बैंक के आधिकारिक नंबर पर कॉल करके सत्यापित करें', gu: 'ફોન મૂકો અને બેંકના સત્તાવાર નંબર પર કૉલ કરીને ચકાસો' }, isCorrect: true },
          { text: { en: 'Ask the manager to send an email instead', hi: 'मैनेजर से ईमेल भेजने को कहें', gu: 'મેનેજરને ઈમેલ મોકલવા કહો' }, isCorrect: false },
          { text: { en: 'Share half the OTP digits as a test', hi: 'परीक्षण के रूप में आधे OTP अंक साझा करें', gu: 'પરીક્ષણ તરીકે અડધા OTP અંક શેર કરો' }, isCorrect: false },
        ],
        explanation: { en: 'Banks NEVER ask for OTP via video call. Deepfake technology can perfectly replicate faces. Always verify by calling the official bank number yourself.', hi: 'बैंक कभी भी वीडियो कॉल पर OTP नहीं मांगते। डीपफेक तकनीक चेहरों की पूरी नकल कर सकती है। हमेशा बैंक के आधिकारिक नंबर पर खुद कॉल करके सत्यापित करें।', gu: 'બેંક ક્યારેય વિડિયો કૉલ પર OTP માંગતી નથી. ડીપફેક ટેક્નોલોજી ચહેરાઓની સંપૂર્ણ નકલ કરી શકે છે. હંમેશા બેંકના સત્તાવાર નંબર પર જાતે કૉલ કરીને ચકાસો.' },
        tag: { en: 'Trusts video call authenticity', hi: 'वीडियो कॉल प्रामाणिकता पर भरोसा', gu: 'વિડિયો કૉલ પ્રમાણિકતા પર ભરોસો' },
      },
      {
        question: { en: 'Your relative sends a WhatsApp voice note asking for ₹50,000 urgently. The voice sounds exactly like them. What is the safest action?', hi: 'आपके रिश्तेदार ₹50,000 की तत्काल मांग करते हुए WhatsApp वॉयस नोट भेजते हैं। आवाज बिल्कुल उनकी जैसी लगती है। सबसे सुरक्षित कार्रवाई क्या है?', gu: 'તમારા સગાએ ₹50,000 ની તાત્કાલિક માંગણી કરતો WhatsApp વૉઇસ નોટ મોકલ્યો. અવાજ બિલકુલ એમના જેવો લાગે છે. સૌથી સુરક્ષિત પગલું શું છે?' },
        options: [
          { text: { en: 'Send the money immediately — the voice is clearly theirs', hi: 'तुरंत पैसे भेजें — आवाज स्पष्ट रूप से उनकी है', gu: 'તરત જ પૈસા મોકલો — અવાજ સ્પષ્ટ રીતે એમની છે' }, isCorrect: false },
          { text: { en: 'Call the relative directly on their known phone number to confirm', hi: 'पुष्टि के लिए रिश्तेदार को उनके ज्ञात फोन नंबर पर सीधे कॉल करें', gu: 'પુષ્ટિ માટે સગાને એમના જાણીતા ફોન નંબર પર સીધા કૉલ કરો' }, isCorrect: true },
          { text: { en: 'Reply on WhatsApp asking for more details', hi: 'अधिक विवरण मांगते हुए WhatsApp पर जवाब दें', gu: 'વધુ વિગતો માંગતા WhatsApp પર જવાબ આપો' }, isCorrect: false },
          { text: { en: 'Send a smaller amount first to test', hi: 'परीक्षण के लिए पहले छोटी राशि भेजें', gu: 'પરીક્ષણ માટે પહેલા નાની રકમ મોકલો' }, isCorrect: false },
        ],
        explanation: { en: 'Voice cloning can replicate anyone\'s voice with just seconds of audio. ALWAYS verify money requests through a direct phone call on a known number, never through the same channel the request came from.', hi: 'वॉयस क्लोनिंग कुछ सेकंड के ऑडियो से किसी की भी आवाज की नकल कर सकती है। पैसे के अनुरोधों को हमेशा ज्ञात नंबर पर सीधे फोन कॉल से सत्यापित करें।', gu: 'વૉઇસ ક્લોનિંગ થોડી સેકન્ડના ઑડિયોથી કોઈની પણ અવાજની નકલ કરી શકે છે. પૈસાની વિનંતીઓ હંમેશા જાણીતા નંબર પર સીધા ફોન કૉલ દ્વારા ચકાસો.' },
        tag: { en: 'Vulnerable to voice cloning', hi: 'वॉयस क्लोनिंग के प्रति संवेदनशील', gu: 'વૉઇસ ક્લોનિંગ પ્રત્યે સંવેદનશીલ' },
      },
      {
        question: { en: 'During a deepfake video call, which of these is the BEST way to verify the caller\'s identity?', hi: 'डीपफेक वीडियो कॉल के दौरान, कॉलर की पहचान सत्यापित करने का सबसे अच्छा तरीका कौन सा है?', gu: 'ડીપફેક વિડિયો કૉલ દરમિયાન, કૉલરની ઓળખ ચકાસવાનો શ્રેષ્ઠ રસ્તો ક્યો છે?' },
        options: [
          { text: { en: 'Check if the video quality is HD', hi: 'जांचें कि क्या वीडियो गुणवत्ता HD है', gu: 'તપાસો કે વિડિયો ગુણવત્તા HD છે કે નહીં' }, isCorrect: false },
          { text: { en: 'Ask them to turn their head sideways and show their ear', hi: 'उन्हें सिर बगल में घुमाने और कान दिखाने को कहें', gu: 'એમને માથું બાજુમાં ફેરવવા અને કાન બતાવવા કહો' }, isCorrect: true },
          { text: { en: 'Look at the background to verify their location', hi: 'उनका स्थान सत्यापित करने के लिए पृष्ठभूमि देखें', gu: 'એમનું સ્થાન ચકાસવા પૃષ્ઠભૂમિ જુઓ' }, isCorrect: false },
          { text: { en: 'Ask them to type something in chat', hi: 'उन्हें चैट में कुछ टाइप करने को कहें', gu: 'એમને ચેટમાં કંઈક ટાઇપ કરવા કહો' }, isCorrect: false },
        ],
        explanation: { en: 'Current deepfake models struggle with side profiles and ears. Asking them to turn their head is a simple but effective detection method. Backgrounds can be faked, and chat doesn\'t verify the video caller.', hi: 'वर्तमान डीपफेक मॉडल साइड प्रोफाइल और कानों के साथ संघर्ष करते हैं। सिर घुमाने के लिए कहना एक सरल लेकिन प्रभावी पहचान विधि है।', gu: 'હાલના ડીપફેક મોડેલ્સ સાઇડ પ્રોફાઇલ અને કાન સાથે મુશ્કેલી અનુભવે છે. માથું ફેરવવા કહેવું એ સરળ પણ અસરકારક ડિટેક્શન પદ્ધતિ છે.' },
        tag: { en: 'Lacks deepfake detection techniques', hi: 'डीपफेक पहचान तकनीक का अभाव', gu: 'ડીપફેક ડિટેક્શન ટેકનિકનો અભાવ' },
      },
      {
        question: { en: 'A "police officer" on video call shows you an official-looking arrest warrant with your name. They demand immediate payment to "settle the case." What is the correct response?', hi: 'वीडियो कॉल पर एक "पुलिस अधिकारी" आपको आपके नाम का आधिकारिक दिखने वाला गिरफ्तारी वारंट दिखाता है। वे "मामला निपटाने" के लिए तत्काल भुगतान की मांग करते हैं। सही प्रतिक्रिया क्या है?', gu: 'વિડિયો કૉલ પર એક "પોલીસ અધિકારી" તમને તમારા નામનું સત્તાવાર દેખાતું ધરપકડ વૉરંટ બતાવે છે. એ "કેસ સેટલ કરવા" માટે તાત્કાલિક ચુકવણીની માંગ કરે છે. સાચો પ્રતિભાવ શું છે?' },
        options: [
          { text: { en: 'Pay immediately to avoid arrest', hi: 'गिरफ्तारी से बचने के लिए तुरंत भुगतान करें', gu: 'ધરપકડ ટાળવા તરત જ ચુકવણી કરો' }, isCorrect: false },
          { text: { en: 'Ask them to send it to your lawyer', hi: 'उन्हें अपने वकील को भेजने को कहें', gu: 'એમને તમારા વકીલને મોકલવા કહો' }, isCorrect: false },
          { text: { en: 'Hang up — real police serve warrants in person, never demand payment on calls', hi: 'फोन काटें — असली पुलिस व्यक्तिगत रूप से वारंट भेजती है, कॉल पर भुगतान की मांग नहीं करती', gu: 'ફોન મૂકો — સાચી પોલીસ વ્યક્તિગત રીતે વૉરંટ આપે છે, કૉલ પર ચુકવણીની માંગ કરતી નથી' }, isCorrect: true },
          { text: { en: 'Record the call for evidence', hi: 'सबूत के लिए कॉल रिकॉर्ड करें', gu: 'પુરાવા માટે કૉલ રેકોર્ડ કરો' }, isCorrect: false },
        ],
        explanation: { en: 'Indian police NEVER demand payment on video calls and arrest warrants are served physically by court officers. This is a classic digital arrest scam. Hang up and report to 1930.', hi: 'भारतीय पुलिस कभी भी वीडियो कॉल पर भुगतान की मांग नहीं करती और गिरफ्तारी वारंट न्यायालय अधिकारियों द्वारा व्यक्तिगत रूप से दिए जाते हैं। 1930 पर रिपोर्ट करें।', gu: 'ભારતીય પોલીસ ક્યારેય વિડિયો કૉલ પર ચુકવણીની માંગ કરતી નથી અને ધરપકડ વૉરંટ કોર્ટ અધિકારીઓ દ્વારા વ્યક્તિગત રીતે આપવામાં આવે છે. 1930 પર ફરિયાદ કરો.' },
        tag: { en: 'Susceptible to authority impersonation', hi: 'प्राधिकार प्रतिरूपण के प्रति संवेदनशील', gu: 'સત્તા ઓળખચોરી પ્રત્યે સંવેદનશીલ' },
      },
    ],
  },

  investment: {
    id: 'investment',
    title: { en: 'Investment Scam Protection', hi: 'निवेश घोटाला सुरक्षा', gu: 'રોકાણ છેતરપિંડી સુરક્ષા' },
    subtitle: { en: 'Identify fake investment schemes, Ponzi patterns, and "guaranteed return" traps', hi: 'नकली निवेश योजनाओं, पोंजी पैटर्न और "गारंटीड रिटर्न" जाल की पहचान करें', gu: 'નકલી રોકાણ યોજનાઓ, પોન્ઝી પેટર્ન અને "ગેરંટીડ રિટર્ન" જાળ ઓળખો' },
    emoji: '💰',
    color: 'from-amber-500/20 to-orange-500/20',
    insights: [
      {
        title: { en: 'Common Investment Scam Tactics', hi: 'सामान्य निवेश घोटाला रणनीतियाँ', gu: 'સામાન્ય રોકાણ છેતરપિંડી યુક્તિઓ' },
        points: [
          { en: 'Promise of guaranteed returns above 12% annually — no legitimate investment guarantees this', hi: '12% से अधिक वार्षिक गारंटीड रिटर्न का वादा — कोई वैध निवेश इसकी गारंटी नहीं देता', gu: 'વાર્ષિક 12% થી વધુ ગેરંટીડ રિટર્નનું વચન — કોઈ કાયદેસર રોકાણ આની ગેરંટી આપતું નથી' },
          { en: 'Pressure to invest NOW with "limited time" offers, creating artificial urgency', hi: '"सीमित समय" ऑफर के साथ अभी निवेश करने का दबाव, कृत्रिम तत्काल बनाना', gu: '"મર્યાદિત સમય" ઑફર સાથે હમણાં જ રોકાણ કરવાનું દબાણ, કૃત્રિમ તાકીદ ઊભી કરવી' },
          { en: 'Fake testimonials from "successful investors" with screenshots of fake profits', hi: 'नकली मुनाफे के स्क्रीनशॉट के साथ "सफल निवेशकों" से नकली प्रशंसापत्र', gu: 'નકલી નફાના સ્ક્રીનશોટ સાથે "સફળ રોકાણકારો" ના નકલી પ્રશંસાપત્રો' },
          { en: 'WhatsApp/Telegram groups showing daily "profits" to lure new victims', hi: 'नए पीड़ितों को लुभाने के लिए दैनिक "लाभ" दिखाने वाले WhatsApp/Telegram ग्रुप', gu: 'નવા ભોગીઓને આકર્ષવા દૈનિક "નફો" બતાવતા WhatsApp/Telegram ગ્રુપ' },
        ]
      },
      {
        title: { en: 'How to Verify Investment Legitimacy', hi: 'निवेश की वैधता कैसे सत्यापित करें', gu: 'રોકાણની કાયદેસરતા કેવી રીતે ચકાસવી' },
        points: [
          { en: 'Check if the company is registered with SEBI (Securities and Exchange Board of India)', hi: 'जांचें कि क्या कंपनी SEBI (भारतीय प्रतिभूति और विनिमय बोर्ड) में पंजीकृत है', gu: 'તપાસો કે કંપની SEBI (ભારતીય સિક્યુરિટીઝ એન્ડ એક્સચેન્જ બોર્ડ) માં નોંધાયેલ છે કે નહીં' },
          { en: 'Verify RBI registration for any entity claiming to accept deposits', hi: 'जमा स्वीकार करने का दावा करने वाली किसी भी इकाई के लिए RBI पंजीकरण सत्यापित करें', gu: 'ડિપોઝિટ સ્વીકારવાનો દાવો કરતી કોઈપણ સંસ્થા માટે RBI નોંધણી ચકાસો' },
          { en: 'Search for the scheme on SEBI\'s "Investor Alert" page for known frauds', hi: 'ज्ञात धोखाधड़ी के लिए SEBI के "निवेशक चेतावनी" पेज पर योजना खोजें', gu: 'જાણીતી છેતરપિંડી માટે SEBI ના "રોકાણકાર ચેતવણી" પેજ પર યોજના શોધો' },
        ]
      }
    ],
    cheatSheet: [
      { en: '🚫 "Guaranteed returns" = guaranteed scam', hi: '🚫 "गारंटीड रिटर्न" = गारंटीड घोटाला', gu: '🚫 "ગેરંટીડ રિટર્ન" = ગેરંટીડ છેતરપિંડી' },
      { en: '📋 Always verify SEBI/RBI registration before investing', hi: '📋 निवेश से पहले हमेशा SEBI/RBI पंजीकरण सत्यापित करें', gu: '📋 રોકાણ કરતા પહેલા હંમેશા SEBI/RBI નોંધણી ચકાસો' },
      { en: '⏰ "Invest NOW or miss out" = pressure tactic, walk away', hi: '⏰ "अभी निवेश करें या मौका खो दें" = दबाव रणनीति, दूर चलें', gu: '⏰ "હમણાં રોકાણ કરો અથવા તક ગુમાવો" = દબાણ યુક્તિ, દૂર ચાલ્યા જાઓ' },
      { en: '👥 Never invest because friends/family did — they might be victims too', hi: '👥 दोस्तों/परिवार ने किया इसलिए कभी निवेश न करें — वे भी पीड़ित हो सकते हैं', gu: '👥 મિત્રો/પરિવારે કર્યું એટલે ક્યારેય રોકાણ કરશો નહીં — એ પણ ભોગ બન્યા હોઈ શકે' },
    ],
    quiz: [
      {
        question: { en: 'A WhatsApp group shows daily profits of 5% from crypto trading. Members share screenshots of their earnings. What is the most likely reality?', hi: 'एक WhatsApp ग्रुप क्रिप्टो ट्रेडिंग से 5% दैनिक लाभ दिखाता है। सदस्य अपनी कमाई के स्क्रीनशॉट साझा करते हैं। सबसे संभावित सच्चाई क्या है?', gu: 'એક WhatsApp ગ્રુપ ક્રિપ્ટો ટ્રેડિંગમાંથી 5% દૈનિક નફો બતાવે છે. સભ્યો પોતાની કમાણીના સ્ક્રીનશોટ શેર કરે છે. સૌથી સંભવિત વાસ્તવિકતા શું છે?' },
        options: [
          { text: { en: 'It\'s a legitimate trading group with real profits', hi: 'यह वास्तविक मुनाफे वाला एक वैध ट्रेडिंग ग्रुप है', gu: 'આ વાસ્તવિક નફા સાથેનું કાયદેસર ટ્રેડિંગ ગ્રુપ છે' }, isCorrect: false },
          { text: { en: 'It\'s a Ponzi scheme — early members are paid with new members\' money', hi: 'यह एक पोंजी योजना है — पुराने सदस्यों को नए सदस्यों के पैसे से भुगतान किया जाता है', gu: 'આ પોન્ઝી યોજના છે — જૂના સભ્યોને નવા સભ્યોના પૈસાથી ચુકવણી કરવામાં આવે છે' }, isCorrect: true },
          { text: { en: 'The profits are slightly exaggerated but otherwise fine', hi: 'मुनाफा थोड़ा बढ़ा-चढ़ा कर बताया गया है लेकिन अन्यथा ठीक है', gu: 'નફો થોડો વધારીને બતાવ્યો છે પણ બાકી ઠીક છે' }, isCorrect: false },
          { text: { en: 'Join but invest only a small amount to test', hi: 'शामिल हों लेकिन परीक्षण के लिए केवल छोटी राशि निवेश करें', gu: 'જોડાઓ પણ પરીક્ષણ માટે ફક્ત નાની રકમ રોકો' }, isCorrect: false },
        ],
        explanation: { en: '5% daily returns = 1,825% annual returns. No legitimate investment offers this. This is a classic Ponzi scheme where initial "profits" are paid from new investors\' deposits.', hi: '5% दैनिक रिटर्न = 1,825% वार्षिक रिटर्न। कोई वैध निवेश ऐसा नहीं देता। यह एक क्लासिक पोंजी योजना है।', gu: '5% દૈનિક રિટર્ન = 1,825% વાર્ષિક રિટર્ન. કોઈ કાયદેસર રોકાણ આ આપતું નથી. આ ક્લાસિક પોન્ઝી યોજના છે.' },
        tag: { en: 'Attracted by unrealistic returns', hi: 'अवास्तविक रिटर्न से आकर्षित', gu: 'અવાસ્તવિક રિટર્ન્સથી આકર્ષિત' },
      },
      {
        question: { en: 'Your neighbor says they doubled their money in 3 months through a "government-backed scheme." They show you their account statement. What should you do?', hi: 'आपका पड़ोसी कहता है कि उसने "सरकारी योजना" के माध्यम से 3 महीने में पैसे दोगुने कर लिए। वे अपना खाता विवरण दिखाते हैं। आपको क्या करना चाहिए?', gu: 'તમારા પાડોશી કહે છે કે તેમણે "સરકારી યોજના" દ્વારા 3 મહિનામાં પૈસા બમણા કર્યા. તે પોતાનું ખાતા સ્ટેટમેન્ટ બતાવે છે. તમારે શું કરવું જોઈએ?' },
        options: [
          { text: { en: 'Invest immediately since a neighbor you trust has benefited', hi: 'तुरंत निवेश करें क्योंकि एक विश्वसनीय पड़ोसी को लाभ हुआ है', gu: 'તરત જ રોકાણ કરો કારણ કે વિશ્વસનીય પાડોશીને ફાયદો થયો છે' }, isCorrect: false },
          { text: { en: 'Check if the scheme is registered with SEBI/RBI before investing', hi: 'निवेश से पहले जांचें कि क्या योजना SEBI/RBI में पंजीकृत है', gu: 'રોકાણ કરતા પહેલા તપાસો કે યોજના SEBI/RBI માં નોંધાયેલ છે કે નહીં' }, isCorrect: true },
          { text: { en: 'Invest half the amount they suggest', hi: 'उनके सुझाव की आधी राशि निवेश करें', gu: 'એમના સૂચન મુજબ અડધી રકમ રોકો' }, isCorrect: false },
          { text: { en: 'Wait for one more month to see their results', hi: 'उनके परिणाम देखने के लिए एक और महीना इंतजार करें', gu: 'એમના પરિણામ જોવા વધુ એક મહિનો રાહ જુઓ' }, isCorrect: false },
        ],
        explanation: { en: 'No government scheme doubles money in 3 months. Your neighbor might be an early victim in a Ponzi scheme getting paid with others\' money. Always verify with official SEBI/RBI registrations.', hi: 'कोई सरकारी योजना 3 महीने में पैसे दोगुने नहीं करती। आपका पड़ोसी पोंजी योजना का शुरुआती शिकार हो सकता है। हमेशा SEBI/RBI पंजीकरण से सत्यापित करें।', gu: 'કોઈ સરકારી યોજના 3 મહિનામાં પૈસા બમણા કરતી નથી. તમારા પાડોશી પોન્ઝી યોજનાનો પ્રારંભિક ભોગ હોઈ શકે. હંમેશા SEBI/RBI નોંધણીથી ચકાસો.' },
        tag: { en: 'Influenced by social proof', hi: 'सामाजिक प्रमाण से प्रभावित', gu: 'સામાજિક પુરાવાથી પ્રભાવિત' },
      },
      {
        question: { en: 'An investment app shows your ₹10,000 has grown to ₹15,000 in a week. But when you try to withdraw, they ask for a "tax payment" of ₹5,000. What is happening?', hi: 'एक निवेश ऐप दिखाता है कि आपके ₹10,000 एक सप्ताह में ₹15,000 हो गए। लेकिन निकासी करने पर वे ₹5,000 का "कर भुगतान" मांगते हैं। क्या हो रहा है?', gu: 'એક રોકાણ એપ બતાવે છે કે તમારા ₹10,000 એક અઠવાડિયામાં ₹15,000 થયા. પણ ઉપાડવા જાઓ ત્યારે ₹5,000 નો "ટેક્સ ચુકવણી" માંગે છે. શું થઈ રહ્યું છે?' },
        options: [
          { text: { en: 'Normal tax procedure — pay the ₹5,000 to get ₹15,000 back', hi: 'सामान्य कर प्रक्रिया — ₹15,000 वापस पाने के लिए ₹5,000 का भुगतान करें', gu: 'સામાન્ય ટેક્સ પ્રક્રિયા — ₹15,000 પાછા મેળવવા ₹5,000 ચૂકવો' }, isCorrect: false },
          { text: { en: 'It\'s an advance fee fraud — the "profit" is fake and you\'ll lose the ₹5,000 too', hi: 'यह एक अग्रिम शुल्क धोखाधड़ी है — "लाभ" नकली है और आप ₹5,000 भी खो देंगे', gu: 'આ એડવાન્સ ફી છેતરપિંડી છે — "નફો" નકલી છે અને ₹5,000 પણ ગુમાવશો' }, isCorrect: true },
          { text: { en: 'Negotiate for lower tax amount', hi: 'कम कर राशि के लिए बातचीत करें', gu: 'ઓછી ટેક્સ રકમ માટે વાટાઘાટ કરો' }, isCorrect: false },
          { text: { en: 'Pay ₹5,000 but ask for a tax receipt', hi: '₹5,000 का भुगतान करें लेकिन कर रसीद मांगें', gu: '₹5,000 ચૂકવો પણ ટેક્સ રસીદ માંગો' }, isCorrect: false },
        ],
        explanation: { en: 'This is "advance fee fraud." The displayed profit is fake numbers on screen. Once you pay the ₹5,000 "tax," they will ask for more fees, and you\'ll never get any money back. Legitimate platforms deduct tax automatically.', hi: 'यह "अग्रिम शुल्क धोखाधड़ी" है। प्रदर्शित लाभ स्क्रीन पर नकली संख्याएं हैं। ₹5,000 "कर" का भुगतान करने के बाद वे और शुल्क मांगेंगे। वैध प्लेटफॉर्म स्वचालित रूप से कर काटते हैं।', gu: 'આ "એડવાન્સ ફી છેતરપિંડી" છે. બતાવેલો નફો સ્ક્રીન પરના નકલી નંબર છે. ₹5,000 "ટેક્સ" ચૂકવ્યા પછી વધુ ફી માંગશે. કાયદેસર પ્લેટફોર્મ આપમેળે ટેક્સ કાપે છે.' },
        tag: { en: 'Falls for advance fee traps', hi: 'अग्रिम शुल्क जाल में फंसते हैं', gu: 'એડવાન્સ ફી જાળમાં ફસાય છે' },
      },
      {
        question: { en: 'Which of these is a legitimate way for senior citizens to invest their savings?', hi: 'वरिष्ठ नागरिकों के लिए अपनी बचत निवेश करने का कौन सा वैध तरीका है?', gu: 'વરિષ્ઠ નાગરિકો માટે પોતાની બચત રોકવાનો ક્યો કાયદેસર રસ્તો છે?' },
        options: [
          { text: { en: 'A Telegram group promising 20% monthly returns on crypto', hi: '20% मासिक क्रिप्टो रिटर्न का वादा करने वाला Telegram ग्रुप', gu: '20% માસિક ક્રિપ્ટો રિટર્નનું વચન આપતું Telegram ગ્રુપ' }, isCorrect: false },
          { text: { en: 'Senior Citizens Savings Scheme (SCSS) from post office or authorized banks', hi: 'डाकघर या अधिकृत बैंकों से वरिष्ठ नागरिक बचत योजना (SCSS)', gu: 'પોસ્ટ ઑફિસ અથવા અધિકૃત બેંકોમાંથી વરિષ્ઠ નાગરિક બચત યોજના (SCSS)' }, isCorrect: true },
          { text: { en: 'Friend\'s startup that promises to triple money in 6 months', hi: 'दोस्त का स्टार्टअप जो 6 महीने में पैसे तीन गुना करने का वादा करता है', gu: 'મિત્રનું સ્ટાર્ટઅપ જે 6 મહિનામાં પૈસા ત્રણ ગણા કરવાનું વચન આપે છે' }, isCorrect: false },
          { text: { en: 'Online gold trading platform found on social media', hi: 'सोशल मीडिया पर मिला ऑनलाइन सोना ट्रेडिंग प्लेटफॉर्म', gu: 'સોશિયલ મીડિયા પર મળેલું ઓનલાઈન ગોલ્ડ ટ્રેડિંગ પ્લેટફોર્મ' }, isCorrect: false },
        ],
        explanation: { en: 'SCSS is a government-backed scheme specifically designed for senior citizens with guaranteed returns (~8.2% p.a.) and full protection of principal. Always choose regulated instruments over social media promises.', hi: 'SCSS वरिष्ठ नागरिकों के लिए सरकार समर्थित योजना है जिसमें गारंटीड रिटर्न (~8.2% प्रति वर्ष) और मूलधन की पूर्ण सुरक्षा है। सोशल मीडिया वादों पर नियमित उपकरण चुनें।', gu: 'SCSS વરિષ્ઠ નાગરિકો માટે સરકાર સમર્થિત યોજના છે જેમાં ગેરંટીડ રિટર્ન (~8.2% વાર્ષિક) અને મૂળ રકમનું સંપૂર્ણ રક્ષણ છે. સોશિયલ મીડિયા વચનો કરતાં નિયંત્રિત સાધનો પસંદ કરો.' },
        tag: { en: 'Unaware of legitimate investment options', hi: 'वैध निवेश विकल्पों से अनजान', gu: 'કાયદેસર રોકાણ વિકલ્પોથી અજાણ' },
      },
    ],
  },

  romance: {
    id: 'romance',
    title: { en: 'Romance Scam Red Flags', hi: 'रोमांस घोटाला लाल झंडे', gu: 'રોમાન્સ છેતરપિંડી લાલ ઝંડા' },
    subtitle: { en: 'Recognize emotional manipulation, catfishing, and relationship-based fraud tactics', hi: 'भावनात्मक हेरफेर, कैटफिशिंग और रिश्ते-आधारित धोखाधड़ी रणनीति को पहचानें', gu: 'ભાવનાત્મક મેનિપ્યુલેશન, કેટફિશિંગ અને સંબંધ-આધારિત છેતરપિંડી યુક્તિઓ ઓળખો' },
    emoji: '💔',
    color: 'from-rose-500/20 to-pink-500/20',
    insights: [
      {
        title: { en: 'How Romance Scams Work', hi: 'रोमांस घोटाला कैसे काम करता है', gu: 'રોમાન્સ છેતરપિંડી કેવી રીતે કામ કરે છે' },
        points: [
          { en: 'Scammer builds emotional connection over weeks/months before asking for money', hi: 'ठग पैसे मांगने से पहले हफ्तों/महीनों तक भावनात्मक संबंध बनाता है', gu: 'છેતરપિંડીકાર પૈસા માંગતા પહેલા અઠવાડિયા/મહિનાઓ સુધી ભાવનાત્મક સંબંધ બાંધે છે' },
          { en: 'They claim to be NRI professionals, military personnel, or overseas doctors', hi: 'वे NRI पेशेवर, सैन्य कर्मी या विदेशी डॉक्टर होने का दावा करते हैं', gu: 'તેઓ NRI પ્રોફેશનલ, લશ્કરી કર્મચારી અથવા વિદેશી ડૉક્ટર હોવાનો દાવો કરે છે' },
          { en: 'Excuses for never meeting in person — always traveling, in a conflict zone, or having visa issues', hi: 'व्यक्तिगत रूप से कभी न मिलने के बहाने — हमेशा यात्रा पर, संघर्ष क्षेत्र में, या वीज़ा समस्याएं', gu: 'વ્યક્તિગત રીતે ક્યારેય ન મળવાના બહાના — હંમેશા મુસાફરીમાં, સંઘર્ષ ક્ષેત્રમાં, અથવા વિઝા સમસ્યાઓ' },
          { en: 'Eventually ask for money for "medical emergency," "travel to meet you," or "customs fees"', hi: 'अंततः "चिकित्सा आपातकाल," "आपसे मिलने की यात्रा," या "सीमा शुल्क" के लिए पैसे मांगते हैं', gu: 'આખરે "તબીબી ઈમરજન્સી," "તમને મળવા મુસાફરી," અથવા "કસ્ટમ ફી" માટે પૈસા માંગે છે' },
        ]
      },
      {
        title: { en: 'Warning Signs', hi: 'चेतावनी के संकेत', gu: 'ચેતવણીના સંકેતો' },
        points: [
          { en: 'Profile photos look too perfect — often stolen from models or other social media profiles', hi: 'प्रोफ़ाइल फ़ोटो बहुत परफेक्ट दिखती हैं — अक्सर मॉडल या अन्य सोशल मीडिया से चुराई जाती हैं', gu: 'પ્રોફાઇલ ફોટા ખૂબ પરફેક્ટ લાગે છે — ઘણી વાર મોડેલ્સ અથવા અન્ય સોશિયલ મીડિયામાંથી ચોરાયેલા હોય છે' },
          { en: 'Love bombing — excessive flattery and declarations of love very early in conversation', hi: 'लव बॉम्बिंग — बातचीत में बहुत जल्दी अत्यधिक चापलूसी और प्रेम की घोषणाएं', gu: 'લવ બોમ્બિંગ — વાતચીતમાં ખૂબ જ વહેલા અતિશય ખુશામત અને પ્રેમની ઘોષણાઓ' },
          { en: 'They always have a reason why they can\'t video call — "camera is broken," "poor internet"', hi: 'उनके पास हमेशा वीडियो कॉल न कर पाने का कारण होता है — "कैमरा खराब है," "खराब इंटरनेट"', gu: 'એમની પાસે હંમેશા વિડિયો કૉલ ન કરી શકવાનું કારણ હોય છે — "કેમેરો ખરાબ છે," "નબળું ઇન્ટરનેટ"' },
        ]
      }
    ],
    cheatSheet: [
      { en: '❤️ Real love doesn\'t ask for money via wire transfer', hi: '❤️ सच्चा प्यार वायर ट्रांसफर से पैसे नहीं मांगता', gu: '❤️ સાચો પ્રેમ વાયર ટ્રાન્સફર દ્વારા પૈસા માંગતો નથી' },
      { en: '🔍 Reverse image search their profile photos on Google', hi: '🔍 Google पर उनकी प्रोफ़ाइल फ़ोटो को रिवर्स इमेज सर्च करें', gu: '🔍 Google પર એમના પ્રોફાઇલ ફોટાની રિવર્સ ઇમેજ સર્ચ કરો' },
      { en: '📹 If they never video call — they\'re likely not real', hi: '📹 अगर वे कभी वीडियो कॉल नहीं करते — वे शायद असली नहीं हैं', gu: '📹 જો તેઓ ક્યારેય વિડિયો કૉલ ન કરે — તેઓ સંભવતઃ સાચા નથી' },
      { en: '🆘 Talk to family before sending money to online contacts', hi: '🆘 ऑनलाइन संपर्कों को पैसे भेजने से पहले परिवार से बात करें', gu: '🆘 ઓનલાઈન સંપર્કોને પૈસા મોકલતા પહેલા પરિવાર સાથે વાત કરો' },
    ],
    quiz: [
      {
        question: { en: 'An online friend you\'ve chatted with for 2 months says they need ₹2 lakh for a medical emergency. They\'ve never video called you. What should you do?', hi: 'एक ऑनलाइन मित्र जिनसे आप 2 महीने से चैट कर रहे हैं, कहते हैं कि उन्हें चिकित्सा आपातकाल के लिए ₹2 लाख चाहिए। उन्होंने आपको कभी वीडियो कॉल नहीं किया। आपको क्या करना चाहिए?', gu: 'એક ઓનલાઈન મિત્ર જેની સાથે તમે 2 મહિનાથી ચેટ કરો છો, કહે છે કે તેમને તબીબી ઈમરજન્સી માટે ₹2 લાખ જોઈએ છે. તેમણે તમને ક્યારેય વિડિયો કૉલ કર્યો નથી. તમારે શું કરવું જોઈએ?' },
        options: [
          { text: { en: 'Send the money — they\'re in an emergency', hi: 'पैसे भेजें — वे आपातकाल में हैं', gu: 'પૈસા મોકલો — તેઓ ઈમરજન્સીમાં છે' }, isCorrect: false },
          { text: { en: 'Refuse and block them — this is a classic romance scam pattern', hi: 'मना करें और ब्लॉक करें — यह एक क्लासिक रोमांस घोटाला पैटर्न है', gu: 'ના પાડો અને બ્લૉક કરો — આ ક્લાસિક રોમાન્સ છેતરપિંડી પેટર્ન છે' }, isCorrect: true },
          { text: { en: 'Send half the amount to help', hi: 'मदद के लिए आधी रकम भेजें', gu: 'મદદ માટે અડધી રકમ મોકલો' }, isCorrect: false },
          { text: { en: 'Ask for a photo of the hospital bill', hi: 'अस्पताल बिल की फोटो मांगें', gu: 'હોસ્પિટલ બિલનો ફોટો માંગો' }, isCorrect: false },
        ],
        explanation: { en: 'Never sending money is the safest option. The pattern — months of chatting, no video calls, sudden emergency — is the textbook romance scam. Hospital bills can easily be faked.', hi: 'पैसे कभी न भेजना सबसे सुरक्षित विकल्प है। महीनों की चैटिंग, कोई वीडियो कॉल नहीं, अचानक आपातकाल — यह पाठ्यपुस्तक रोमांस घोटाला है।', gu: 'પૈસા ક્યારેય ન મોકલવા એ સૌથી સુરક્ષિત વિકલ્પ છે. મહિનાઓની ચેટિંગ, કોઈ વિડિયો કૉલ નથી, અચાનક ઈમરજન્સી — આ ક્લાસિક રોમાન્સ છેતરપિંડી છે.' },
        tag: { en: 'Emotionally vulnerable to online relationships', hi: 'ऑनलाइन रिश्तों में भावनात्मक रूप से कमजोर', gu: 'ઓનલાઈન સંબંધોમાં ભાવનાત્મક રીતે નબળા' },
      },
      {
        question: { en: 'Someone on a matrimonial site claims to be an NRI doctor earning $500,000/year. Their profile photo looks like a model. What is the best way to verify?', hi: 'एक मैट्रिमोनियल साइट पर कोई $500,000/वर्ष कमाने वाला NRI डॉक्टर होने का दावा करता है। उनकी प्रोफ़ाइल फ़ोटो मॉडल जैसी दिखती है। सत्यापित करने का सबसे अच्छा तरीका क्या है?', gu: 'એક લગ્ન સાઇટ પર કોઈ $500,000/વર્ષ કમાતા NRI ડૉક્ટર હોવાનો દાવો કરે છે. એમની પ્રોફાઇલ ફોટો મોડેલ જેવી દેખાય છે. ચકાસવાનો શ્રેષ્ઠ રસ્તો ક્યો છે?' },
        options: [
          { text: { en: 'Ask them to send more photos', hi: 'उनसे और फोटो भेजने को कहें', gu: 'એમને વધુ ફોટા મોકલવા કહો' }, isCorrect: false },
          { text: { en: 'Do a reverse image search on their profile photos', hi: 'उनकी प्रोफ़ाइल फ़ोटो पर रिवर्स इमेज सर्च करें', gu: 'એમના પ્રોફાઇલ ફોટા પર રિવર્સ ઇમેજ સર્ચ કરો' }, isCorrect: true },
          { text: { en: 'Believe them if they share their "hospital ID card"', hi: 'अगर वे "हॉस्पिटल आईडी कार्ड" साझा करते हैं तो विश्वास करें', gu: 'જો તેઓ "હોસ્પિટલ ID કાર્ડ" શેર કરે તો વિશ્વાસ કરો' }, isCorrect: false },
          { text: { en: 'Trust them because the matrimonial site is reputable', hi: 'उन पर विश्वास करें क्योंकि मैट्रिमोनियल साइट प्रतिष्ठित है', gu: 'એમના પર ભરોસો કરો કારણ કે લગ્ન સાઇટ પ્રતિષ્ઠિત છે' }, isCorrect: false },
        ],
        explanation: { en: 'Reverse image search (Google Images / TinEye) reveals if the photo is stolen from another website. Scammers often steal model photos. ID cards can be forged. Reputable sites can\'t verify every profile.', hi: 'रिवर्स इमेज सर्च (Google Images / TinEye) बताता है कि फोटो किसी अन्य वेबसाइट से चुराई गई है या नहीं। ठग अक्सर मॉडल फोटो चुराते हैं।', gu: 'રિવર્સ ઇમેજ સર્ચ (Google Images / TinEye) બતાવે છે કે ફોટો બીજી વેબસાઇટ પરથી ચોરાયેલો છે કે નહીં. છેતરપિંડીકારો ઘણી વાર મોડેલ ફોટા ચોરે છે.' },
        tag: { en: 'Cannot verify online identities', hi: 'ऑनलाइन पहचान सत्यापित करने में असमर्थ', gu: 'ઓનલાઈન ઓળખ ચકાસવામાં અસમર્થ' },
      },
      {
        question: { en: 'Your online partner of 6 months says they\'re sending you a gift worth $10,000 from abroad. A "customs agent" contacts you asking for ₹30,000 in customs fees. What is this?', hi: 'आपका 6 महीने का ऑनलाइन पार्टनर कहता है कि वे विदेश से $10,000 का उपहार भेज रहे हैं। एक "कस्टम एजेंट" ₹30,000 सीमा शुल्क मांगता है। यह क्या है?', gu: '6 મહિનાના તમારા ઓનલાઈન પાર્ટનર કહે છે કે તેઓ વિદેશથી $10,000 ની ભેટ મોકલી રહ્યા છે. એક "કસ્ટમ એજન્ટ" ₹30,000 કસ્ટમ ફી માંગે છે. આ શું છે?' },
        options: [
          { text: { en: 'Legitimate customs process — pay the fees', hi: 'वैध सीमा शुल्क प्रक्रिया — शुल्क का भुगतान करें', gu: 'કાયદેસર કસ્ટમ પ્રક્રિયા — ફી ચૂકવો' }, isCorrect: false },
          { text: { en: 'Advance fee fraud embedded in a romance scam', hi: 'रोमांस घोटाले में छिपी अग्रिम शुल्क धोखाधड़ी', gu: 'રોમાન્સ છેતરપિંડીમાં છુપાયેલી એડવાન્સ ફી છેતરપિંડી' }, isCorrect: true },
          { text: { en: 'Ask the partner to pay customs from their end', hi: 'पार्टनर को अपनी तरफ से कस्टम भुगतान करने को कहें', gu: 'પાર્ટનરને પોતાના તરફથી કસ્ટમ ચુકવણી કરવા કહો' }, isCorrect: false },
          { text: { en: 'Pay but ask for tracking number as proof', hi: 'भुगतान करें लेकिन प्रमाण के रूप में ट्रैकिंग नंबर मांगें', gu: 'ચૂકવો પણ પુરાવા તરીકે ટ્રેકિંગ નંબર માંગો' }, isCorrect: false },
        ],
        explanation: { en: 'This is a classic "parcel scam" combined with romance fraud. No gift is coming. The "customs agent" is part of the scam ring. After paying ₹30,000, they\'ll demand more fees.', hi: 'यह "पार्सल घोटाला" और रोमांस धोखाधड़ी का संयोजन है। कोई उपहार नहीं आ रहा। "कस्टम एजेंट" घोटाला गिरोह का हिस्सा है।', gu: 'આ "પાર્સલ છેતરપિંડી" અને રોમાન્સ છેતરપિંડીનું સંયોજન છે. કોઈ ભેટ આવવાની નથી. "કસ્ટમ એજન્ટ" છેતરપિંડી ગેંગનો ભાગ છે.' },
        tag: { en: 'Susceptible to parcel/customs scam', hi: 'पार्सल/सीमा शुल्क घोटाले के प्रति संवेदनशील', gu: 'પાર્સલ/કસ્ટમ છેતરપિંડી પ્રત્યે સંવેદનશીલ' },
      },
      {
        question: { en: 'What is the biggest red flag in an online romantic relationship?', hi: 'ऑनलाइन रोमांटिक रिश्ते में सबसे बड़ा लाल झंडा क्या है?', gu: 'ઓનલાઈન રોમેન્ટિક સંબંધમાં સૌથી મોટો લાલ ઝંડો ક્યો છે?' },
        options: [
          { text: { en: 'They live in a different city', hi: 'वे दूसरे शहर में रहते हैं', gu: 'તેઓ બીજા શહેરમાં રહે છે' }, isCorrect: false },
          { text: { en: 'They ask for money before ever meeting you in person', hi: 'वे आपसे व्यक्तिगत रूप से मिलने से पहले पैसे मांगते हैं', gu: 'તેઓ તમને વ્યક્તિગત રીતે મળતા પહેલા પૈસા માંગે છે' }, isCorrect: true },
          { text: { en: 'They use endearing nicknames early', hi: 'वे जल्दी प्यारे उपनाम का उपयोग करते हैं', gu: 'તેઓ વહેલા વહાલા ઉપનામ વાપરે છે' }, isCorrect: false },
          { text: { en: 'They send frequent messages', hi: 'वे बार-बार संदेश भेजते हैं', gu: 'તેઓ વારંવાર સંદેશા મોકલે છે' }, isCorrect: false },
        ],
        explanation: { en: 'The single biggest red flag is ANY request for money before meeting in person. A legitimate romantic interest will never ask for money via online channels. Everything else can be normal relationship behavior.', hi: 'सबसे बड़ा लाल झंडा व्यक्तिगत मिलने से पहले पैसे की कोई भी मांग है। सच्ची रोमांटिक रुचि कभी ऑनलाइन पैसे नहीं मांगेगी।', gu: 'સૌથી મોટો લાલ ઝંડો વ્યક્તિગત રીતે મળતા પહેલા પૈસાની કોઈપણ માંગ છે. સાચી રોમેન્ટિક રુચિ ક્યારેય ઓનલાઈન પૈસા માંગશે નહીં.' },
        tag: { en: 'Cannot identify relationship red flags', hi: 'रिश्ते के लाल झंडों की पहचान नहीं कर सकते', gu: 'સંબંધના લાલ ઝંડા ઓળખી શકતા નથી' },
      },
    ],
  },
};

/* ═══════════════════════════════
   Module View Component
   ═══════════════════════════════ */

const ModuleView: React.FC<{
  moduleData: ModuleData;
  language: string;
  t: (k: string) => string;
  onBack: () => void;
}> = ({ moduleData, language, t, onBack }) => {
  const [phase, setPhase] = useState<'learn' | 'quiz' | 'results'>('learn');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const quiz = moduleData.quiz;
  const total = quiz.length;
  const correctCount = answers.filter(Boolean).length;
  const scorePercent = Math.round((correctCount / total) * 100);

  const handleSubmit = () => {
    if (selected === null) return;
    const isCorrect = quiz[currentQ].options[selected].isCorrect;
    setAnswers(prev => [...prev, isCorrect]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQ + 1 < total) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setPhase('results');
    }
  };

  const handleRetake = () => {
    setPhase('quiz');
    setCurrentQ(0);
    setSelected(null);
    setSubmitted(false);
    setAnswers([]);
  };

  /* ─── LEARN PHASE ─── */
  if (phase === 'learn') {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <button onClick={onBack} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t('module.backToDashboard')}
          </button>
          <div className={`rounded-2xl p-8 bg-gradient-to-r ${moduleData.color} border border-border`}>
            <div className="text-5xl mb-4">{moduleData.emoji}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{getText(moduleData.title, language)}</h1>
            <p className="text-muted-foreground text-lg">{getText(moduleData.subtitle, language)}</p>
          </div>
        </div>

        {/* Insights */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            {t('module.keyInsights')}
          </h2>
          <div className="space-y-6">
            {moduleData.insights.map((section, idx) => (
              <div key={idx} className="bg-card rounded-2xl p-6 border border-border shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">{getText(section.title, language)}</h3>
                <ul className="space-y-3">
                  {section.points.map((point, pidx) => (
                    <li key={pidx} className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-warning-foreground shrink-0 mt-1" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{getText(point, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cheat Sheet */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            {t('module.cheatSheet')}
          </h2>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <div className="grid sm:grid-cols-2 gap-3">
              {moduleData.cheatSheet.map((tip, idx) => (
                <div key={idx} className="bg-muted/50 rounded-xl p-4 text-sm text-foreground">
                  {getText(tip, language)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Quiz CTA */}
        <div className="text-center">
          <Button
            onClick={() => setPhase('quiz')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
          >
            <Brain className="mr-2 h-5 w-5" />
            {t('module.takeAssessment')}
          </Button>
        </div>
      </div>
    );
  }

  /* ─── QUIZ PHASE ─── */
  if (phase === 'quiz') {
    const q = quiz[currentQ];
    return (
      <div className="space-y-6 animate-fade-in">
        <button onClick={onBack} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {t('module.backToDashboard')}
        </button>

        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{t('module.questionOf').replace('{current}', String(currentQ + 1)).replace('{total}', String(total))}</span>
          <span>{Math.round(((currentQ + 1) / total) * 100)}%</span>
        </div>
        <Progress value={((currentQ + 1) / total) * 100} className="h-2" />

        {/* Question Card */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-card">
          <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
            {getText(moduleData.title, language)}
          </div>
          <p className="text-lg font-medium text-foreground mb-6 leading-relaxed">{getText(q.question, language)}</p>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              let classes = 'w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm';
              if (submitted) {
                if (opt.isCorrect) classes += ' border-success bg-success/10 text-success';
                else if (idx === selected && !opt.isCorrect) classes += ' border-destructive bg-destructive/10 text-destructive';
                else classes += ' border-border opacity-50';
              } else {
                classes += idx === selected
                  ? ' border-primary bg-primary/5 text-foreground'
                  : ' border-border hover:border-primary/50 hover:bg-primary/5 text-foreground';
              }
              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelected(idx)}
                  className={classes}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-bold text-primary shrink-0">{String.fromCharCode(65 + idx)}.</span>
                    {getText(opt.text, language)}
                    {submitted && opt.isCorrect && <CheckCircle className="h-4 w-4 ml-auto text-success shrink-0" />}
                    {submitted && idx === selected && !opt.isCorrect && <XCircle className="h-4 w-4 ml-auto text-destructive shrink-0" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {submitted && (
            <div className={`mt-6 p-4 rounded-xl animate-fade-in ${answers[answers.length - 1] ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'}`}>
              <p className="font-semibold text-foreground mb-1">
                {answers[answers.length - 1] ? `✅ ${t('module.correct')}` : `❌ ${t('module.incorrect')}`}
              </p>
              <p className="text-sm text-muted-foreground">{getText(q.explanation, language)}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            {!submitted ? (
              <Button onClick={handleSubmit} disabled={selected === null} className="bg-primary hover:bg-primary/90">
                {t('module.submitAnswer')}
              </Button>
            ) : currentQ + 1 < total ? (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                {t('module.nextQuestion')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                {t('module.viewResults')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─── RESULTS PHASE ─── */
  return (
    <div className="space-y-8 animate-scale-in">
      <button onClick={onBack} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        {t('module.backToDashboard')}
      </button>

      {/* Score Card */}
      <div className={`rounded-2xl p-8 border-2 text-center ${scorePercent >= 75 ? 'bg-success/10 border-success' : scorePercent >= 50 ? 'bg-warning/10 border-warning' : 'bg-destructive/10 border-destructive'}`}>
        <div className="text-5xl mb-3">{moduleData.emoji}</div>
        <p className="text-sm text-muted-foreground mb-1">{t('module.assessmentComplete')}</p>
        <h2 className="text-4xl font-bold text-foreground mb-2">{correctCount}/{total}</h2>
        <p className={`text-lg font-semibold ${scorePercent >= 75 ? 'text-success' : scorePercent >= 50 ? 'text-warning-foreground' : 'text-destructive'}`}>
          {scorePercent >= 75 ? t('module.excellent') : scorePercent >= 50 ? t('module.good') : t('module.needsWork')}
        </p>
        <div className="mt-4 max-w-xs mx-auto">
          <Progress value={scorePercent} className="h-3" />
        </div>
      </div>

      {/* Weaknesses */}
      {answers.some(a => !a) && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            {t('module.yourWeaknesses')}
          </h3>
          <div className="space-y-2">
            {answers.map((correct, idx) =>
              !correct ? (
                <div key={idx} className="flex items-start gap-3 bg-destructive/5 rounded-xl p-3 border border-destructive/20">
                  <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{getText(quiz[idx].tag, language)}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Strengths */}
      {answers.some(a => a) && (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            {t('module.yourStrengths')}
          </h3>
          <div className="space-y-2">
            {answers.map((correct, idx) =>
              correct ? (
                <div key={idx} className="flex items-start gap-3 bg-success/5 rounded-xl p-3 border border-success/20">
                  <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{getText(quiz[idx].question, language).substring(0, 80)}...</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleRetake} variant="outline" className="flex-1">
          {t('module.retakeAssessment')}
        </Button>
        <Button onClick={onBack} className="flex-1 bg-primary hover:bg-primary/90">
          {t('module.backToDashboard')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};


/* ═══════════════════════════════
   Results Page (Main)
   ═══════════════════════════════ */

const Results = () => {
  const { t, language } = useLanguage();
  const { progress } = useUserProgress();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const allBadges = [
    { id: 'quick-learner', name: language === 'hi' ? 'तेज सीखने वाला' : language === 'gu' ? 'ઝડપી શીખનાર' : 'Quick Learner', emoji: '🏆', desc: language === 'hi' ? 'पहली प्रश्नोत्तरी पूर्ण' : language === 'gu' ? 'પ્રથમ ક્વિઝ પૂર્ણ' : 'Completed first quiz' },
    { id: 'scam-survivor', name: language === 'hi' ? 'घोटाला उत्तरजीवी' : language === 'gu' ? 'છેતરપિંડી સર્વાઈવર' : 'Scam Survivor', emoji: '🎖️', desc: language === 'hi' ? 'घोटाले से बचे' : language === 'gu' ? 'સિમ્યુલેશનમાંથી બચ્યા' : 'Survived simulation' },
    { id: 'pattern-master', name: language === 'hi' ? 'पैटर्न मास्टर' : language === 'gu' ? 'પેટર્ન માસ્ટર' : 'Pattern Master', emoji: '🧠', desc: language === 'hi' ? 'उच्च स्कोर' : language === 'gu' ? 'ઉચ્ચ સ્કોર' : 'High quiz score' },
    { id: 'speed-demon', name: language === 'hi' ? 'स्पीड डेमन' : language === 'gu' ? 'સ્પીડ ડેમન' : 'Speed Demon', emoji: '🚀', desc: language === 'hi' ? 'तेज पूर्णता' : language === 'gu' ? 'ઝડપી પૂર્ણતા' : 'Fast completion' },
    { id: 'fraud-detective', name: language === 'hi' ? 'धोखाधड़ी जासूस' : language === 'gu' ? 'છેતરપિંડી જાસૂસ' : 'Fraud Detective', emoji: '🔍', desc: language === 'hi' ? '10+ लिंक विश्लेषित' : language === 'gu' ? '10+ લિંક વિશ્લેષિત' : '10+ links analyzed' },
    { id: 'community-helper', name: language === 'hi' ? 'समुदाय सहायक' : language === 'gu' ? 'સમુદાય સહાયક' : 'Community Helper', emoji: '👥', desc: language === 'hi' ? '3 घोटाले रिपोर्ट' : language === 'gu' ? '3 છેતરપિંડી રિપોર્ટ' : '3 scams reported' },
    { id: 'perfect-score', name: language === 'hi' ? 'परफेक्ट स्कोर' : language === 'gu' ? 'પરફેક્ટ સ્કોર' : 'Perfect Score', emoji: '💯', desc: language === 'hi' ? '100% सही' : language === 'gu' ? '100% સાચા' : '100% correct' },
    { id: 'consistent-learner', name: language === 'hi' ? 'निरंतर सीखने वाला' : language === 'gu' ? 'સતત શીખનાર' : 'Consistent Learner', emoji: '📈', desc: language === 'hi' ? '3 दिन लगातार' : language === 'gu' ? '3 દિવસ સતત' : '3 days streak' },
    { id: 'quick-thinker', name: language === 'hi' ? 'तेज विचारक' : language === 'gu' ? 'ઝડપી વિચારક' : 'Quick Thinker', emoji: '⚡', desc: language === 'hi' ? 'तेज प्रतिक्रिया' : language === 'gu' ? 'ઝડપી પ્રતિક્રિયા' : 'Fast response' },
  ];

  const latestQuizResult = progress.quizResults[progress.quizResults.length - 1];
  const hasData = progress.quizzesCompleted > 0 || progress.simulationsCompleted > 0 || progress.linksAnalyzed > 0;

  const nextSteps = [
    { key: 'deepfake', icon: <Eye className="h-5 w-5 text-purple-500" />, color: 'hover:border-purple-500/30' },
    { key: 'investment', icon: <DollarSign className="h-5 w-5 text-amber-500" />, color: 'hover:border-amber-500/30' },
    { key: 'romance', icon: <Heart className="h-5 w-5 text-rose-500" />, color: 'hover:border-rose-500/30' },
  ];

  /* ── Module View ── */
  if (selectedModule && modules[selectedModule]) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ModuleView
              moduleData={modules[selectedModule]}
              language={language}
              t={t}
              onBack={() => setSelectedModule(null)}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ── Empty State ── */
  if (!hasData) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl shadow-card p-12 border border-border">
              <div className="text-6xl mb-6">📊</div>
              <h1 className="text-3xl font-bold text-foreground mb-4">{t('results.title')}</h1>
              <p className="text-muted-foreground mb-8">{t('results.noData')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/learn">
                  <Button className="bg-primary hover:bg-primary/90">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {language === 'hi' ? 'प्रश्नोत्तरी लें' : language === 'gu' ? 'ક્વિઝ આપો' : 'Take Quiz'}
                  </Button>
                </Link>
                <Link to="/simulate">
                  <Button variant="outline">
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    {language === 'hi' ? 'सिमुलेशन आज़माएं' : language === 'gu' ? 'સિમ્યુલેશન અજમાવો' : 'Try Simulation'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('results.title')}</h1>
          </div>

          {/* Progress Overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t('results.quizzesCompleted')}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{progress.quizzesCompleted}</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Gamepad2 className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">{t('results.simulationsCompleted')}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{progress.simulationsCompleted}</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t('results.linksAnalyzed')}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{progress.linksAnalyzed}</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">{t('results.trainingHours')}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{progress.trainingHours.toFixed(1)}</p>
            </div>
          </div>

          {/* Vulnerability Profile */}
          {latestQuizResult && (
            <div className="bg-card rounded-2xl p-6 border border-border shadow-card mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">{t('results.vulnerability')}</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{t('results.authority')}</span>
                    <span className="text-muted-foreground">{latestQuizResult.authorityScore}/10</span>
                  </div>
                  <Progress value={latestQuizResult.authorityScore * 10} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {latestQuizResult.authorityScore >= 7
                      ? (language === 'hi' ? 'उच्च जोखिम: अधिकारियों पर बहुत जल्दी भरोसा करते हैं' : language === 'gu' ? 'ઉચ્ચ જોખમ: અધિકારીઓ પર ખૂબ જલ્દી વિશ્વાસ કરો છો' : 'High risk: Trust authority figures too quickly')
                      : latestQuizResult.authorityScore >= 4
                      ? (language === 'hi' ? 'मध्यम जोखिम: कुछ सत्यापन करते हैं' : language === 'gu' ? 'મધ્યમ જોખમ: કેટલીક ચકાસણી કરો છો' : 'Medium risk: Some verification habits')
                      : (language === 'hi' ? 'कम जोखिम: अच्छी सत्यापन आदतें' : language === 'gu' ? 'ઓછું જોખમ: સારી ચકાસણી આદતો' : 'Low risk: Good verification habits')
                    }
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{t('results.urgency')}</span>
                    <span className="text-muted-foreground">{latestQuizResult.urgencyScore}/10</span>
                  </div>
                  <Progress value={latestQuizResult.urgencyScore * 10} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {latestQuizResult.urgencyScore >= 7
                      ? (language === 'hi' ? 'उच्च जोखिम: दबाव में जल्दी निर्णय लेते हैं' : language === 'gu' ? 'ઉચ્ચ જોખમ: દબાણમાં ઝડપી નિર્ણય લો છો' : 'High risk: Makes quick decisions under pressure')
                      : latestQuizResult.urgencyScore >= 4
                      ? (language === 'hi' ? 'मध्यम जोखिम: कभी-कभी जल्दबाजी करते हैं' : language === 'gu' ? 'મધ્યમ જોખમ: ક્યારેક ઉતાવળ કરો છો' : 'Medium risk: Sometimes rushes')
                      : (language === 'hi' ? 'कम जोखिम: शांत रहते हैं' : language === 'gu' ? 'ઓછું જોખમ: શાંત રહો છો' : 'Low risk: Stays calm')
                    }
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{t('results.technical')}</span>
                    <span className="text-muted-foreground">{latestQuizResult.technicalScore}/10</span>
                  </div>
                  <Progress value={latestQuizResult.technicalScore * 10} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {latestQuizResult.technicalScore >= 7
                      ? (language === 'hi' ? 'उच्च साक्षरता: नकली URLs पहचान सकते हैं' : language === 'gu' ? 'ઉચ્ચ સાક્ષરતા: નકલી URLs ઓળખી શકો છો' : 'High literacy: Can spot fake URLs')
                      : latestQuizResult.technicalScore >= 4
                      ? (language === 'hi' ? 'मध्यम साक्षरता: कुछ लाल झंडे पहचानते हैं' : language === 'gu' ? 'મધ્યમ સાક્ષરતા: કેટલાક લાલ ઝંડા ઓળખો છો' : 'Medium literacy: Recognizes some red flags')
                      : (language === 'hi' ? 'कम साक्षरता: तकनीकी प्रशिक्षण की जरूरत' : language === 'gu' ? 'ઓછી સાક્ષરતા: ટેકનિકલ તાલીમની જરૂર છે' : 'Low literacy: Needs technical training')
                    }
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{language === 'hi' ? 'नवीनतम प्रश्नोत्तरी स्कोर' : language === 'gu' ? 'તાજેતરનો ક્વિઝ સ્કોર' : 'Latest Quiz Score'}</p>
                    <p className="text-2xl font-bold text-foreground">{latestQuizResult.score}/{latestQuizResult.total}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{language === 'hi' ? 'जोखिम कमी' : language === 'gu' ? 'જોખમ ઘટાડો' : 'Risk Reduction'}</p>
                    <p className="text-2xl font-bold text-success">
                      {Math.round((latestQuizResult.score / latestQuizResult.total) * 71)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{t('results.badges')}</h2>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {allBadges.map((badge) => {
                const earned = progress.badges.some(b => b.id === badge.id);
                return (
                  <div 
                    key={badge.id}
                    className={`text-center p-4 rounded-xl transition-all ${
                      earned 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'bg-muted/50 opacity-40'
                    }`}
                  >
                    <div className={`text-3xl mb-2 ${earned ? 'badge-pop' : ''}`}>
                      {badge.emoji}
                    </div>
                    <p className="text-xs font-medium text-foreground">{badge.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{badge.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Steps — Module Cards */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-4">{t('results.nextSteps')}</h2>
            <div className="space-y-3">
              {nextSteps.map(({ key, icon, color }) => {
                const mod = modules[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedModule(key)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all border border-transparent ${color} group text-left`}
                  >
                    <div className="flex items-center space-x-3">
                      {icon}
                      <div>
                        <span className="font-medium text-foreground block">{getText(mod.title, language)}</span>
                        <span className="text-xs text-muted-foreground">{getText(mod.subtitle, language).substring(0, 60)}...</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button variant="outline" className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                {t('results.share')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
