export type StepHeartState = {
  isLoading: boolean;
  error: Error | string | null;
  stepHeart: StepHeartHourState[];
  userData: any | null;
};

export type StepHeartHourState = {
  userId: string;
  step_count: number;
  heart_rate: number;
};
