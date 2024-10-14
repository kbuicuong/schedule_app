import {ProcessedEvent, SchedulerHelpers} from "@aldabil/react-scheduler/types";
import {useState} from "react";
import {Button, DialogActions, TextField} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers";

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
export const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;
  // Make your own form/state
  const [startValue, setStartValue] = useState<Dayjs | null>(dayjs(scheduler.state.start.value));
  const [endValue, setEndValue] = useState<Dayjs | null>(dayjs(scheduler.state.start.value));

  const [state, setState] = useState({
    title: event?.title || "",
    description: event?.description || "",
    // start: event?.start ? dayjs(event.start) : dayjs(scheduler.state.start.value),
    // end: event?.end ? dayjs(event.end) : dayjs(scheduler.state.end.value)
  });
  const [error, setError] = useState("");
  // console.log('start', state.start);
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
    if (state.title.toString().length < 3) {
      return setError("Min 3 letters");
    }

    try {
      scheduler.loading(true);

      /**Simulate remote data saving */
      const added_updated_event = (await new Promise((res) => {
        /**
         * Make sure the event have 4 mandatory fields
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         */
        setTimeout(() => {
          res({
            event_id: event?.event_id || Math.random(),
            title: state.title,
            start: startValue ? startValue.toDate() : new Date(),
            end: endValue ? endValue.toDate() : new Date(),
            description: state.description
          });
        }, 3000);
      })) as ProcessedEvent;

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Load your custom form/fields</p>
        <TextField
          label="Name"
          value={state.title}
          onChange={(e) => handleChange(e.target.value, "title")}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <TextField
          label="What do you want to get done?"
          value={state.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          fullWidth
        />
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
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};
