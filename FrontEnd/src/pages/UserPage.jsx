
import UserHeader from "../components/UserHeader";
import UserPosts from "../components/UserPosts";

export default function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPosts likes={1200} replies={100} postImg={'/abed-avatar.jpg'} postTitle='lets talk' />
    </>
  );
}
