'use client';
import { useState } from 'react';

export default function AutoMarketingPage() {
  const [status, setStatus] = useState('System is in Auto-Pilot Mode');
  const [loading, setLoading] = useState(false);

  // Status check function
  const checkSystem = async () => {
    setLoading(true);
    setStatus('Verifying Cloud Connection...');
    setTimeout(() => {
      setStatus('✅ System Online: Next post scheduled for 3:00 PM');
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
      color: 'white',
      fontFamily: '"Inter", sans-serif',
      padding: '20px'
    }}>
      
      {/* Brand Name */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '900', 
          letterSpacing: '-1px',
          background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '5px'
        }}>
          AI AUTO MARKETING
        </h1>
        <div style={{ height: '4px', width: '80px', background: '#3b82f6', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>

      {/* Main Robotic Card */}
      <div style={{ 
        background: 'rgba(30, 41, 59, 0.7)', 
        padding: '50px 40px', 
        borderRadius: '32px', 
        border: '1px solid rgba(56, 189, 248, 0.2)',
        boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '450px',
        position: 'relative'
      }}>
        
        {/* Robotics Icon Section */}
        <div style={{ fontSize: '70px', marginBottom: '10px', filter: 'drop-shadow(0 0 10px #38bdf8)' }}>
          🤖
        </div>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 'bold', 
          color: '#38bdf8', 
          letterSpacing: '3px', 
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          Auto System Enabled
        </div>

        <div style={{ 
          background: 'rgba(0,0,0,0.3)', 
          padding: '20px', 
          borderRadius: '16px', 
          marginBottom: '30px',
          borderLeft: '4px solid #3b82f6'
        }}>
          <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '5px', textTransform: 'uppercase' }}>
            Current Activity
          </p>
          <p style={{ fontSize: '18px', fontWeight: '500', color: '#f1f5f9' }}>
            {status}
          </p>
        </div>
        
        <button 
          onClick={checkSystem}
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: 'transparent',
            color: '#38bdf8',
            border: '2px solid #38bdf8',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#38bdf8';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#38bdf8';
          }}
        >
          {loading ? 'Scanning...' : 'Check System Health'}
        </button>
      </div>

      {/* Footer Branding */}
      <footer style={{ marginTop: '60px', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '8px' }}>
          Crafted with Intelligence by
        </p>
        <h3 style={{ 
          fontSize: '1.6rem', 
          fontWeight: '800', 
          color: 'white',
          textShadow: '0 0 15px rgba(255,255,255,0.2)'
        }}>
          Ghulam Abbas Bhatti
        </h3>
        <p style={{ color: '#3b82f6', fontSize: '0.8rem', marginTop: '10px', fontWeight: 'bold' }}>
          MASTER AUTO-PILOT v2.0
        </p>
      </footer>
    </div>
  );
}