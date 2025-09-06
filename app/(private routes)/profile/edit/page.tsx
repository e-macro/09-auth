'use client'

import Image from 'next/image';
import css from './EditProfilePage.module.css'
import { getMe, updateMe } from '@/lib/clientApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditProfile =  () => {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const router = useRouter();

    useEffect(() => {
        getMe().then(user => {
          setUserEmail(user.email);
          setUsername(user.username);
          setAvatarUrl(user.avatar);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value)
    }

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await updateMe({username});
        router.push('/profile');
      } catch (error) {
        console.log('Error updating profile:', error);
      }
    }

    return (<main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    {avatarUrl && <Image src={avatarUrl}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />
}
    <form className={css.profileInfo} onSubmit={handleSubmit}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
          value={username}
          onChange={handleChange}
        />
      </div>

      <p>Email: {userEmail}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={() => router.push('/profile')}  >
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
)
}

export default EditProfile;