import { commentOnPostId } from 'libs/posts';
import { testErrors } from 'libs/commons';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';

/**
 * Le POST de la route qui permet d'ajouter un commentaire à post.
 *
 * @author Roger Montero
 */
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getAccessToken(req, res);
  const { postid } = req.query as { postid: string };
  const { comment } = req.body as { comment: string };
  try {
    if (!accessToken) throw new Error('The access token has a falsely value');
    const comments = await commentOnPostId(accessToken, postid, comment);
    res.status(200).json(comments);
  } catch (err) {
    const e = testErrors(err);
    res.status(e.status).end(e.error);
  }
};

/**
 * La fonction qui va diriger les requêtes dépendamment de sa méthode.
 */
const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await withApiAuthRequired(handlePost)(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default endpoint;
