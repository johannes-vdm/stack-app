import { useEffect, useState } from 'react';
import jsonData from './data.json';

import Search from './components/Search';
import Pagination from './components/Pagination';

import { User } from './interfaces/IUserItems';

const PAGE_SIZE = 10;

function App() {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [clickedProfileId, setClickedProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);
        const cachedData = localStorage.getItem('data');

        if (cachedData) {
          setData(JSON.parse(cachedData));
          setIsLoading(false);
          setError(null);
        } else {
          const expandedData = jsonData.items.map((item: any) => ({
            user_id: item.user_id,
            profile_image: item.profile_image,
            display_name: item.display_name,
            reputation: item.reputation,
            last_access_date: item.last_access_date,
            location: item.location,
          }));
          setData(expandedData);
          setIsLoading(false);
          setError(null);
          localStorage.setItem('data', JSON.stringify(expandedData));
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setError('Failed to fetch data. Please try again later.');
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
    // NOTE Reset current page when searched is entered
    setCurrentPage(1);
  }, [searchQuery]);

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

    if (clickedProfileId !== userId) {
      setClickedProfileId(userId);
    }
  };

  const toggleBlockUser = (userId: string) => {
    setBlockedUsers((prevBlockedUsers) => {
      if (prevBlockedUsers.includes(userId)) {
        return prevBlockedUsers.filter((id) => id !== userId);
      } else {
        return [...prevBlockedUsers, userId];
      }
    });

    if (clickedProfileId !== userId) {
      setClickedProfileId(userId);
    } else {
      setClickedProfileId(null);
    }
  };

  const convertTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const filteredUsers = data
    ? data.filter((user) =>
      user.display_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];
  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / PAGE_SIZE) : 0;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const usersToShow = filteredUsers.slice(startIndex, endIndex);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {filteredUsers.length ? (
            <div>
              <ul role="list" className="divide-y divide-gray-100 border-2 rounded-lg">
                {usersToShow.map((user: User) => (
                  <div key={user.user_id}>
                    <li
                      className={`flex align-middle hover:bg-blue-50 hover:cursor-pointer justify-between gap-x-6 p-5  ${blockedUsers.includes(
                        user.user_id
                      )
                        ? 'bg-gray-200 opacity-50'
                        : 'bg-transparent'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (clickedProfileId === user.user_id) {
                          setClickedProfileId(null);
                        } else {
                          setClickedProfileId(user.user_id);
                        }
                      }}
                    >
                      <div className="flex gap-x-4 items-center">
                        <img
                          src={user.profile_image}
                          alt={user.display_name}
                          className={`w-10 h-10 border-2 rounded-full mr-2 ${followedUsers.includes(user.user_id) ? 'border-blue-700' : ''
                            }`}
                        />
                        <div>
                          <p>{user.display_name}

                          </p>
                          <p>Reputation: {user.reputation}</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        {/* TODO DECODE */}
                        <p className="text-sm leading-6 text-gray-900">{user.location}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Last seen{' '}
                          <time dateTime="2023-01-23T13:23Z">
                            {convertTimestampToDate(user.last_access_date)}
                          </time>
                        </p>
                      </div>
                      <div className="sm:flex sm:flex-col sm:items-end align-middle justify-center">
                        {clickedProfileId === user.user_id
                          ?
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                          </svg>
                          :
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        }
                      </div>
                    </li>
                    {clickedProfileId === user.user_id && (
                      <div className='p-10 bg-gray-500' >
                        {!blockedUsers.includes(user.user_id) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFollowUser(user.user_id);
                            }}
                            className={`px-2 py-1 text-sm rounded ${followedUsers.includes(user.user_id)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-500 text-white'}`}
                          >
                            {followedUsers.includes(user.user_id) ? 'Unfollow' : 'Follow'}
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBlockUser(user.user_id);
                          }}
                          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                        >
                          {blockedUsers.includes(user.user_id) ? 'Unblock' : 'Block'}
                        </button>

                      </div>
                    )}
                  </div>
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
