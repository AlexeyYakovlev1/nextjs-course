import { NextApiRequest, NextApiResponse } from "next";

interface IIdApiRequest extends NextApiRequest {
    query: {
        id: string
    }
}

export default function getById(req: IIdApiRequest, res: NextApiResponse) {
    res.json({yourId: req.query.id});
}