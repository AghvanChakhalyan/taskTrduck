import { Task } from "./task.interface";

export interface AsanaList{
    assignetForMe: Task[];
    assignetFromMe: Task[];
}