export interface QuestDetail {
    isStarted: boolean;
    step: StepDetail[];
    isDone: boolean;
}

export interface StepDetail {
    value: boolean;
    area: string;
}

export interface Quest {
    id: number;
    name: string;
    questDetail: QuestDetail;
}