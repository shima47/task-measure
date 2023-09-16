type funcs = {
    setJsonData: React.Dispatch<React.SetStateAction<string>>;
    onChangeTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClickCancel: () => void;
    onClickApply: () => Promise<void>;
};
export type useDataImport = [string, funcs];