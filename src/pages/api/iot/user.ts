import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'src/utils/db';
import User from '../../../models/user';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect();
    const { method, body, query } = req;

    switch (method) {
      case 'POST':
        const resData = await User.create(body);
        res.status(200).json(resData);
        break;
      case 'PUT':
        const { email, ...rest } = body;
        console.log(rest);

        const response = await User.findOneAndUpdate({ email: email }, { $set: rest }, { upsert: true });
        res.status(200).json(response);
        break;
      case 'GET':
        const user = await User.findOne({ email: query.email });
        res.status(200).json(user);
        break;
    }
  } catch (e) {
    console.error(e);
  }
};
