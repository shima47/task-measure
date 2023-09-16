export type allTask = {
    [key: string]: { title: string, time: number, }
}
export type isOpenAry = boolean[]
export type order = (string | number)[]
export type runningTask = { runningTaskId: string, startTime: number, }
export type selectedTaskId = string
export type isImporting = boolean

export type allTaskState = [allTask, React.Dispatch<React.SetStateAction<allTask>>]
export type isOpenAryState = [isOpenAry, React.Dispatch<React.SetStateAction<isOpenAry>>]
export type orderState = [order, React.Dispatch<React.SetStateAction<order>>]
export type runningTaskState = [runningTask, React.Dispatch<React.SetStateAction<runningTask>>]
export type selectedTaskIdState = [selectedTaskId, React.Dispatch<React.SetStateAction<selectedTaskId>>]
export type isImportingState = [isImporting, React.Dispatch<React.SetStateAction<isImporting>>]

export type myBucket = {
    allTask: allTask,
    order: order,
    runningTask: runningTask,
    isOpenAry: isOpenAry,
}