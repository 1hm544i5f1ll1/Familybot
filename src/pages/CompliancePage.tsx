import React, { useState } from 'react';
import { Shield, FileText, Users, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';

export const CompliancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gdpr' | 'audit' | 'data' | 'policies'>('gdpr');

  const complianceMetrics = [
    { label: 'GDPR Compliance', value: '98%', status: 'success', icon: Shield },
    { label: 'Data Requests', value: '12', status: 'warning', icon: FileText },
    { label: 'Opt-outs', value: '3', status: 'default', icon: Users },
    { label: 'Violations', value: '0', status: 'success', icon: CheckCircle }
  ];

  const auditLogs = [
    {
      id: '1',
      action: 'Data Export Request',
      user: 'john.doe@example.com',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed',
      details: 'User requested personal data export'
    },
    {
      id: '2',
      action: 'Account Deletion',
      user: 'jane.smith@example.com',
      timestamp: '2024-01-14T15:45:00Z',
      status: 'completed',
      details: 'User account and data permanently deleted'
    },
    {
      id: '3',
      action: 'Consent Update',
      user: 'parent@example.com',
      timestamp: '2024-01-14T09:20:00Z',
      status: 'completed',
      details: 'Marketing consent withdrawn'
    }
  ];

  const dataRetentionPolicies = [
    {
      category: 'User Messages',
      retention: '2 years',
      status: 'active',
      description: 'Chat messages and conversation history'
    },
    {
      category: 'Voice Recordings',
      retention: '1 year',
      status: 'active',
      description: 'Voice messages and transcriptions'
    },
    {
      category: 'Analytics Data',
      retention: '3 years',
      status: 'active',
      description: 'Usage statistics and performance metrics'
    },
    {
      category: 'Audit Logs',
      retention: '7 years',
      status: 'active',
      description: 'Security and compliance audit trails'
    }
  ];

  const tabs = [
    { id: 'gdpr', label: 'GDPR Compliance', icon: Shield },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
    { id: 'data', label: 'Data Retention', icon: Users },
    { id: 'policies', label: 'Policies', icon: AlertTriangle }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance Dashboard"
        description="Monitor GDPR compliance, audit logs, and data policies"
      />

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  metric.status === 'success' ? 'bg-green-100 dark:bg-green-900' :
                  metric.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                  'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    metric.status === 'success' ? 'text-green-600 dark:text-green-400' :
                    metric.status === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'gdpr' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">GDPR Compliance Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Data Processing Consent</span>
                    <StatusBadge status="compliant" variant="success" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Right to be Forgotten</span>
                    <StatusBadge status="implemented" variant="success" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Data Portability</span>
                    <StatusBadge status="available" variant="success" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Privacy by Design</span>
                    <StatusBadge status="implemented" variant="success" size="sm" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Data Breach Notification</span>
                    <StatusBadge status="ready" variant="success" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Data Protection Officer</span>
                    <StatusBadge status="assigned" variant="success" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Privacy Impact Assessment</span>
                    <StatusBadge status="completed" variant="success" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Cookie Consent</span>
                    <StatusBadge status="implemented" variant="success" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Audit Trail</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export Logs</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {log.action}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {log.user}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={log.status} variant="success" size="sm" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Retention Policies</h3>
            <div className="space-y-4">
              {dataRetentionPolicies.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{policy.category}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{policy.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{policy.retention}</div>
                    <StatusBadge status={policy.status} variant="success" size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy Policies</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Privacy Policy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Last updated: January 1, 2024
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Terms of Service</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Last updated: January 1, 2024
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cookie Policy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Last updated: January 1, 2024
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};