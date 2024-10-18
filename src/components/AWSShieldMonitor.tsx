import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const AWSShieldMonitor: React.FC = () => {
  const [shieldStatus, setShieldStatus] = useState<'active' | 'alert'>('active');
  const [lastAttack, setLastAttack] = useState<string | null>(null);
  const [mitigatedAttacks, setMitigatedAttacks] = useState<number>(0);

  useEffect(() => {
    // Simulated AWS Shield status updates
    const timer = setInterval(() => {
      const random = Math.random();
      if (random < 0.1) {
        setShieldStatus('alert');
        setLastAttack(new Date().toISOString());
        setMitigatedAttacks((prev) => prev + 1);
      } else {
        setShieldStatus('active');
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">AWS Shield Status</h3>
          <Shield className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0">
            {shieldStatus === 'active' ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <AlertTriangle className="h-8 w-8 text-red-500" />
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              {shieldStatus === 'active' ? 'Protected' : 'Under Attack'}
            </h3>
            <p className="text-sm text-gray-500">
              {shieldStatus === 'active'
                ? 'No current DDoS attacks detected'
                : 'Mitigating DDoS attack'}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Mitigated Attacks</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{mitigatedAttacks}</dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Last Attack</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {lastAttack ? new Date(lastAttack).toLocaleString() : 'No recent attacks'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AWSShieldMonitor;