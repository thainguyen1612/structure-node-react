import React from 'react';
import LayoutAdmin from '../../../../components/Admin/Layouts/Main';
import EditComponent from '../../../../components/Admin/Categories/EditComponent';

class EditCategory extends React.Component {
  render() {
    const CREATE_LINK = '/admin/categories/create';
    return (
      <LayoutAdmin createLink={CREATE_LINK}>
        <EditComponent />
      </LayoutAdmin>
    );
  }
}

export default EditCategory;
