export type StepHeartState = {
  isLoading: boolean;
  error: Error | string | null;
  stepHeart: StepHeartHourState[];
};

export type StepHeartHourState = {
  userId: String;
  step_count: Number;
  heart_rate: Number;
};
