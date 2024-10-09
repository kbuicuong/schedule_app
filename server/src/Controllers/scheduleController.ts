import {Request, Response, NextFunction} from "express";
import firebase from '../../firebase';
import Schedule from '../Models/scheduleModel';
import {ScheduleType} from "../Types/types";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createSchedule = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const data = req.body;
    if(!data.event_id || !data.title || !data.description || !data.start || !data.end) {
      throw new Error('All fields are required');
    }
    await addDoc(collection(db, 'schedules'), data);
    res.status(201).send('schedule created successfully');
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

export const getSchedules = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const schedules = await getDocs(collection(db, 'schedules'));
    const scheduleArray: ScheduleType[] = [];
    if(schedules.empty) {
      res.status(400).send('No schedule found');
    }else{
      schedules.forEach((doc) => {
        const schedule = new Schedule(
          doc.id,
          doc.data().event_id,
          doc.data().title,
          doc.data().description,
          doc.data().start,
          doc.data().end
        );
        scheduleArray.push(schedule);
      });
      res.status(200).send(scheduleArray);

    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
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
      res.status(404).send('schedule not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
}

export const updateSchedule = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.event_id;
    const data = req.body;
    const schedule = doc(db, 'schedules', id);
    await updateDoc(schedule, data);
    res.status(200).send('schedule updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};

export const deleteSchedule = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const id = req.params.event_id;
    await deleteDoc(doc(db, 'schedules', id));
    res.status(200).send('schedule deleted successfully');
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send('An unknown error occurred');
    }
  }
};
