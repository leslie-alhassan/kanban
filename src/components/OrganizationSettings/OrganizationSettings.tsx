import { OrganizationProfile } from '@clerk/clerk-react';

export const OrganizationSettings = () => {
  return (
    <div className='w-full'>
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: 'none',
              width: '100%',
            },
            card: {
              border: '0.0625rem solid #e5e5e5',
              boxShadow: 'none',
              width: '100%',
            },
          },
        }}
      />
    </div>
  );
};
