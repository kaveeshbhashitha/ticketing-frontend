import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

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

// Example of AES Encrypted token
const encryptedToken = 'MrtcDRroi/J+oJIRpUM14/DqrHs+BKro4hX6J39QSN1DLi/gztKL7cxrYlZwXx+F79oubedBm3k/4BxnKnS1haWZ1nLSfyjBgBHay6gT/fy9iKuRNoijk2NfFOGp/QZl';

const DevTeam: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>(''); // Password retrieved from sessionStorage
  const [iv, setIv] = useState<string>(''); // IV for encryption and decryption
  const [tokenError, setTokenError] = useState<string | null>(null); // Error state for invalid token

  // Fetch password from sessionStorage when component mounts
  useEffect(() => {
    const storedPassword = sessionStorage.getItem('team_Access_password');
    if (storedPassword) {
      setPassword(storedPassword); // Set the password from sessionStorage
    } else {
      setTokenError('Password not found in sessionStorage');
    }
  }, []);

  // Automatically fetch the data when the password is retrieved
  useEffect(() => {
    if (password) {
      handleFetchData();
    }
  }, [password]); // Triggered whenever password is set

  const handleIvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIv(event.target.value);
  };

  const handleFetchData = async () => {
    if (!password) {
      setTokenError('Password is required');
      return;
    }

    try {
      setLoading(true);

      // Decrypt the token using the password provided by the user
      const decryptedToken = decryptToken(password, iv);

      if (!decryptedToken) {
        setTokenError('Failed to decrypt token with the provided password');
        setLoading(false);
        return;
      }

      // Fetch user data from GitHub using the decrypted token
      const data = await Promise.all(
        devTeamMembers.map(async (member) => {
          const githubResponse = await fetch(`https://api.github.com/users/${member.githubUsername}`, {
            headers: {
              Authorization: `token ${decryptedToken}`,
            },
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
      // Convert the IV and password into proper formats for decryption
      const key = CryptoJS.enc.Utf8.parse(password); // Secret key as 128-bit (16 characters)
      const ivBytes = CryptoJS.enc.Utf8.parse(iv); // IV as 128-bit (16 characters)
      
      // Decrypt the token using AES CBC mode
      const bytes = CryptoJS.AES.decrypt(encryptedToken, key, { iv: ivBytes, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedData) {
        return null;
      }

      return decryptedData; // Return the decrypted token
    } catch (err) {
      return null; // Return null if decryption fails
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'auto', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '80%', textAlign: 'center', marginTop: '30px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '30px' }}>Our Dev Team</h1>

        {/* If password exists in sessionStorage, do not show input field */}
        {!password && <p style={{ color: 'red' }}>Password is required in sessionStorage</p>}

        {/* IV input field for decryption */}
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text"
            placeholder="Enter IV (Optional)"
            value={iv}
            onChange={handleIvChange}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ddd',
              marginLeft: '10px',
              width: '300px',
              display:"none"
            }}
          />
          <button
            onClick={handleFetchData}
            style={{
              padding: '10px 20px',
              marginLeft: '10px',
              fontSize: '1rem',
              backgroundColor: '#333',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
              display:"none"
            }}
          >
            Fetch Team Data
          </button>
          {tokenError && <p style={{ color: 'red' }}>{tokenError}</p>}
        </div>

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
                width: '30%',
                maxWidth: '400px',
                height: '450px',
                textAlign: 'center',
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
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
