import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  getComplaints,
} from "@/lib/demoStore";

import {
  Search,
  ShieldAlert,
  Clock3,
  CheckCircle2,
  Eye,
  User,
  Calendar,
  IndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";



const Cases = () => {
  const { t } = useLanguage();

  const [statusFilter, setStatusFilter] =
    useState("All");


  const [search, setSearch] =
    useState("");



  const [cases, setCases] =
    useState<any[]>([]);





  const loadCases = () => {


    const complaints =
      getComplaints();



    const mappedCases =
      complaints.map((complaint:any)=>({

        id:
          `CASE-${complaint.id}`,


        complaint:
          complaint.id,


        title:
          complaint.title,


        citizen:
          complaint.citizen,


        officer:
          complaint.officer,


        status:
          complaint.status,


        priority:
          complaint.priority,


        createdAt:
          complaint.createdAt,


        amount:
          complaint.amount,


        location:
          complaint.location,


        category:
          complaint.category,


      }));


    setCases(mappedCases);


  };





  useEffect(()=>{


    loadCases();



    window.addEventListener(
      "storage",
      loadCases
    );


    window.addEventListener(
      "focus",
      loadCases
    );



    return ()=>{


      window.removeEventListener(
        "storage",
        loadCases
      );


      window.removeEventListener(
        "focus",
        loadCases
      );


    };


  },[]);






  const total =
    cases.length;



  const active =
    cases.filter(
      (c)=>c.status !== "Resolved"
    ).length;



  const investigating =
    cases.filter(
      (c)=>c.status==="Investigating"
    ).length;



  const closed =
    cases.filter(
      (c)=>c.status==="Resolved"
    ).length;






  const filteredCases =
    cases.filter((item)=>{


      const matchesStatus =
        statusFilter==="All" ||
        item.status===statusFilter;



      const text =
        search.toLowerCase();



      const matchesSearch =

        item.id
        .toLowerCase()
        .includes(text)


        ||

        item.complaint
        .toLowerCase()
        .includes(text)


        ||

        item.citizen
        .toLowerCase()
        .includes(text);



      return (
        matchesStatus &&
        matchesSearch
      );


    });







return (

<div className="min-h-screen bg-background p-6">



<div className="mb-8">


<h1 className="text-4xl font-bold">

{t("senior.cases.title")}

</h1>


<p className="text-muted-foreground mt-2">

{t("senior.cases.subtitle")}

</p>


</div>







<div className="grid lg:grid-cols-4 gap-5 mb-8">



<StatCard
title={t("senior.cases.total")}
value={total}
/>



<StatCard
title={t("senior.cases.active")}
value={active}
/>



<StatCard
title={t("senior.cases.investigating")}
value={investigating}
/>



<StatCard
title={t("senior.cases.closed")}
value={closed}
/>



</div>







<div className="flex flex-col md:flex-row gap-4 mb-8">



<div className="relative flex-1">


<Search
className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground"
/>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder={t("senior.cases.search")}

className="w-full border rounded-xl pl-12 pr-4 py-3 bg-background"

/>


</div>





<select

value={statusFilter}

onChange={(e)=>
setStatusFilter(e.target.value)
}

className="border rounded-xl px-4 py-3 bg-background"

>


<option>
{t("senior.cases.all")}
</option>

<option>
{t("senior.cases.pending")}
</option>

<option>
{t("senior.cases.investigating")}
</option>

<option>
{t("senior.cases.resolved")}
</option>


</select>



</div>







<div className="space-y-6">



{
filteredCases.map((item)=>(


<div

key={item.id}

className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition"

>



<div className="flex flex-col lg:flex-row justify-between gap-5">



<div>


<div className="flex items-center gap-3">


<ShieldAlert
className="h-6 w-6 text-primary"
/>


<h2 className="text-xl font-semibold">

{item.title}

</h2>


</div>




<p className="text-muted-foreground mt-2">

Case ID: {item.id}

</p>



<p className="text-muted-foreground">

Complaint ID: {item.complaint}

</p>



</div>





<span

className={`px-4 py-2 rounded-full h-fit font-semibold

${
item.status==="Resolved"

?

"bg-green-100 text-green-700"

:

item.status==="Investigating"

?

"bg-blue-100 text-blue-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>

{item.status}

</span>



</div>







<div className="grid md:grid-cols-4 gap-6 mt-6">



<Info

icon={<User/>}

title={t("senior.cases.citizen")}

value={item.citizen}

/>




<Info

icon={<Calendar/>}

title={t("senior.cases.date")}

value={item.createdAt}

/>





<Info

icon={<IndianRupee/>}

title={t("senior.cases.amount")}

value={`₹${item.amount.toLocaleString()}`}

/>




<Info

icon={<Clock3/>}

title={t("senior.cases.priority")}

value={item.priority}

/>




</div>







<div className="flex flex-wrap justify-end gap-3 mt-6">


<Button

className="flex-1 sm:flex-none"

onClick={()=>{

console.log(item);

}}

>


<Eye className="mr-2 h-4 w-4"/>

{t("senior.cases.openCase")}


</Button>





<Button

variant="outline"

className="flex-1 sm:flex-none"

>

{t("senior.cases.timeline")}

</Button>




<Button

variant="outline"

className="flex-1 sm:flex-none"

>

{t("senior.cases.viewEvidence")}

</Button>




</div>





</div>


))

}







{
filteredCases.length===0 && (

<div className="bg-card border rounded-2xl p-16 text-center">


<CheckCircle2
className="mx-auto h-14 w-14 text-green-600 mb-5"
/>


<h2 className="text-2xl font-bold">

{t("senior.cases.none")}

</h2>


<p className="text-muted-foreground mt-3">

Submit a complaint from Fraud Centre to create cases.

</p>


</div>

)

}



</div>







</div>

);

};







const StatCard = ({
title,
value,
}:{
title:string;
value:number;
})=>(


<div className="bg-card border rounded-2xl p-6">


<p className="text-muted-foreground">

{title}

</p>


<h2 className="text-3xl font-bold mt-2">

{value}

</h2>


</div>


);








const Info = ({
icon,
title,
value,
}:{
icon:React.ReactNode;
title:string;
value:string;
})=>(


<div className="flex items-center gap-3">


<div className="text-primary">

{icon}

</div>


<div>

<p className="text-xs text-muted-foreground">

{title}

</p>


<p className="font-medium">

{value}

</p>


</div>


</div>


);



export default Cases;