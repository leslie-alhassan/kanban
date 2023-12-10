import { OrganizationList } from '@clerk/clerk-react';

const SelectOrganizationPage = () => {
  return (
    <div className='mt-32 flex justify-center'>
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl='/organization/:id'
        afterCreateOrganizationUrl='/organization/:id'
      />
    </div>
  );
};

export default SelectOrganizationPage;
