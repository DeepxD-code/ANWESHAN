import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  getComplaints,
} from "@/lib/demoStore";
import { useLanguage } from "@/contexts/LanguageContext";


const Complaints = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");

  const [complaints, setComplaints] = useState(
    getComplaints()
  );


  const loadComplaints = () => {

    setComplaints(
      getComplaints()
    );

  };


  useEffect(() => {

    loadComplaints();


    window.addEventListener(
      "storage",
      loadComplaints
    );


    window.addEventListener(
      "focus",
      loadComplaints
    );


    return () => {

      window.removeEventListener(
        "storage",
        loadComplaints
      );


      window.removeEventListener(
        "focus",
        loadComplaints
      );

    };


  }, []);



  const total =
    complaints.length;


  const pending =
    complaints.filter(
      (c) =>
        c.status === "Pending"
    ).length;


  const investigating =
    complaints.filter(
      (c) =>
        c.status === "Investigating"
    ).length;


  const resolved =
    complaints.filter(
      (c) =>
        c.status === "Resolved"
    ).length;



  const filtered =
    complaints.filter(
      (c) =>

        c.id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        c.citizen
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        c.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );



  return (

    <div className="min-h-screen bg-background">


      <div className="max-w-7xl mx-auto px-6 py-8">


        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">


          <div>

            <h1 className="text-4xl font-bold">
              {t("officer.complaints.title")}
            </h1>


            <p className="text-muted-foreground mt-2">
              {t("officer.complaints.subtitle")}
            </p>

          </div>


          <Button onClick={() => alert('Complaints exported as CSV.')}>
            {t("officer.complaints.export")}
          </Button>


        </div>





        <div className="grid md:grid-cols-4 gap-6 mb-8">


          <StatCard
            title={t("officer.complaints.total")}
            value={total}
          />


          <StatCard
            title={t("officer.complaints.pending")}
            value={pending}
            color="text-orange-500"
          />


          <StatCard
            title={t("officer.complaints.investigating")}
            value={investigating}
            color="text-blue-600"
          />


          <StatCard
            title={t("officer.complaints.resolved")}
            value={resolved}
            color="text-green-600"
          />


        </div>





        <div className="bg-card border rounded-2xl p-6 mb-6">


          <input

            type="text"

            placeholder={t("officer.complaints.search")}

            value={search}

            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }

            className="w-full border rounded-xl px-4 py-3 bg-background"

          />


        </div>





        <div className="space-y-5">


        {
          filtered.map(
            (complaint)=>(


<div
key={complaint.id}
className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
>


<div className="flex flex-col lg:flex-row justify-between gap-6">


<div className="flex-1">


<div className="flex items-center gap-3 mb-3">


<h2 className="text-2xl font-semibold">

{complaint.category}

</h2>



<span
className={`
px-3 py-1 rounded-full text-sm font-semibold

${
complaint.priority==="High"
?
"bg-red-100 text-red-600"

:

complaint.priority==="Medium"

?

"bg-yellow-100 text-yellow-700"

:

"bg-green-100 text-green-700"

}

`}
>

{complaint.priority}

</span>


</div>





<div className="grid md:grid-cols-2 gap-4">



<Info
label={t("officer.complaints.complaintId")}
value={complaint.id}
/>



<Info
label={t("officer.complaints.citizen")}
value={complaint.citizen}
/>



<Info
label={t("officer.complaints.date")}
value={complaint.createdAt}
/>



<Info
label={t("officer.complaints.location")}
value={complaint.location}
/>



<Info
label={t("officer.complaints.reportedLoss")}
value={`₹${complaint.amount.toLocaleString()}`}
/>



<Info
label={t("officer.complaints.status")}
value={complaint.status}
/>


</div>


</div>





<div className="flex flex-wrap lg:flex-col gap-3 lg:w-72">


<Button

className="flex-1 lg:w-full"

onClick={()=>{
alert('Complaint Details:\n\nID: ' + complaint.id + '\nCategory: ' + complaint.category + '\nCitizen: ' + complaint.citizen + '\nStatus: ' + complaint.status + '\nAmount: ₹' + complaint.amount.toLocaleString() + '\nLocation: ' + complaint.location);
}}

>

{t("officer.complaints.view")}

</Button>



<Button

variant="outline"

className="flex-1 lg:w-full"

onClick={() => alert('Officer assigned to complaint ' + complaint.id + '. Notification sent.')}

>

{t("officer.complaints.assign")}

</Button>




<Button

variant="outline"

className="flex-1 lg:w-full"

onClick={() => alert('Case opened for complaint ' + complaint.id + '. Case ID: CASE-2026-' + Math.floor(Math.random()*99999).toString().padStart(5,'0'))}

>

{t("officer.complaints.openCase")}

</Button>




<Button

variant="outline"

className="flex-1 lg:w-full"

onClick={() => alert('Evidence vault opened for complaint ' + complaint.id + '.\nFiles: 3 screenshots, 1 PDF, 1 audio recording')}

>

{t("officer.complaints.viewEvidence")}

</Button>


</div>



</div>



</div>


            )
          )
        }



        {
          filtered.length===0 && (

<div className="bg-card border rounded-2xl p-10 text-center">


<h2 className="text-xl font-semibold">

No complaints found

</h2>


<p className="text-muted-foreground mt-2">

New complaints submitted from Report Fraud will appear here.

</p>


</div>

          )
        }


        </div>





<div className="bg-card border rounded-2xl p-6 mt-8">


<h2 className="text-2xl font-semibold mb-5">

{t("officer.complaints.workflow")}

</h2>



<div className="grid md:grid-cols-5 gap-4">


{
[
"Complaint Received",
"Officer Assigned",
"Evidence Review",
"Investigation",
"Case Closed",
].map(
(step)=>(

<div
key={step}
className="border rounded-xl p-4 text-center"
>

<h3 className="font-semibold">
{step}
</h3>

</div>

)
)
}


</div>


</div>



</div>


</div>


  );

};





const StatCard = ({
title,
value,
color="",
}:{
title:string;
value:number;
color?:string;
}) => (

<div className="bg-card border rounded-2xl p-6">

<p className="text-muted-foreground">

{title}

</p>


<h2 className={`text-4xl font-bold mt-2 ${color}`}>

{value}

</h2>


</div>

);





const Info = ({
label,
value,
}:{
label:string;
value:string;
}) => (

<div>

<p className="text-muted-foreground">

{label}

</p>


<p className="font-semibold">

{value}

</p>


</div>

);



export default Complaints;