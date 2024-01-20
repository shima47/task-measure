import { useState } from 'react';

export const useProtectTask = (taskId: string) => {
    const [isProtected, setIsProtected] = useState(false);

    const onClickProtect = () => {
        setIsProtected(prev => !prev);
    };

    return {
        isProtected,
        onClickProtect,
    } as const;
};

export default useProtectTask;