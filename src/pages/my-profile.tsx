import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";

const MyProfile: React.FC = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    // @ts-ignore
    id: user?.id,
  });

  const myProfile = user ?? {};

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error...</div>;

  return (
    <Profile
      type="My"
      // @ts-ignore
      name={myProfile.name}
      // @ts-ignore
      email={myProfile.email}
      // @ts-ignore
      avatar={myProfile.avatar}
      // @ts-ignore
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;
