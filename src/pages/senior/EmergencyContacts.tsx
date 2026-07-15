
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Phone,
  Plus,
  User,
  HeartHandshake,
  ShieldCheck,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const EmergencyContacts = () => {
  const { t } = useLanguage();

  const [contacts] = useState([
    {
      id: 1,
      name: "Rajesh Patel",
      relation: "Son",
      phone: "+91 98765 43210",
      priority: "Primary",
    },
    {
      id: 2,
      name: "Anita Patel",
      relation: "Daughter",
      phone: "+91 98220 56789",
      priority: "Secondary",
    },
    {
      id: 3,
      name: "Dr. Mehul Shah",
      relation: "Family Doctor",
      phone: "+91 99040 11122",
      priority: "Medical",
    },
  ]);


  return (
    <div className="min-h-screen bg-background p-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            {t("senior.contacts.title")}
          </h1>

          <p className="text-muted-foreground mt-2">
            {t("senior.contacts.subtitle")}
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-5 w-5" />
          {t("senior.contacts.add")}
        </Button>

      </div>


      {/* Summary */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">

        <div className="bg-card border rounded-2xl p-6">
          <User className="h-8 w-8 text-primary mb-3" />

          <p className="text-muted-foreground">
            {t("senior.contacts.registered")}
          </p>

          <h2 className="text-3xl font-bold">
            {contacts.length}
          </h2>
        </div>


        <div className="bg-card border rounded-2xl p-6">

          <HeartHandshake className="h-8 w-8 text-red-500 mb-3" />

          <p className="text-muted-foreground">
            {t("senior.contacts.family")}
          </p>

          <h2 className="text-3xl font-bold">
            2
          </h2>

        </div>


        <div className="bg-card border rounded-2xl p-6">

          <ShieldCheck className="h-8 w-8 text-green-600 mb-3" />

          <p className="text-muted-foreground">
            {t("senior.contacts.medical")}
          </p>

          <h2 className="text-3xl font-bold">
            1
          </h2>

        </div>

      </div>



      {/* Contacts */}
      <div className="grid lg:grid-cols-2 gap-6">

        {contacts.map((contact) => (

          <div
            key={contact.id}
            className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
          >

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">

                  <User className="h-7 w-7 text-primary" />

                </div>


                <div>

                  <h2 className="text-xl font-semibold">
                    {contact.name}
                  </h2>

                  <p className="text-muted-foreground">
                    {contact.relation}
                  </p>

                </div>

              </div>


              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  contact.priority === "Primary"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : contact.priority === "Secondary"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {contact.priority === "Primary" ? t("senior.contacts.primary") : contact.priority === "Secondary" ? t("senior.contacts.secondary") : contact.priority}
              </span>

            </div>



            <div className="mt-6 flex items-center gap-3">

              <Phone className="h-5 w-5 text-primary" />

              <span className="font-medium">
                {contact.phone}
              </span>

            </div>



            <div className="grid grid-cols-3 gap-3 mt-8">

              <Button variant="outline">

                <Phone className="mr-2 h-4 w-4" />

                {t("senior.contacts.call")}

              </Button>


              <Button variant="outline">

                <Pencil className="mr-2 h-4 w-4" />

                {t("senior.contacts.edit")}

              </Button>


              <Button variant="destructive">

                <Trash2 className="mr-2 h-4 w-4" />

                {t("senior.contacts.remove")}

              </Button>


            </div>


          </div>

        ))}

      </div>



      {/* Information */}

      <div className="bg-card border rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          {t("senior.contacts.guidelines")}
        </h2>


        <ul className="space-y-3 text-muted-foreground list-disc pl-6">

          <li>
            Register at least one primary family member who can be reached at all times.
          </li>

          <li>
            Add your family doctor or healthcare provider for medical emergencies.
          </li>

          <li>
            Keep phone numbers updated to ensure emergency alerts are delivered successfully.
          </li>

          <li>
            During an SOS event, your registered contacts and emergency authorities will receive your alert.
          </li>

        </ul>


      </div>


    </div>
  );

};


export default EmergencyContacts;
