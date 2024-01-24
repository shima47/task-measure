import { useState, useContext } from 'react';
import * as context from "~components/Provider/MyProvider";
import useUpdateTask from '~hooks/useUpdateTask';

export const useProtectTask = (taskId: string) => {
    const [allTask,] = useContext(context.allTaskContext)
    const [isProtected, setIsProtected] = useState(allTask[taskId]["isProtected"]);
    const { updateTaskProtected } = useUpdateTask();

    const onClickProtect = () => {
        updateTaskProtected(taskId, !isProtected);
        setIsProtected(prev => !prev);
    };

    return {
        isProtected,
        onClickProtect,
    } as const;
};

export default useProtectTask;