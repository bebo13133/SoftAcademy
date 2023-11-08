
import { ref, listAll, getDownloadURL } from "firebase/storage"

import { storage } from "../config/firebase-config";
import { useAuthContext } from "../contexts/UserContext";




const { userId } = useAuthContext()

  const avatarImageList = ref(storage, `avatarImages/`)


  const fetchUserLastAvatar = (userId) => {
    listAll(avatarImageList)
      .then((response) => {
        const userAvatarItems = response.items.filter((item) => item.name.startsWith(userId));
        if (userAvatarItems.length > 0) {
          const lastUserAvatarItem = userAvatarItems[userAvatarItems.length - 1];
          getDownloadURL(lastUserAvatarItem).then((url) => {
            setAvatar((prevAvatar) => {
              // Update or add the last user-specific avatar URL
              return[ prevAvatar.filter((avatar) => avatar.userId === userId), { userId, url }];
            });
          });
        }
      });
  };
