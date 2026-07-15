import React, { useState } from "react";
import LinkChecker from "../LinkChecker";
import { CheckCircle, Clock, ShieldAlert } from "lucide-react";

interface EscalationItem {
  id: number;
  date: string;
  sender: string;
  message: string;
  status: string;
  classification?: string;
  reportTime?: string;
}

const mockEscalations: EscalationItem[] = [
  {
    id: 1,
    date: "10:30 AM, Today",
    sender: "+91 9876543210",
    message: "Dear customer, your bank account will be suspended today. Click here to update KYC: http://secure-bankofamerica.com/update",
    status: "Pending",
  },
  {
    id: 2,
    date: "Yesterday",
    sender: "+91 8888888888",
    message: "You have won a lottery of 1 Lakh! Send your bank details to claim.",
    status: "Classified - High Risk",
  }
];

const Escalations = () => {
  const [escalations, setEscalations] = useState<EscalationItem[]>(mockEscalations);
  const [reportedHistory, setReportedHistory] = useState<EscalationItem[]>([]);
  const [selectedEscalation, setSelectedEscalation] = useState<EscalationItem | null>(mockEscalations[0]);
  const [classification, setClassification] = useState("");

  const handleClassify = () => {
    if (!selectedEscalation) return;

    const reportedItem: EscalationItem = {
      ...selectedEscalation,
      status: "Reported",
      classification: classification,
      reportTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Today"
    };

    // Add to history
    setReportedHistory([...reportedHistory, reportedItem]);

    // Remove from flagged list
    const remaining = escalations.filter(item => item.id !== selectedEscalation.id);
    setEscalations(remaining);

    // Alert user
    alert(`Fraud successfully classified as: ${classification}. Official cyber crime complaint generated and forwarded to Cyber Cell.`);

    // Reset select dropdown
    setClassification("");

    // Auto-select next one if exists, otherwise set null
    if (remaining.length > 0) {
      setSelectedEscalation(remaining[0]);
    } else {
      setSelectedEscalation(null);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Fraud Escalations</h1>
        <p className="text-muted-foreground">Review and classify messages flagged by your linked Senior Citizens.</p>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Inbox / Escalations List */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Flagged Messages</h2>
            
            {escalations.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-xl bg-muted/5">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <p className="font-semibold text-foreground">All Caught Up!</p>
                <p className="text-sm text-muted-foreground text-center mt-1">No pending flagged messages from linked senior citizens.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {escalations.map((item) => (
                  <div 
                    key={item.id} 
                    className={`border rounded-xl p-4 cursor-pointer transition ${selectedEscalation?.id === item.id ? "bg-primary/10 border-primary" : "bg-muted/10 hover:bg-muted/20"}`}
                    onClick={() => setSelectedEscalation(item)}
                  >
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span className="font-bold text-foreground">From: {item.sender}</span>
                      <span>{item.date}</span>
                    </div>
                    <p className="line-clamp-2">{item.message}</p>
                    <div className="mt-2 text-sm font-semibold text-primary">{item.status}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Classification & Actions */}
          <div className="space-y-6">
            <div className="bg-card border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Classify & Report</h2>
              
              {selectedEscalation ? (
                <>
                  <div className="p-4 bg-muted/20 rounded-xl mb-4 border">
                    <p className="font-mono text-sm">{selectedEscalation.message}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Scam Type Category</label>
                      <select 
                        className="w-full p-2 border rounded-md bg-background"
                        value={classification}
                        onChange={(e) => setClassification(e.target.value)}
                      >
                        <option value="">Select Category...</option>
                        <option value="KYC Fraud">KYC Fraud</option>
                        <option value="Lottery Scam">Lottery Scam</option>
                        <option value="UPI Refund Scam">UPI Refund Scam</option>
                        <option value="Impersonation">Impersonation (Digital Arrest)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <button 
                      onClick={handleClassify}
                      disabled={!classification}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
                    >
                      Submit Official Report
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground text-sm">Select a pending flagged message from the left to classify and submit.</p>
              )}
            </div>

            {/* Link Checker Integration */}
            {selectedEscalation && (
              <div className="bg-card border rounded-2xl p-4 shadow-sm">
                 <h3 className="text-lg font-semibold mb-2 ml-4 mt-2">ML Link Scanner</h3>
                 <p className="text-sm text-muted-foreground ml-4 mb-4">Extract links from the message above and paste them here to use the 256-feature ML detection model.</p>
                 <div className="-mt-8">
                    <LinkChecker />
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Reported History Section */}
        {reportedHistory.length > 0 && (
          <div className="bg-card border rounded-2xl p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-red-500" /> Generated Reports History
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b bg-muted/40 font-semibold">
                    <th className="p-3">Sender</th>
                    <th className="p-3">Flagged Message</th>
                    <th className="p-3">Classification</th>
                    <th className="p-3">Reported Time</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {reportedHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/10">
                      <td className="p-3 font-semibold">{item.sender}</td>
                      <td className="p-3 max-w-xs truncate">{item.message}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          {item.classification}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {item.reportTime}
                        </span>
                      </td>
                      <td className="p-3 text-green-600 font-semibold flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Submitted to Cyber Cell
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Escalations;
