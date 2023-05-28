import { useEffect, useState } from 'react';
import fetchData from './api';

interface User {
  user_id: string;
  profile_image: string;
  display_name: string;
  reputation: number;
}

function App() {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  const apiUrl =
    'https://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow';

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);
        const result = await fetchData(apiUrl);
        setData(result.items);
        setIsLoading(false);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    const storedFollowedUsers = localStorage.getItem('followedUsers');
    const storedBlockedUsers = localStorage.getItem('blockedUsers');

    if (storedFollowedUsers) {
      setFollowedUsers(JSON.parse(storedFollowedUsers));
    }
    if (storedBlockedUsers) {
      setBlockedUsers(JSON.parse(storedBlockedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('followedUsers', JSON.stringify(followedUsers));
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
  }, [followedUsers, blockedUsers]);

  const toggleFollowUser = (userId: string) => {
    setFollowedUsers((prevFollowedUsers) => {
      if (prevFollowedUsers.includes(userId)) {
        return prevFollowedUsers.filter((id) => id !== userId);
      } else {
        return [...prevFollowedUsers, userId];
      }
    });
  };

  const toggleBlockUser = (userId: string) => {
    setBlockedUsers((prevBlockedUsers) => {
      if (prevBlockedUsers.includes(userId)) {
        return prevBlockedUsers.filter((id) => id !== userId);
      } else {
        return [...prevBlockedUsers, userId];
      }
    });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data && data.length ? (
          <div>
            {data.map((user: User) => (
              <div
                key={user.user_id}
                style={{
                  backgroundColor: blockedUsers.includes(user.user_id)
                    ? 'lightgray'
                    : 'white',
                  opacity: blockedUsers.includes(user.user_id) ? 0.5 : 1,
                }}
              >
                <img src={user.profile_image} alt={user.display_name} />
                <p>{user.display_name}</p>
                <p>Reputation: {user.reputation}</p>
                {followedUsers.includes(user.user_id) ? (
                  <button onClick={() => toggleFollowUser(user.user_id)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => toggleFollowUser(user.user_id)}>
                    Follow
                  </button>
                )}
                <button onClick={() => toggleBlockUser(user.user_id)}>
                  Block
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available.</p>
        )
      )}
    </div>
  );
}

export default App;
