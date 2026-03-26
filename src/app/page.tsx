'use client';
import { useState } from 'react';

export default function ManualTestPage() {
  const [status, setStatus] = useState('System Ready');
  const [loading, setLoading] = useState(false);

  const triggerPost = async () => {
    setLoading(true);
    setStatus('Vercel API ko call kar raha hoon...');

    try {
      // Yeh aapke Vercel server ke route ko hit karega
      const response = await fetch('/api/cron/post-ai'); 
      const data = await response.json();

      if (data.success) {
        setStatus('✅ MUBARAK! Post Facebook par chali gayi.');
      } else {
        setStatus(`❌ ERROR: ${data.error || 'Server ne koi response nahi diya'}`);
        console.error("Full Debug Data:", data);
      }
    } catch (err: any) {
      setStatus('❌ Network Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#0070f3' }}>Vercel Manual Trigger Test 🤖</h1>
      <p style={{ fontSize: '20px' }}>Status: <strong>{status}</strong></p>
      
      <button 
        onClick={triggerPost} 
        disabled={loading}
        style={{
          padding: '20px 40px',
          fontSize: '20px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)'
        }}
      >
        {loading ? 'POSTING...' : 'PRESS TO POST ON FACEBOOK 🚀'}
      </button>

      <div style={{ marginTop: '30px', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p>Yeh button Vercel ke variables ko test karega.</p>
      </div>
    </div>
  );
}