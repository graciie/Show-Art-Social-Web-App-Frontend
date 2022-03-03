import { NextPage } from 'next';
import { useUser } from 'data/use-user';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import UserPageLayout from '@/UserProfile/UserPageLayout';


/**
 * La page des posts liked par l'utilisateur connecté.
 *
 * @author Bly Grace Schephatia
 */
const LikesPage: NextPage = () => {
  const { user } = useUser();
  if (!user) return <></>
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <UserPageLayout user={user} path='likes' />
      </div>
    </>
  )
};
export const getServerSideProps = withPageAuthRequired();

export default LikesPage;

