import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export const ModuleOnboardingBanner = ({ title, subtitle, steps = [] }) => {
  return (
    <div className="onboarding-banner">
      <div className="onboarding-banner-header">
        <div className="onboarding-title-group">
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-dark)',
            }}
          >
            <Sparkles size={16} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{title}</h3>
              <span className="onboarding-badge">Guía Operativa</span>
            </div>
            {subtitle && (
              <p style={{ fontSize: '0.76rem', color: 'var(--brand-brown)', marginTop: '1px' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="onboarding-steps">
          {steps.map((step, idx) => (
            <div key={idx} className="onboarding-step-item">
              <span className="step-num">{idx + 1}</span>
              <p style={{ lineHeight: 1.35 }}>{step}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
