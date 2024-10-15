import {ProcessedEvent, SchedulerHelpers} from "@aldabil/react-scheduler/types";
import {useState} from "react";
import {Button, DialogActions, TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers";
import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {ScheduleType} from "./pages/Appointment.tsx";
import {toast} from "react-toastify";

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
export const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;

  const mutationPost = useMutation((newSchedule: ProcessedEvent) =>
    axios.post("http://localhost:5000/api/schedule/new", newSchedule)
  );
  const mutationPut = useMutation((newSchedule: ProcessedEvent) => {
    const start = new Date(newSchedule.start).toISOString();
    const end = new Date(newSchedule.end).toISOString();
    return axios.put(`http://localhost:5000/api/schedule/update/${start}.${end}`, newSchedule);
  });

  const [startValue, setStartValue] = useState<Dayjs | null>(dayjs(scheduler.state.start.value));
  const [endValue, setEndValue] = useState<Dayjs | null>(dayjs(scheduler.state.end.value));

  const [state, setState] = useState({
    title: event?.title || "",
    description: event?.description || "",
    email: event?.email || "",
    phone: event?.phone || ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (value: string, name: string) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async () => {
    // Your own validation
    const newErrors: { [key: string]: string } = {};

    if (state.title.toString().length < 3) {
      newErrors.title = "Min 3 letters";
    }
    if (!state.description) {
      newErrors.description = "Description is required";
    }
    if (!state.email) {
      newErrors.email = "Email is required";
    }
    if (!state.phone) {
      newErrors.phone = "Phone is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
      scheduler.loading(true);

      const schedule = {
        event_id: event?.event_id || Math.random(),
        title: state.title,
        start: startValue ? startValue.toDate() : new Date(),
        end: endValue ? endValue.toDate() : new Date(),
        description: state.description,
        email: state.email,
        phone: state.phone,
      } as ProcessedEvent;

      return new Promise(() => {
        if(event){
          mutationPut.mutate(schedule, {
            onSuccess: () => {
              toast.success("Successfully edited schedule");
              scheduler.onConfirm(schedule, "edit");
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
              }
            },
            onSettled: () => {
              scheduler.close();
            }
          })
        }else{
          mutationPost.mutate( schedule,
            {
              onSuccess: () => {
                toast.success("Appointment has been created!");
                scheduler.onConfirm(schedule, "create");
              },
              onError: (error) => {
                if (error instanceof AxiosError) {
                  toast.error(error.response?.data.message);
                }
              },
              onSettled: () => {
                scheduler.close();
              }
            }
          );
        }
      });

    } finally {
      scheduler.loading(false);
    }
  };
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p className='text-xl'>Add Event</p>
        <p>Please only add 1 event, you cannot edit/cancel</p>
        <TextField
          label="Name"
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          error={!!errors.title}
          helperText={errors.title}
          fullWidth
          sx={{ margin: "1rem 0" }}
        />
        <TextField
          label="What do you want to get done?"
          value={state.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
        />
        <TextField
          label="Email"
          value={state.email}
          onChange={(e) => handleChange(e.target.value, "email")}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          sx={{ margin: "1rem 0" }}
          slotProps={{ htmlInput: { inputMode: "email" } }}
        />
        <TextField
          label="Phone"
          value={state.phone}
          onChange={(e) => handleChange(e.target.value, "phone")}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
        />
        <div className='flex gap-2 mt-4'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start"
              value={startValue}
              onChange={(newValue) => setStartValue(newValue)}
            />
            <DateTimePicker
              label="End"
              value={endValue}
              onChange={(newValue) => setEndValue(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};
