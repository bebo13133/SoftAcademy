import { useForm } from '../Hooks/useForm';
import { useAuthContext } from '../contexts/UserContext';
import './ChangePassword.css'
import { ProfileSidebar } from './ProfileSidebar';
export const ChangePassword = () => {

    const{onChangePassword}=useAuthContext()


    const { onSubmit, values, onChangeHandler } = useForm({
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    },onChangePassword)


    return (
        <>
            <ProfileSidebar />
            <div className="change-password">
                <h2>Change Password</h2>
                <form method= "PATCH" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={values.oldPassword}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={values.newPassword}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </>
    );
};







