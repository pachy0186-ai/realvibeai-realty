/**
 * Minimal, privacy-safe audit logging utility
 * Logs high-level events without storing sensitive content or PII
 */

interface AuditEvent {
  event: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Audit function for logging AI-related events
 * @param event - Event name (e.g., 'ai_consent_accepted', 'ai_result_shown')
 * @param details - Optional event details (no PII)
 */
export function audit(event: string, details?: Record<string, unknown>): void {
  const auditData: AuditEvent = {
    event,
    details: details || {},
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.info('AUDIT', auditData);
  } else {
    // In production: no-op for now
    // This can be extended later to send to a logging service
    // without storing PII or sensitive content
    // Example: send to analytics service, server logs, etc.
  }
}

/**
 * Specific audit functions for common AI events
 */
export const auditEvents = {
  aiConsentAccepted: (formType: string) => 
    audit('ai_consent_accepted', { formType }),
  
  aiResultShown: (resultType: string, modelVersion?: string) => 
    audit('ai_result_shown', { resultType, modelVersion }),
  
  aiFeatureUsed: (featureName: string) => 
    audit('ai_feature_used', { featureName }),
  
  aiConsentDeclined: (formType: string) => 
    audit('ai_consent_declined', { formType }),
};
