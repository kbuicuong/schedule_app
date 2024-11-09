import {useEffect, useRef, useState} from "react";

import {Scheduler} from "@aldabil/react-scheduler";
import {
  ProcessedEvent, SchedulerRef
} from "@aldabil/react-scheduler/types";
import {useQueryClient, useMutation, useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseAuth} from "../../firebase/BaseConfig.ts";
import {CustomEditor} from "../CustomEditor.tsx";
import {Button} from "@mui/material";
import {getConfig} from "./Dashboard.tsx";

export const getSchedules = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/schedule",
  );
  return response.data;
};

export type ScheduleType = {
  event_id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  email: string;
  phone: string
  start: string | Date;
  end: string | Date;
  approved?: boolean;
};

const Appointment = () => {
  const queryClient = useQueryClient();
  const [user] = useAuthState(firebaseAuth);
  const calendarRef = useRef<SchedulerRef>(null);
  const [nonWorkingDays, setNonWorkingDays] = useState<number[]>([]);

  const mutationDelete = useMutation((deleteId: string) => {
      return axios.delete(`http://localhost:5000/api/schedule/delete/${deleteId}`);
    }
  );

  const {} = useQuery("configData", getConfig,
    {
      // staleTime: 0,
      // cacheTime: 0,
      // refetchInterval: 0,
      onSuccess: (data) => {
        setNonWorkingDays(data.nonWorkingDays);
      }
    }
  );

  useEffect(() => {
    if (user?.email === 'kbuicuong@gmail.com') {
      calendarRef.current?.scheduler.handleState(fetchRemote, 'getRemoteEvents')
      calendarRef.current?.scheduler.handleState(false, 'disableViewer')
      calendarRef.current?.scheduler.handleState(true, 'draggable')
    } else {
      calendarRef.current?.scheduler.handleState(fetchRemote, 'getRemoteEvents')
      calendarRef.current?.scheduler.handleState(true, 'disableViewer')
      calendarRef.current?.scheduler.handleState(false, 'draggable')
    }
  }, [user, calendarRef.current]);

  const fetchRemote = async () => {
    const data: ScheduleType[] = await queryClient.fetchQuery("events", getSchedules)
    const dataFormatted: ProcessedEvent[] = data.map((d) => ({
      event_id: d.event_id,
      title: d.title,
      start: new Date(d.start),
      end: new Date(d.end),
      subtitle: d.subtitle,
      description: d.description,
      email: d.email,
      phone: d.phone,
      approved: d.approved,
    }));
    ;
    return dataFormatted;
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    return new Promise((res, rej) => {
      mutationDelete.mutate(deletedId, {
        onSuccess: () => {
          toast.success("Successfully deleted appointment.");
          calendarRef.current?.scheduler.handleState(fetchRemote, 'getRemoteEvents')
          res(deletedId);
        },
        onError: (error) => {
          rej();
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message);
          }
        },
      });
    });
  };

  return (
    <div className='mt-2.5'>
      <Scheduler
        ref={calendarRef}
        // getRemoteEvents={fetchRemote}
        // onConfirm={handleConfirm}
        onDelete={handleDelete}
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler}/>}
        view="week"
        day={null}
        month={null}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 10,
          endHour: 19,
          step: 60,
          cellRenderer: ({ height,day,start, onClick, ...props }) => {
            const weekday = day.getDay();
            const hour = start.getHours();
            const sundaySchedule = weekday === 0 && (hour === 17 || hour == 18);
            const disabled = nonWorkingDays.includes(weekday) || sundaySchedule;
            const restProps = disabled ? {} : props;
            return (
              <Button
                style={{
                  height: "100%",
                  background: disabled ? "#eee" : "transparent",
                  cursor: disabled ? "not-allowed" : "pointer"
                }}
                onClick={() => {
                  if (disabled) {
                    return toast.error("Tony is not available on that day.");
                  }
                  onClick();
                }}
                disableRipple={disabled}
                {...restProps}
              ></Button>
            );
          }
        }}
        eventRenderer={({event}) => {
          if (event.approved !== true) {
            return (

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  background: "#757575",
                }}
              >
                <div
                  style={{height: 20, background: "#ffffffb5", color: "black", fontSize: '10px'}}
                >
                  {event.start.toLocaleTimeString("en-US", {
                    timeStyle: "short",
                  })}
                </div>
                <div>{event.title}</div>
                <div
                  style={{height: 20, background: "#ffffffb5", color: "black"}}
                >
                  {/*{event.end.toLocaleTimeString("en-US", { timeStyle: "short" })}*/}
                  Awaiting approval...
                </div>
              </div>
            );
          }
          return null;
        }}
        //@ts-ignore
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              <p>Description: {event.description || "Nothing..."}</p>
              <p>Email: {event.email || "Nothing...."}</p>
              <p>Phone: {event.phone || "Nothing...."}</p>
            </div>
          );
        }}

      />


    </div>

  );
};

export default Appointment;
