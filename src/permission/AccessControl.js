import { connect } from 'react-redux';
const checkPermissions = (userPermissions, allowedPermissions) => {
    if (allowedPermissions.length === 0) {
        return true;
    }

    return userPermissions.some((permission) => allowedPermissions.includes(permission));
};
const AccessControl = ({ userPermissions, allowedPermissions, children, renderNoAccess }) => {
    const permitted = checkPermissions(userPermissions, allowedPermissions);
    if (!children) {
        return null;
    }
    if (permitted) {
        return children;
    }
    return renderNoAccess();
};
AccessControl.defaultProps = {
    allowedPermissions: [],
    permissions: [],
    renderNoAccess: () => null,
};
export default connect((state) => ({
    userPermissions: state.UserPermission.userPermission,
}))(AccessControl);
