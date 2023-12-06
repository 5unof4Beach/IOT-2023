import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'src/utils/db';
import StepHeart from '../../../models/step-heart';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();

    switch (req.method) {
      case 'POST':
        const createStepHeart = await StepHeart.create(req.body);
        res.json(createStepHeart);
        break;
      case 'GET':
        const allStepHeart = await StepHeart.find({ userId: req.query.userId });

        res.status(200).json(allStepHeart);
        break;
      case 'PUT':
        const updateResponse = await StepHeart.updateMany({}, { userId: 'duc.bui@starack.net' });

        res.status(200).json(updateResponse);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
