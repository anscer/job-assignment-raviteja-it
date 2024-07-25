import { Request, Response } from 'express';
import State, { IState } from '../models/State';

export const createState = async (req: Request, res: Response) => {
    try {
        const { name, description, status, createdBy } = req.body;
        if(name.length <= 4){
            res.status(400).json({message: "Name should be atlest 5 characters"})
        }
        const state: IState = new State({ name, description, status, createdBy });
        await state.save();
        res.status(201).json(state);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

export const getStates = async (req: Request, res: Response) => {
    try {
        const states = await State.find();
        res.status(200).json(states);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

export const updateState = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedState = await State.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedState);
    } catch (error) {
        res.status(500).json({message: error});
    }
};

export const deleteState = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await State.findByIdAndDelete(id);
        res.status(200).json({ message: 'State deleted successfully' });
    } catch (error) {
        res.status(500).json({message: error});
    }
};