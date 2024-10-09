import React, {useState, useEffect} from "react";

import {Scheduler} from "@aldabil/react-scheduler";
import {
  EventActions,
  ProcessedEvent
} from "@aldabil/react-scheduler/types";
import {useQueryClient, useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";

const getSchedules = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/schedule",
  );
  return response.data;
};

type ScheduleType = {
  event_id: string | number;
  title: string;
  subtitle: string;
  start: string | Date;
  end: string | Date;
};

const Dashboard = () => {
  const queryClient = useQueryClient();
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

  const fetchRemote = async (query) => {
    const data: ScheduleType[] = await queryClient.fetchQuery("events", getSchedules)
    const dataFormatted = data.map((d) => ({
      event_id: d.event_id,
      title: d.title,
      start: new Date(d.start),
      end: new Date(d.end),
      subtitle: d.subtitle
    }));
    console.log('data', data);
    return dataFormatted;
  };

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions
  ): Promise<ProcessedEvent> => {
    console.log("handleConfirm =", action, event);

    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
        mutationPut.mutate({
          event_id: event.event_id,
          title: event.title as string,
          start: event.start,
          end: event.end,
          subtitle: event.subtitle as string,
        }, {
          onSuccess: () => {
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
          },
          {
            onSuccess: () => {
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
    // Simulate http request: return the deleted id
    console.log('deletedId', deletedId);
    return new Promise((res, rej) => {
      mutationDelete.mutate(deletedId, {
        onSuccess: () => {
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
    <div>
      <Scheduler
        getRemoteEvents={fetchRemote}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        // onEventClick={handleEventClick}
        // editable={false}
        // deletable={false}
        // disableViewer
        view="week"
        day={null}
        month={null}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 6,
          startHour: 9,
          endHour: 20,
          step: 60,
        }}
      />
    </div>

  );
};

export default Dashboard;
