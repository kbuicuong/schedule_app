import axios from "axios";
import { useQuery } from "react-query";
import {ScheduleType} from "./Appointment.tsx";
import {Schedule} from "../Schedule.tsx";

export const getSchedules = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/schedule",
  );

  const dataFiltered = response.data.filter((d: ScheduleType) => d.approved !== true);

  return dataFiltered;
};

export function Dashboard (): JSX.Element {

  const {
    data: schedules,
    error,
    isLoading,
    refetch
  } = useQuery("postsData", getSchedules);

  return (
    <section className="bg-white mt-2.5">
      <div className="container px-6 py-10 mx-auto flex flex-wrap gap-2">
        {schedules && schedules.map((schedule:ScheduleType) => (
          <Schedule key={Math.random()} schedule={schedule} refetch={() => refetch()}/>
        ))}
      </div>
    </section>
  );
}
