import HealthPageClient from "./HealthPageClient";
import AppointmentObject from "../_components/AppointmentTracker/AppointmentObject";

/* this page could theoretically be just be HealthPageClient but there is apparently an issue between parent and 
and functions  returning AppointmentObjects fully functions but HealthPageClient itself had issues with addAppointment being recognized
I still kinda don't understand it fully even after looking it up for half an hour  */
export default function Page() {
  return <AppointmentObject/>;
}