import axios from "axios";
import {useMutation, useQuery} from "react-query";
import {ScheduleType} from "./Appointment.tsx";
import {Schedule} from "../Schedule.tsx";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material";
import {useState} from "react";
import {getEndpoint} from "../../utils/Helper.ts";

export const getSchedules = async () => {
  const response = await axios.get(
    `${getEndpoint()}/api/schedule`,
  );

  const dataFiltered = response.data.filter((d: ScheduleType) => d.approved !== true);

  return dataFiltered;
};

export const getConfig = async () => {
  const response = await axios.get(
    `${getEndpoint()}/api/config`,
  );

  return response.data;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  {day: "Monday", value: 1},
  {day: "Tuesday", value: 2},
  {day: "Wednesday", value: 3},
  {day: "Thursday", value: 4},
  {day: "Friday", value: 5},
  {day: "Saturday", value: 6},
  {day: "Sunday", value: 0},
];

export function Dashboard(): JSX.Element {

  const {
    data: schedules,
    refetch,
  } = useQuery("scheduleData", getSchedules,
    {
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
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

  const mutationPut = useMutation((value: string | string[]) => {
    if(typeof value === 'string') {
      const data = {
        nonWorkingDays: parseInt(value)
      }
      return axios.put(`${getEndpoint()}/api/config/update/1`, data);
    }else{
      const data = {
        nonWorkingDays: value.map((v) => parseInt(v))
      }
      return axios.put(`${getEndpoint()}/api/config/update/1`, data);
    }
  });

  const [nonWorkingDays, setNonWorkingDays] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof nonWorkingDays>) => {
    const {
      target: {value},
    } = event;
    mutationPut.mutate(value);
    setNonWorkingDays(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <section className="bg-white mt-2.5">
      <div className='px-6 mt-2.5'>
        <FormControl sx={{m: 1, width: 300}}>
          <InputLabel id="non-workingdays-checkbox-label">Days not working</InputLabel>
          <Select
            labelId="non-workingdays-checkbox-label"
            id="non-workingdays-checkbox"
            multiple
            value={nonWorkingDays}
            onChange={handleChange}
            input={<OutlinedInput label="Days not working"/>}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {days.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                <Checkbox checked={nonWorkingDays.includes(String(day.value))}/>
                <ListItemText primary={day.day}/>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="px-6 py-5 flex flex-wrap gap-2">
        {schedules && schedules.map((schedule: ScheduleType) => (
          <Schedule key={Math.random()} schedule={schedule} refetch={() => refetch()}/>
        ))}
      </div>
    </section>
  );
}
