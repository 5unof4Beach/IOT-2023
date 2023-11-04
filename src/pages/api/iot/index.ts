import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'src/utils/db';
import User from '../../../models/user';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();

    const response = await User.create({
      name: 'duc bui dep trai vcl luon',
      email: 'duc.bui@gmail.com',
      bmi: {
        age: 22,
        height: 178,
        weight: 62,
      },
    });

    res.json(response);
  } catch (e) {
    console.error(e);
  }
};
