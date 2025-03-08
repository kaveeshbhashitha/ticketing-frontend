import React, { useEffect, useState } from 'react';

interface Member {
  name: string;
  githubUsername: string;
}

interface GitHubUserData {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
}

const devTeamMembers: Member[] = [
  { name: 'Pasindu Pramuditha', githubUsername: 'PasinduPramudithaJ' },
  { name: 'Kaveesh Bashitha', githubUsername: 'kaveeshbhashitha' },
  { name: 'Supun Kalana', githubUsername: 'wickramDSK' }
];

const GITHUB_TOKEN = "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"; // Get the token from .env.local

const DevTeam: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch GitHub data for each member
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await Promise.all(
          devTeamMembers.map(async (member) => {
            const response = await fetch(`https://api.github.com/users/${member.githubUsername}`, {
              headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
              },
            });

            if (response.status === 403) {
              throw new Error('API rate limit exceeded. Try again later.');
            }

            const jsonData = await response.json();
            return jsonData;
          })
        );
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'auto', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%', textAlign: 'center', marginTop: '30px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>Our Dev Team</h1>

        {loading && <p>Loading team data...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          {userData.map((user, index) => (
            <div
              key={index}
              style={{
                border: '2px solid #ddd',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                width: '30%', // Set fixed width for all cards
                maxWidth: '400px', // Ensure cards don't grow too large
                height: '450px', // Set fixed height for cards
                textAlign: 'center',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column', // Ensure content is vertically aligned
                justifyContent: 'space-between', // Space out content evenly within the card
              }}
            >
              <h3
                style={{
                  fontSize: '2rem',
                }}
              >
                {devTeamMembers[index].name}
              </h3>

              {/* Center the image horizontally */}
              <div style={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                height: '150px', // Set a fixed height for the image container
              }}>
                <img
                  src={user.avatar_url}
                  alt={`${devTeamMembers[index].name} Avatar`}
                  style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                />
              </div>

              <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>{user.bio || 'No bio available'}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '15px',
                  padding: '12px 20px',
                  backgroundColor: '#333',
                  color: '#fff',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Visit GitHub Profile
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevTeam;
