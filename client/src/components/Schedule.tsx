import {ScheduleType} from './pages/Appointment.tsx'
import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {SendEmail} from "../utils/SendEmail.ts";
import {getEndpoint} from "../utils/Helper.ts";

type ScheduleProps = {
  schedule: ScheduleType,
  refetch: () => void;
}

export function Schedule(props: ScheduleProps): JSX.Element {

  const {schedule, refetch} = props;

  const mutationDelete = useMutation((deleteId: string) => {
      return axios.delete(`${getEndpoint()}/api/schedule/delete/${deleteId}`);
    }
  );

  const mutationPut = useMutation((newSchedule: ScheduleType) => {
    const start = new Date(newSchedule.start).toISOString();
    const end = new Date(newSchedule.end).toISOString();
    const approved = {approved: true};
    return axios.put(`${getEndpoint()}/api/schedule/update/${start}.${end}`, approved);
  });

  const handleApprove = () => {
    return new Promise(() => {
      mutationPut.mutate(schedule, {
        onSuccess: () => {
          toast.success("Successfully edited schedule");
          SendEmail(schedule.email, schedule.title, "Your schedule has been approved", "Your schedule has been approved");
          refetch();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
          }
        },
      });
    });
  }

  const handleDelete = () => {
    return new Promise(() => {
      mutationDelete.mutate(schedule.event_id.toString(), {
        onSuccess: () => {
          toast.success("Successfully deleted schedule");
          refetch();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
          }
        },
      });
    });
  }


  return (
    <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg basis-1/2">

      <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-xl font-bold text-gray-800">{schedule.title}</h1>

        <p className="mt-2 text-sm text-gray-600">{schedule.subtitle}</p>
        <p className="mt-2 text-sm text-gray-600">{new Date(schedule.start).toString()}</p>
        <p className="mt-2 text-sm text-gray-600">{new Date(schedule.end).toString()}</p>

        <div className="flex justify-between mt-3 item-center">
          <button
            className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={handleApprove}
          >
            Approve
          </button>
          <button
            className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-red-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
