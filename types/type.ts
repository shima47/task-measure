export type allTask = {
    [key: string]: { title: string, time: number, }
}
export type isOpenAry = boolean[]
export type order = (string | number)[]
export type runningTaskInfo = { id: string, startTime: number, }
export type selectedTaskId = string
export type isImporting = boolean
export type restTime = {
    id: string,
    start: string,
    end: string,
    isSelect: boolean,
}
export type restTimeKeys = "start" | "end" | "isSelect"
export type restTimeValues = string | boolean

export type allTaskState = [allTask, React.Dispatch<React.SetStateAction<allTask>>]
export type isOpenAryState = [isOpenAry, React.Dispatch<React.SetStateAction<isOpenAry>>]
export type orderState = [order, React.Dispatch<React.SetStateAction<order>>]
export type runningTaskInfoState = [runningTaskInfo, React.Dispatch<React.SetStateAction<runningTaskInfo>>]
export type selectedTaskIdState = [selectedTaskId, React.Dispatch<React.SetStateAction<selectedTaskId>>]
export type isImportingState = [isImporting, React.Dispatch<React.SetStateAction<isImporting>>]

export type myBucket = {
    allTask: allTask,
    order: order,
    runningTask: runningTaskInfo,
    isOpenAry: isOpenAry,
    restTime: restTime[],
}