import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'src/utils/db';
import StepHeart from '../../../models/step-heart';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();

    switch (req.method) {
      case 'POST':
        // const createStepHeart = await StepHeart.create([
        //   { userId: '6545e7e4fd78653b24fa97a7', step_count: 42, heart_rate: 68 },
        // ]);

        // res.json(createStepHeart);
        break;
      case 'GET':
        const allStepHeart = await StepHeart.find();
        
        res.status(200).json(allStepHeart);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
