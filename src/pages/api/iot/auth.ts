import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'src/utils/db';
import User from '../../../models/user';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();
    const { method, body } = req;

    switch (method) {
      case 'POST':
        const resData = await User.create(body);
        res.status(200).json(resData);
        break;
      case 'GET':
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
