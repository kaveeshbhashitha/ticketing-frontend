import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import './Snowfall.css';

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

const encryptedToken = 'MrtcDRroi/J+oJIRpUM14/DqrHs+BKro4hX6J39QSN1DLi/gztKL7cxrYlZwXx+F79oubedBm3k/4BxnKnS1haWZ1nLSfyjBgBHay6gT/fy9iKuRNoijk2NfFOGp/QZl';

const DevTeam: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [iv] = useState<string>('');
  const [tokenError, setTokenError] = useState<string | null>(null);

  useEffect(() => {
    const storedPassword = sessionStorage.getItem('team_Access_password');
    if (storedPassword) {
      setPassword(storedPassword);
    } else {
      setTokenError('Password not found in sessionStorage');
    }
  }, []);

  useEffect(() => {
    if (password) {
      handleFetchData();
    }
  }, [password]);


  const handleFetchData = async () => {
    if (!password) {
      setTokenError('Password is required');
      return;
    }

    try {
      setLoading(true);
      const decryptedToken = decryptToken(password, iv);

      if (!decryptedToken) {
        setTokenError('Failed to decrypt token with the provided password');
        setLoading(false);
        return;
      }

      const data = await Promise.all(
        devTeamMembers.map(async (member) => {
          const githubResponse = await fetch(`https://api.github.com/users/${member.githubUsername}`, {
            headers: { Authorization: `token ${decryptedToken}` },
          });

          if (githubResponse.status === 403) {
            throw new Error('API rate limit exceeded. Try again later.');
          }

          const jsonData = await githubResponse.json();
          return jsonData;
        })
      );

      setUserData(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const decryptToken = (password: string, iv: string): string | null => {
    try {
      const key = CryptoJS.enc.Utf8.parse(password);
      const ivBytes = CryptoJS.enc.Utf8.parse(iv);
      const bytes = CryptoJS.AES.decrypt(encryptedToken, key, { iv: ivBytes, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData || null;
    } catch (err) {
      return null;
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'auto', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='boxborder'>
        <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>Our Dev Team</h1>
        {!password && <p style={{ color: 'red' }}>Password is required in sessionStorage</p>}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          {loading && <p>Loading team data...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {tokenError && <p style={{ color: 'red' }}>{tokenError}</p>}
          {userData.map((user, index) => (
            <div key={index} className="snowfall-box">
              <h3 style={{ fontSize: '2rem' }}>{devTeamMembers[index].name}</h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
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
                style={{ display: 'inline-block', marginTop: '15px', padding: '12px 20px', backgroundColor: '#333', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontSize: '1.1rem' }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'royalblue')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#333')}
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