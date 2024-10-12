import {Request, Response, NextFunction} from "express";
import firebase from '../../firebase';
import Schedule from '../Models/scheduleModel';
import {ScheduleType} from "../Types/types";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createSchedule = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body;
    if(!data.event_id || !data.title || !data.subtitle || !data.start || !data.end) {
      throw new Error('All fields are required');
    }
    // await addDoc(collection(db, 'schedules'), data);

    // Check for overlapping schedules
    const schedules = await getDocs(collection(db, 'schedules'));
    const overlapExists = schedules.docs.some(doc => {
      const schedule = doc.data();
      const existingStart = new Date(schedule.start).getTime();
      const existingEnd = new Date(schedule.end).getTime();
      const newStart = new Date(data.start).getTime();
      const newEnd = new Date(data.end).getTime();
      const approved = schedule.approved;

      return (newStart < existingEnd && newEnd > existingStart && approved);
    });

    if (overlapExists) {
      res.status(400).send({message: 'A schedule with overlapping time already exists'});
    }else{
      const docId = `${data.start}.${data.end}`;
      await setDoc(doc(db, 'schedules', docId), data);
      res.status(201).send({message: 'schedule created successfully'});
    }

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({mesage: 'An unknown error occurred'});
    }
  }
};

export const getSchedules = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const schedules = await getDocs(collection(db, 'schedules'));
    const scheduleArray: ScheduleType[] = [];
    if(schedules.empty) {
      res.status(400).send({message: 'No schedule found'});
    }else{
      schedules.forEach((doc) => {
        const schedule = new Schedule(
          doc.id,
          doc.data().event_id,
          doc.data().title,
          doc.data().subtitle,
          doc.data().start,
          doc.data().end,
          doc.data().approved
        );
        scheduleArray.push(schedule);
      });
      console.log(scheduleArray);
      res.status(200).send(scheduleArray);

    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({message: 'An unknown error occurred'});
    }
  }
};

export const getSchedule = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.id;
    const schedule = doc(db, 'schedules', id);
    const data = await getDoc(schedule);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send({message: 'schedule not found'});
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({message: 'An unknown error occurred'});
    }
  }
}

export const updateSchedule = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const schedule = doc(db, 'schedules', id);
    await updateDoc(schedule, data);
    res.status(200).send({message: 'schedule updated successfully'});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({message: 'An unknown error occurred'});
    }
  }
};

export const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    const schedulesRef = collection(db, 'schedules');
    const querySnapshot = await getDocs(schedulesRef);

    let docIdToDelete = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().event_id === Number(eventId)) {
        docIdToDelete = doc.id;
      }
    });

    if (docIdToDelete) {
      await deleteDoc(doc(db, 'schedules', docIdToDelete));
      res.status(200).send({message: 'Schedule deleted successfully'});
    } else {
      res.status(404).send({message: 'Schedule not found'});
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({message: 'An unknown error occurred'});
    }
  }
};
