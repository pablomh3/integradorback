import { Request, Response } from "express";
import Issue, {Iissue} from "../models/issues";

export const issue = async (req: Request, res: Response) : Promise <void> => {
    const { name, email, phone, message} : Iissue = req.body;

    const newIssue = new Issue ({ name, email, phone, message});

    await newIssue.save();
    
    res.status(201).json({
        newIssue
    });
}