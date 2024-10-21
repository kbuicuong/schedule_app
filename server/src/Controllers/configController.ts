import { Request, Response, NextFunction } from 'express';
import firebase from '../../firebase';
import Schedule from '../Models/scheduleModel';
import { ConfigType } from '../Types/types';

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

export const createConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const docId = `1`;
    await setDoc(doc(db, 'config', docId), data);
    res.status(201).send({ message: 'config created successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({ mesage: 'An unknown error occurred' });
    }
  }
};

export const getConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docRef = doc(db, 'config', '1');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as ConfigType;
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: 'No config found' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({ mesage: 'An unknown error occurred' });
    }
  }
};

export const updateConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const docId = `1`;
    await updateDoc(doc(db, 'config', docId), data);
    res.status(201).send({ message: 'config updated successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({ mesage: 'An unknown error occurred' });
    }
  }
};

export const deleteConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docId = `1`;
    await deleteDoc(doc(db, 'config', docId));
    res.status(200).send({ message: 'config deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(400).send({ mesage: 'An unknown error occurred' });
    }
  }
};
