export type ComplaintStatus =
  | "Pending"
  | "Investigating"
  | "Evidence Review"
  | "Resolved";

export type ComplaintPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Emergency";

export interface Complaint {

  id: string;

  title: string;

  category: string;

  description: string;

  location: string;

  citizen: string;

  mobile: string;

  email: string;

  priority: ComplaintPriority;

  status: ComplaintStatus;

  amount: number;

  officer: string;

  createdAt: string;

  evidence: string[];

}



const STORAGE_KEY = "anweshan-demo-store";



interface DemoStore {

  complaints: Complaint[];

}



const defaultStore: DemoStore = {

  complaints: [

    {

      id: "ANW-2026-00124",

      title: "UPI Refund Scam",

      category: "UPI Fraud",

      description:
        "Fraudster pretending to be bank executive.",

      location: "Satellite, Ahmedabad",

      citizen: "Ramesh Patel",

      mobile: "9876543210",

      email: "ramesh@gmail.com",

      priority: "High",

      status: "Investigating",

      amount: 42000,

      officer: "Inspector Rahul Mehta",

      createdAt: "10 Jul 2026",

      evidence: [
        "Screenshot",
        "Bank Receipt",
      ],

    },



    {

      id: "ANW-2026-00118",

      title: "WhatsApp Investment Scam",

      category: "Investment Scam",

      description:
        "Fake investment advisor.",

      location: "Navrangpura",

      citizen: "Anita Shah",

      mobile: "9898989898",

      email: "anita@gmail.com",

      priority: "Medium",

      status: "Pending",

      amount: 18500,

      officer: "Awaiting Assignment",

      createdAt: "08 Jul 2026",

      evidence: [
        "WhatsApp Chat",
      ],

    },



    {

      id: "ANW-2026-00110",

      title: "Courier Scam",

      category: "Courier Scam",

      description:
        "Fake parcel delivery payment.",

      location: "Maninagar",

      citizen: "Mahesh Joshi",

      mobile: "9898989891",

      email: "mahesh@gmail.com",

      priority: "Low",

      status: "Resolved",

      amount: 0,

      officer: "Inspector Neha Shah",

      createdAt: "06 Jul 2026",

      evidence: [
        "Screenshot",
      ],

    },

  ],

};



function loadStore(): DemoStore {

  const data =
    localStorage.getItem(STORAGE_KEY);

  if (!data) {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(defaultStore)

    );

    return defaultStore;

  }

  return JSON.parse(data);

}



function saveStore(

  store: DemoStore

) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(store)

  );

}



export function getComplaints() {

  return loadStore().complaints;

}



export function getComplaint(

  id: string

) {

  return loadStore().complaints.find(

    c => c.id === id

  );

}



export function addComplaint(

  complaint: Omit<Complaint, "id">

) {

  const store = loadStore();

  const newComplaint: Complaint = {

    ...complaint,

    id:
      "ANW-" +
      new Date().getFullYear() +
      "-" +
      Math.floor(
        10000 +
        Math.random() * 90000
      ),

  };

  store.complaints.unshift(

    newComplaint

  );

  saveStore(store);

  return newComplaint;

}



export function updateComplaint(

  id: string,

  values: Partial<Complaint>

) {

  const store = loadStore();

  store.complaints =

    store.complaints.map(

      complaint =>

        complaint.id === id

          ? {

              ...complaint,

              ...values,

            }

          : complaint

    );

  saveStore(store);

}



export function deleteComplaint(

  id: string

) {

  const store = loadStore();

  store.complaints =

    store.complaints.filter(

      c => c.id !== id

    );

  saveStore(store);

}



export function complaintStats() {

  const complaints =
    getComplaints();

  return {

    total:
      complaints.length,

    pending:
      complaints.filter(

        c =>
          c.status === "Pending"

      ).length,

    investigating:
      complaints.filter(

        c =>
          c.status ===
          "Investigating"

      ).length,

    evidence:
      complaints.filter(

        c =>
          c.status ===
          "Evidence Review"

      ).length,

    resolved:
      complaints.filter(

        c =>
          c.status ===
          "Resolved"

      ).length,

    totalLoss:

      complaints.reduce(

        (

          total,

          complaint

        ) =>

          total +

          complaint.amount,

        0

      ),

  };

}



export function clearDemoStore() {

  localStorage.removeItem(

    STORAGE_KEY

  );

}