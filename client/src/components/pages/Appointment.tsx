import React, {useState, useEffect, useRef} from "react";

import {Scheduler} from "@aldabil/react-scheduler";
import {
  EventActions,
  ProcessedEvent, SchedulerRef
} from "@aldabil/react-scheduler/types";
import {useQueryClient, useMutation, useQuery} from "react-query";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {useAuthState} from "react-firebase-hooks/auth";
import {firebaseAuth} from "../../firebase/BaseConfig.ts";
import {CustomEditor} from "../CustomEditor.tsx";

export const getSchedules = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/schedule",
  );
  return response.data;
};

export type ScheduleType = {
  event_id: string | number;
  title: string;
  subtitle: string;
  start: string | Date;
  end: string | Date;
  approved?: boolean;
};

const Appointment = () => {
  const queryClient = useQueryClient();
  const [user] = useAuthState(firebaseAuth);
  const calendarRef = useRef<SchedulerRef>(null);

  const mutationPost = useMutation((newSchedule: ScheduleType) =>
    axios.post("http://localhost:5000/api/schedule/new", newSchedule)
  );
  const mutationPut = useMutation((newSchedule: ScheduleType) => {
    const start = new Date(newSchedule.start).toISOString();
    const end = new Date(newSchedule.end).toISOString();
    return axios.put(`http://localhost:5000/api/schedule/update/${start}.${end}`, newSchedule);
  });
  const mutationDelete = useMutation((deleteId: string) => {
      return axios.delete(`http://localhost:5000/api/schedule/delete/${deleteId}`);
    }
  );

  useEffect(() => {
    if (user?.email === 'kbuicuong@gmail.com') {
      calendarRef.current?.scheduler.handleState(false, 'disableViewer')
      calendarRef.current?.scheduler.handleState(true, 'draggable')
      calendarRef.current?.scheduler.handleState(fetchRemote, 'getRemoteEvents')
    } else {
      calendarRef.current?.scheduler.handleState(true, 'disableViewer')
      calendarRef.current?.scheduler.handleState(false, 'draggable')
      calendarRef.current?.scheduler.handleState(fetchRemote, 'getRemoteEvents')

    }
  }, [user, calendarRef.current?.scheduler.disableViewer]);

  const fetchRemote = async () => {
    const data: ScheduleType[] = await queryClient.fetchQuery("events", getSchedules)
    const dataFormatted: ProcessedEvent[] = data.map((d) => ({
      event_id: d.event_id,
      title: d.title,
      start: new Date(d.start),
      end: new Date(d.end),
      subtitle: d.subtitle,
      approved: d.approved,
    }));
    ;
    return dataFormatted;
  };

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {

    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
        mutationPut.mutate({
          event_id: event.event_id,
          title: event.title as string,
          start: event.start,
          end: event.end,
          subtitle: event.subtitle as string,
          approved: true,
        }, {
          onSuccess: () => {
            toast.success("Successfully edited schedule");
            res(event);
          },
          onError: (error) => {
            rej();
            if (error instanceof AxiosError) {
              toast.error(error.response?.data.message);
            }
          },
        })
      } else if (action === "create") {
        /** POST event to remote DB */
        mutationPost.mutate(
          {
            event_id: event.event_id || Math.random(),
            title: event.title as string,
            start: event.start,
            end: event.end,
            subtitle: event.subtitle as string,
            approved: false,
          },
          {
            onSuccess: () => {
              toast.success("Appointment has been created!");
              res({
                ...event,
                event_id: event.event_id || Math.random(),
              });
            },
            onError: (error) => {
              rej();
              if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
              }
            },
          }
        );
      }
    });
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    return new Promise((res, rej) => {
      mutationDelete.mutate(deletedId, {
        onSuccess: () => {
          toast.success("Successfully deleted appointment.");
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
        // events={schedules}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler}/>}
        view="week"
        day={null}
        month={null}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 9,
          endHour: 20,
          step: 60,
        }}
        fields={[
          {
            name: "Description",
            type: "input",
            default: "Default Value...",
            config: { label: "Details", multiline: true, rows: 4 },
          },
        ]}
        eventRenderer={({event, ...props}) => {
          // console.log('event', event);
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
                {...props}
              >
                <div
                  style={{height: 20, background: "#ffffffb5", color: "black"}}
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
      />


    </div>

  );
};

export default Appointment;
