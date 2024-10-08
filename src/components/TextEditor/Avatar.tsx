import { useOthers, useSelf } from ".../../../liveblocks.config";
import styles from "./Avatars.module.css";
import Image from 'next/image'
export function Avatars() {
  const users = useOthers();
  const currentUser:any = useSelf();

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }:{connectionId:any,info:any}) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <Image
      alt=""
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}
